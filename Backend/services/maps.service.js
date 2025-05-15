import axios from "axios";
import {API_KEY, OpenRoutesServiceKey} from "../config.js";

export const getAddressCoordinates = async (address) => {
    const apiKey =API_KEY;
    try {
        const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
            params: {
                q: `${address}, Bangladesh`,
                key: apiKey,
                limit: 5,
                language: 'en',
            },
        });
        //console.dir(response.data, { depth: null });
        if (response.data && response.data.status.code === 200 && response.data.results.length > 0) {
            const location = response.data.results[0].geometry;
            return {
                lat: location.lat,
                lng: location.lng
            };
        } else {
            console.error("OpenCage API Error:", response.data.status);

            throw new Error("Unable to get coordinates");
        }
    } catch (error) {
        console.error("Error fetching coordinates:", error.message);
        throw error;
    }
}

export const getDistanceDirections = async (start, end, maxRetries = 3, retryDelay = 2000) => {
    // Validate coordinates
    if (!Array.isArray(start) || !Array.isArray(end) || start.length !== 2 || end.length !== 2) {
        throw new Error('Start and end must be arrays of [longitude, latitude]');
    }
    if (![...start, ...end].every(num => typeof num === 'number' && isFinite(num))) {
        throw new Error('Coordinates must be valid numbers');
    }
    if (start[0] < -180 || start[0] > 180 || start[1] < -90 || start[1] > 90 ||
        end[0] < -180 || end[0] > 180 || end[1] < -90 || end[1] > 90) {
        throw new Error('Coordinates out of valid range: longitude [-180, 180], latitude [-90, 90]');
    }

    console.log('Start:', start, 'End:', end);

    let attempt = 1;

    while (attempt <= maxRetries) {
        try {
            const response = await axios.get(
                'https://api.openrouteservice.org/v2/directions/driving-car',
                {
                    params: {
                        api_key: OpenRoutesServiceKey,
                        start: `${start[0]},${start[1]}`,
                        end: `${end[0]},${end[1]}`,
                        units: 'km'
                    },
                    headers: {
                        'Authorization': OpenRoutesServiceKey,
                        'Content-Type': 'application/json',
                        'Accept': 'application/geo+json;charset=UTF-8' // Critical change
                    },
                    timeout: 15000
                }
            );

            const { distance, duration } = response.data.features[0].properties.summary;
            return {
                distance, // in km
                duration // in seconds
            };
        } catch (error) {
            if (error.response) {
                console.error("API Error Details:", {
                    status: error.response.status,
                    error: error.response.data,
                    request: {
                        url: error.config.url,
                        method: error.config.method,
                        headers: error.config.headers,
                        data: error.config.data
                    }
                });

                if (error.response.status === 503) {
                    console.warn(`OpenRouteService is temporarily unavailable. Attempt ${attempt} of ${maxRetries}`);
                    if (attempt < maxRetries) {
                        await new Promise(resolve => setTimeout(resolve, retryDelay));
                        attempt++;
                        continue;
                    } else {
                        throw new Error('OpenRouteService is temporarily unavailable after maximum retries');
                    }
                } else if (error.response.status === 429) {
                    throw new Error('Rate limit exceeded for OpenRouteService');
                } else if (error.response.status === 401) {
                    throw new Error('Invalid or unauthorized API key for OpenRouteService');
                } else if (error.response.status === 400) {
                    throw new Error('Invalid request: Check coordinates or API parameters');
                }
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Request setup error:', error.message);
            }
            throw error;
        }
    }
};

export const getDistance = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    let originCoordinates, destinationCoordinates;
    try {
        originCoordinates = await getAddressCoordinates(origin);
        destinationCoordinates = await getAddressCoordinates(destination);
    } catch (error) {
        throw new Error(`Failed to get coordinates: ${error.message}`);
    }

    if (!originCoordinates || !destinationCoordinates ||
        !originCoordinates.lat || !originCoordinates.lng ||
        !destinationCoordinates.lat || !destinationCoordinates.lng) {
        throw new Error('Invalid coordinates returned from address lookup');
    }

    console.log('originCoordinates:', originCoordinates);
    console.log('destinationCoordinates:', destinationCoordinates);

    const start = [originCoordinates.lng, originCoordinates.lat];
    const end = [destinationCoordinates.lng, destinationCoordinates.lat];

    console.log('start:', start);
    console.log('end:', end);

    // Call getDistanceDirections
    try {
        const result = await getDistanceDirections(start, end);
        console.log('distanceResult:', result);
        return result;
    } catch (error) {
        throw new Error(`Failed to calculate distance: ${error.message}`);
    }
};