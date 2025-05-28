# Data Pusher API Samples
## Base URL
`http://localhost:3000`

## Account APIs

### 1. Create Account
**POST** `/api/accounts/`

**Request Body:**
```json
{
    "name": "user",
    "email": "user@gmail.com",
    "website": "user.com"
}
```

**Response:**
```json
{
    "success": true,
    "message": "Account created successfully",
    "data": {
        "id": "b8820692-60f3-4d57-a8b1-fb7a94153d02",
        "email": "user@gmail.com",
        "name": "user",
        "website": "user.com",
        "secretToken": "86de51346c9440750d272659472e280e95b29fc3217517b952f0ecafa970b7b0b21443497ab91e262b2c7c68a4c3ed99b7f9865e063cc558fc263e8cd737aec9",
        "updatedAt": "2025-05-28T21:06:35.816Z",
        "createdAt": "2025-05-28T21:06:35.816Z"
    }
}
```

### 2. Get All Accounts
**GET** `/api/accounts/`

**Response:**
```json
{
    "success": true,
    "message": "Accounts fetched successfully",
    "data": [
        {
            "id": "b8820692-60f3-4d57-a8b1-fb7a94153d02",
            "email": "user@gmail.com",
            "name": "user",
            "secretToken": "86de51346c9440750d272659472e280e95b29fc3217517b952f0ecafa970b7b0b21443497ab91e262b2c7c68a4c3ed99b7f9865e063cc558fc263e8cd737aec9",
            "website": "user.com",
            "createdAt": "2025-05-28T21:06:35.816Z",
            "updatedAt": "2025-05-28T21:06:35.816Z"
        },
        {
            "id": "847afb00-92bc-4acc-aaa6-4fa27431585e",
            "email": "user2@gmail.com",
            "name": "user2",
            "secretToken": "4094500194b50cb1e50de1e16257be99f3c18fec3b580cfefe200b63995a11f1bb102fe9de7dac5fd990e8dd5be5231ea9936d7baf95c26ed9ec355b9431bab6",
            "website": "user2.com",
            "createdAt": "2025-05-28T21:07:19.925Z",
            "updatedAt": "2025-05-28T21:07:19.925Z"
        }
    ]
}
```

### 3. Update Account
**PATCH** `/api/accounts/:id`

**Example:** `PATCH /api/accounts/b8820692-60f3-4d57-a8b1-fb7a94153d02`

**Request Body:**
```json
{
    "name": "user updated",
    "website": "userUpdated.com"
}
```

**Response:**
```json
{
    "success": true,
    "message": "Account updated successfully",
    "data": {
        "id": "b8820692-60f3-4d57-a8b1-fb7a94153d02",
        "email": "user@gmail.com",
        "name": "user updated",
        "secretToken": "86de51346c9440750d272659472e280e95b29fc3217517b952f0ecafa970b7b0b21443497ab91e262b2c7c68a4c3ed99b7f9865e063cc558fc263e8cd737aec9",
        "website": "userUpdated.com",
        "createdAt": "2025-05-28T21:06:35.816Z",
        "updatedAt": "2025-05-28T21:08:49.416Z"
    }
}
```

### 4. Delete Account
**DELETE** `/api/accounts/:id`

**Example:** `DELETE /api/accounts/847afb00-92bc-4acc-aaa6-4fa27431585e`

**Response:**
```json
{
    "success": true,
    "message": "Account deleted Successfully"
}
```

## Destination APIs

### 1. Create Destination
**POST** `/api/destinations/:accountId`

**Example:** `POST /api/destinations/b8820692-60f3-4d57-a8b1-fb7a94153d02`

**Request Body:**
```json
{
    "url": "https://webhook.site/8505605b-3cfd-401e-8c2d-2652a4973bd9",
    "method": "POST",
    "headers": {
        "APP_ID": "1234APPID1234",
        "APP_SECTET": "enwdj3bshwer43bjhjs9ereuinkjcnsiurew8s",
        "ACTION": "user.update",
        "Content-Type": "application/json",
        "Accept": "*/*"
    }
}
```

**Response:**
```json
{
    "success": true,
    "message": "Destination created successfully",
    "data": {
        "id": "e229a6c6-ff2f-4ed0-9c03-dddb5098289d",
        "url": "https://webhook.site/8505605b-3cfd-401e-8c2d-2652a4973bd9",
        "method": "POST",
        "headers": {
            "APP_ID": "1234APPID1234",
            "APP_SECTET": "enwdj3bshwer43bjhjs9ereuinkjcnsiurew8s",
            "ACTION": "user.update",
            "Content-Type": "application/json",
            "Accept": "*/*"
        },
        "accountId": "b8820692-60f3-4d57-a8b1-fb7a94153d02",
        "updatedAt": "2025-05-28T21:12:45.536Z",
        "createdAt": "2025-05-28T21:12:45.536Z"
    }
}
```

