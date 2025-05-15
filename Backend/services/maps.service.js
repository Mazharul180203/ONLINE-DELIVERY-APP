import axios from "axios";

export const getAddressCoordinates = async (address) => {
    const apiKey = 'ec79c18d342a417f9f3b0b0b50eaa0bb';
    console.log("apiKey:", apiKey, "address:", address);

    try {
        const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
            params: {
                q: `${address}, Bangladesh`,
                key: apiKey,
                limit: 5,
                language: 'en',
            },
        });
        console.dir(response.data, { depth: null });
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
