# URL Shortener AsyncAPI Documentation

This repository implements an **AsyncAPI 3.0.0** specification for a URL Shortener service. It supports operations to shorten URLs, retrieve shortened URL details, and handle URL redirections.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
- [AsyncAPI Specification](#asyncapi-specification)
  - [Servers](#servers)
  - [Channels](#channels)
  - [Operations](#operations)
- [Components](#components)
  - [Schemas](#schemas)
  - [Messages](#messages)

---

## Overview

The **URL Shortener AsyncAPI** provides a simple interface to:

- Shorten long URLs with metadata.
- Retrieve shortened URL details.
- Redirect users to the original URLs using short URL identifiers.

This service is ideal for use cases where asynchronous messaging is required to manage URL operations efficiently.

---

## Features

- **AsyncAPI 3.0.0** based implementation.
- Local HTTP server setup for development and testing.
- Asynchronous message handling for:
  - API status updates.
  - URL shortening.
  - URL redirection.

---

## Getting Started

### Prerequisites

- Node.js (16.x or higher)
- npm or yarn
- Docker (optional, for containerized deployments)

### Running the Service

1. Clone the repository:
   ```bash
   git clone https://github.com/AbhishekCS3459/URL-Shortner
   cd URL-Shortner
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local server:
   ```bash
   npm start
   ```

4. Access the service at `http://localhost:3000`.

---

## AsyncAPI Specification

### Servers

| Name | Host              | Protocol | Description          |
|------|-------------------|----------|----------------------|
| http | `localhost:3000`  | HTTP     | Local HTTP server.   |

### Channels

#### `api.status`
- **Address**: `api.status`
- **Description**: Channel to get the API status.
- **Messages**:
  - **Subscribe**: Returns a plain text welcome message indicating the API is running.

#### `api.url.shorten`
- **Address**: `api.url.shorten`
- **Description**: Channel to create shortened URLs.
- **Messages**:
  - **Publish**: Payload to request URL shortening.
  - **Subscribe**: Response after shortening the URL.

#### `api.url.redirect`
- **Address**: `api.url.redirect`
- **Description**: Channel to redirect using a shortened URL.
- **Messages**:
  - **Subscribe**: Handles redirection to the original URL based on the shortened identifier.

---

### Operations

#### `api.status.subscribe`
- **Action**: Send
- **Summary**: Get API status.
- **Description**: Returns a welcome message indicating the API is running.

#### `api.url.shorten.publish`
- **Action**: Receive
- **Summary**: Shorten a URL.
- **Description**: Creates a shortened URL for the provided long URL.

#### `api.url.shorten.subscribe`
- **Action**: Send
- **Summary**: Response after shortening the URL.
- **Description**: Returns the shortened URL and its details.

#### `api.url.redirect.subscribe`
- **Action**: Send
- **Summary**: Redirect to the original URL.
- **Description**: Redirects to the original URL based on the shortened URL.

---

## Components

### Schemas

#### `ShortenUrlPayload`
- **Type**: Object
- **Properties**:
  - `longUrl`: (string) The original URL to shorten.
  - `userId`: (string) The ID of the user creating the short URL.
  - `metadata`:
    - `title`: (string) Title associated with the URL.
    - `description`: (string) Description associated with the URL.
    - `imageURL`: (string) Image URL associated with the URL.

#### `ShortenUrlResponse`
- **Type**: Object
- **Properties**:
  - `message`: (string) Confirmation message.
  - `shortUrlId`: (string) The unique ID for the shortened URL.
  - `longUrl`: (string) The original URL.
  - `shortenURL`: (string) The generated shortened URL.

#### `RedirectPayload`
- **Type**: Object
- **Properties**:
  - `shortUrl`: (string) The shortened URL identifier.

### Messages

#### `shortenUrlRequest`
- **Name**: Shorten URL Request
- **Payload**: `ShortenUrlPayload`

#### `shortenUrlResponse`
- **Name**: Shorten URL Response
- **Payload**: `ShortenUrlResponse`

#### `redirectRequest`
- **Name**: Redirect Request
- **Payload**: `RedirectPayload`

---

## Contribution

We welcome contributions! Feel free to open issues or submit pull requests to enhance this project.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

