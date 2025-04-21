
# User Logout Endpoint

## Endpoint
`POST /logout`

## Description
This endpoint allows users to log out by blacklisting their JWT token. The token is stored in a blacklist with a time-to-live (TTL) of 24 hours, after which it will automatically expire.

---

## Request
No request body is required. The token is extracted from the `Authorization` header or cookies.

---

## Response

### Success Response
- **Status Code:** `200 OK`
- **Content:**
```json
{
  "message": "Logout successfully"
}
```

### Error Responses

#### Blacklist Error
- **Status Code:** `401 Unauthorized`
- **Content:**
```json
{
  "message": "Blacklisted token is not set"
}
```

---

## Notes
- The token is blacklisted for 24 hours (TTL) to prevent reuse.
- Ensure the `Authorization` header or cookies contain the token when making the request.
- After logout, the token cannot be used for authentication until it expires from the blacklist.

