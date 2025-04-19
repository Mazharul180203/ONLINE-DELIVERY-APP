
# User Registration Endpoint

## Endpoint
`POST /register`

## Description
This endpoint allows users to register by providing their details. Upon successful registration, a JWT token and user details are returned.

---

## Request Body
The request body must be sent in JSON format with the following fields:

| Field      | Type   | Required | Description                          |
|------------|--------|----------|--------------------------------------|
| `email`    | String | Yes      | The user's email address. Must be a valid email. |
| `firstName`| String | Yes      | The user's first name. Must be at least 3 characters long. |
| `lastName` | String | Yes      | The user's last name.                |
| `password` | String | Yes      | The user's password. Must be at least 6 characters long. |

### Example Request Body
```json
{
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "password": "securepassword"
}
```

---

## Response

### Success Response
- **Status Code:** `201 Created`
- **Content:**
```json
{
  "token": "jwt_token_here",
  "user": {
    "code": 201,
    "status": "success",
    "message": "Successfully Registered",
    "data": [
      {
        "id": 1,
        "firstname": "John",
        "lastname": "Doe",
        "email": "user@example.com",
        "password": "hashed_password_here"
      }
    ]
  }
}
```

### Error Responses

#### Validation Errors
- **Status Code:** `400 Bad Request`
- **Content:**
```json

```

#### Server Errors
- **Status Code:** `401 Unauthorized`
- **Content:**
```json
{
  "code": 401,
  "status": "error",
  "message": "Error message here"
}
```

---

## Notes
- Ensure the `Content-Type` header is set to `application/json` when making the request.
- The `password` field is securely hashed before being stored in the database.
- The `token` returned in the response can be used for authentication in subsequent requests.

---

# User Login Endpoint

## Endpoint
`POST /login`

## Description
This endpoint allows users to log in by providing their email and password. Upon successful login, a JWT token and user details are returned.

---

## Request Body
The request body must be sent in JSON format with the following fields:

| Field      | Type   | Required | Description                          |
|------------|--------|----------|--------------------------------------|
| `email`    | String | Yes      | The user's email address. Must be a valid email. |
| `password` | String | Yes      | The user's password. Must be at least 6 characters long. |

### Example Request Body
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

---

## Response

### Success Response
- **Status Code:** `200 OK`
- **Content:**
```json
{
  "token": "jwt_token_here",
  "user": {
    "code": 200,
    "status": "success",
    "message": "Login successful",
    "data": [
      {
        "id": 1,
        "firstname": "John",
        "lastname": "Doe",
        "email": "user@example.com"
      }
    ]
  }
}
```

### Error Responses

#### Validation Errors
- **Status Code:** `400 Bad Request`
- **Content:**
```json

```

#### Authentication Errors
- **Status Code:** `401 Unauthorized`
- **Content:**
```json
{
  "message": "Invalid email or password"
}
```

---

## Notes
- Ensure the `Content-Type` header is set to `application/json` when making the request.
- The `token` returned in the response can be used for authentication in subsequent requests.
