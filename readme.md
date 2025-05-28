# Data Pusher - Express Web Application

## Overview

Data Pusher is a Node.js Express application designed to receive JSON data for accounts and forward it to multiple configured destinations (webhooks). It supports managing accounts and destinations securely using an app secret token.

---

## Features

- **Account Management (CRUD):**  
  Create, Read, Update, and Delete accounts. Each account has:
  - Unique email (mandatory)
  - Unique account ID
  - Account name (mandatory)
  - Auto-generated app secret token
  - Optional website

- **Destination Management (CRUD):**  
  Each account can have multiple destinations. Each destination includes:
  - URL (mandatory)
  - HTTP method (mandatory; GET, POST, PUT)
  - Headers (mandatory; multiple key-value pairs)

- **Data Handling:**  
  Receives JSON data at `/server/incoming_data` (POST only), authenticates using the app secret token in the header `CL-X-TOKEN`, identifies the account, and forwards the data to all its destinations using the specified HTTP method and headers.

---

## Setup Instructions

### Development Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate into the project directory:
   ```bash
   cd data-pusher
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the root folder and add:
   ```env
   PORT=5000
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

### Production Setup

1. Follow steps 1-4 from Development Setup

2. Build the application:
   ```bash
   npm run build
   ```

3. Start the production server:
   ```bash
   npm start
   ```

The server will start on `http://localhost:5000` (or the port you specify in the `.env` file).

---

## Available Scripts

| Command | Description |
| ------- | ----------- |
| `npm run dev` | Start the server in development mode with hot reload |
| `npm run build` | Build the application for production |
| `npm start` | Start the server in production mode |

---

## Environment Variables

| Variable | Description         | Default |
| -------- | ------------------- | ------- |
| PORT     | Server listening port | 5000    |

---

## API Endpoints

### Account APIs

| Method | Endpoint             | Description                                      |
| ------ | -------------------- | ------------------------------------------------|
| POST   | `/api/accounts`      | Create a new account                             |
| GET    | `/api/accounts`      | Retrieve all accounts                            |
| GET    | `/api/accounts/:id`  | Retrieve a single account by ID                  |
| PATCH  | `/api/accounts/:id`  | Update account details by ID                     |
| DELETE | `/api/accounts/:id`  | Delete account by ID (also deletes its destinations) |

---

### Destination APIs

| Method | Endpoint                                  | Description                                       |
| ------ | --------------------------------------- | ------------------------------------------------ |
| POST   | `/api/destinations/:accountId`          | Create a new destination for the given account   |
| GET    | `/api/destinations/:id`                  | Retrieve a destination by ID                      |
| PATCH  | `/api/destinations/:id`                  | Update destination details by ID                  |
| DELETE | `/api/destinations/:id`                  | Delete destination by ID                          |
| GET    | `/api/destinations/account/:accountId`  | Retrieve all destinations for a given account    |

---

### Data Handler API

| Method | Endpoint                | Description                                     |
| ------ | ----------------------- | -----------------------------------------------|
| POST   | `/server/incoming_data` | Receive JSON data with `CL-X-TOKEN` header; forwards to the account's destinations |

#### Request Headers:

- `CL-X-TOKEN`: **(required)** The app secret token to authenticate the account

#### Request Body:

- JSON data to be forwarded to the destinations

#### Responses:

- **If secret token missing or invalid:**

  ```json
  {
    "success": false,
    "message": "Un Authenticate"
  }
  ```

- **If HTTP method is GET and content is not JSON or if other invalid method used:**

  ```json
  {
    "success": false,
    "message": "Invalid Data"
  }
  ```

- **On successful data forwarding:**

  ```json
  {
    "success": true,
    "message": "Data sent successfully"
  }
  ```

---

## How Data Forwarding Works

- For each destination configured under an account:
  - If HTTP method is `GET`: The incoming JSON data is sent as query parameters.
  - If HTTP method is `POST` or `PUT`: The incoming JSON data is forwarded as the request body.
  - Headers configured for each destination are included in the request.

---

## Technologies Used

- Node.js (latest)
- Express.js
- SQLite with Sequelize ORM
- Axios for HTTP requests to destinations
- Morgan for logging
- dotenv for environment variables