### 2. Get Destinations by Account ID
**GET** `/api/destinations/account/:accountId`

**Example:** `GET /api/destinations/account/b8820692-60f3-4d57-a8b1-fb7a94153d02`

**Response:**
```json
{
    "success": true,
    "message": "Destinations fetched successfully",
    "data": [
        {
            "id": "e229a6c6-ff2f-4ed0-9c03-dddb5098289d",
            "accountId": "b8820692-60f3-4d57-a8b1-fb7a94153d02",
            "url": "https://webhook.site/8505605b-3cfd-401e-8c2d-2652a4973bd9",
            "method": "POST",
            "headers": {
                "APP_ID": "1234APPID1234",
                "APP_SECTET": "enwdj3bshwer43bjhjs9ereuinkjcnsiurew8s",
                "ACTION": "user.update",
                "Content-Type": "application/json",
                "Accept": "*/*"
            },
            "createdAt": "2025-05-28T21:12:45.536Z",
            "updatedAt": "2025-05-28T21:12:45.536Z"
        },
        {
            "id": "3a8b07ba-0505-4581-ad1f-e077d898a219",
            "accountId": "b8820692-60f3-4d57-a8b1-fb7a94153d02",
            "url": "https://webhook.site/8505605b-3cfd-401e-8c2d-2652a4973bd9",
            "method": "GET",
            "headers": {
                "APP_ID": "1234APPID1234",
                "APP_SECTET": "enwdj3bshwer43bjhjs9ereuinkjcnsiurew8s",
                "ACTION": "user.update",
                "Content-Type": "application/json",
                "Accept": "*/*"
            },
            "createdAt": "2025-05-28T21:13:59.372Z",
            "updatedAt": "2025-05-28T21:13:59.372Z"
        }
    ]
}
```

### 3. Update Destination
**PATCH** `/api/destinations/:id`

**Example:** `PATCH /api/destinations/e229a6c6-ff2f-4ed0-9c03-dddb5098289d`

**Request Body:**
```json
{
    "url": "https://webhook.site/8505605b-3cfd-401e-8c2d-2652a4973bd9",
    "method": "GET",
    "headers": {
        "APP_ID": "1234APPID1234 updated",
        "APP_SECTET": "enwdj3bshwer43bjhjs9ereuinkjcnsiurew8s",
        "ACTION": "user.update",
        "Content-Type": "application/json",
        "Accept": "*/*"
    }
}
```

**Response:**
```json
{
    "success": true,
    "message": "Destination updated successfully",
    "data": {
        "id": "e229a6c6-ff2f-4ed0-9c03-dddb5098289d",
        "accountId": "b8820692-60f3-4d57-a8b1-fb7a94153d02",
        "url": "https://webhook.site/8505605b-3cfd-401e-8c2d-2652a4973bd9",
        "method": "GET",
        "headers": {
            "APP_ID": "1234APPID1234 updated",
            "APP_SECTET": "enwdj3bshwer43bjhjs9ereuinkjcnsiurew8s",
            "ACTION": "user.update",
            "Content-Type": "application/json",
            "Accept": "*/*"
        },
        "createdAt": "2025-05-28T21:12:45.536Z",
        "updatedAt": "2025-05-28T21:21:32.993Z"
    }
}
```

### 4. Delete Destination
**DELETE** `/api/destinations/:id`

**Example:** `DELETE /api/destinations/e229a6c6-ff2f-4ed0-9c03-dddb5098289d`

**Response:**
```json
{
    "success": true,
    "message": "Destination deleted successfully"
}
```

## Incoming Data API

### 1. Send Incoming Data
**POST** `/server/incoming_data`

**Header:**
```
CL-X-TOKEN: 86de51346c9440750d272659472e280e95b29fc3217517b952f0ecafa970b7b0b21443497ab91e262b2c7c68a4c3ed99b7f9865e063cc558fc263e8cd737aec9
```

**Request Body:**
```json
{
    "userId": 123,
    "action": "updated profile",
    "time": "2025-05-29T14:00:00Z"
}
```

**Response:**
```json
{
    "success": true,
    "message": "Data sent to destination"
}
```