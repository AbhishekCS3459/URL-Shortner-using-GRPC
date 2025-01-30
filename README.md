# URL Shortener AsyncAPI Documentation

This repository implements an **AsyncAPI 3.0.0** specification for a URL Shortener service. It supports operations to shorten URLs, retrieve shortened URL details, and handle URL redirections.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [High-Level Design (HLD) for URL Shortener](#high-level-design-hld-for-url-shortener)
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

## High-Level Design (HLD) for URL Shortener
### Design 

![image](https://github.com/user-attachments/assets/3d7e8919-3c84-40f5-8838-1f6adfcadd7d)

### 1. Overview
This document presents the High-Level Design (HLD) for a URL Shortener system, similar to TinyURL or Bitly. The system is developed using Node.js, gRPC, and AWS. It is designed to be scalable, highly available, and efficient in generating and resolving shortened URLs.

### 2. Functional Requirements
1. **Shorten URL** - Given a long URL, generate a short URL.
2. **Redirect URL** - Given a short URL, retrieve and redirect to the original long URL.
3. **Track Metrics** - Capture usage statistics for each shortened URL.

### 3. Non-Functional Requirements
1. **Low Latency** - Ensure quick response times for URL redirection.
2. **High Availability** - The system should be highly available with minimal downtime.
3. **Scalability** - Handle high read and write throughput.
4. **Security** - Prevent abuse, such as brute force attempts to guess URLs.

### 4. Architecture Overview
The system is designed with the following key components:

- **API Gateway**: Receives all incoming requests, routes them to the appropriate microservices using gRPC, and ensures security and rate limiting.
- **URL Shortener Service**: Generates a unique short URL and stores the mapping of short URLs to long URLs in the database.
- **URL Redirection Service**: Fetches the original URL from the database using the short URL and returns it for redirection.
- **Database**: Uses a NoSQL database like DynamoDB for high-speed read/write operations.
- **Cache Layer**: Uses Redis for fast lookups of frequently accessed URLs.
- **Load Balancer**: Distributes incoming traffic across multiple instances of microservices.
- **Logging & Monitoring**: Uses AWS CloudWatch for logging API requests and system events.

### 5. API Design

#### Shorten URL API
**Endpoint:** `POST /shorten`
```json
{
  "longUrl": "https://example.com/very-long-url"
}
```
Response:
```json
{
  "shortUrl": "https://short.ly/abcd123"
}
```

#### Redirect URL API
**Endpoint:** `GET /{shortUrl}`
Response: HTTP 302 Redirect to `longUrl`

#### Get URL Metrics API
**Endpoint:** `GET /metrics/{shortUrl}`
```json
{
  "clicks": 1500,
  "createdAt": "2024-01-01T00:00:00Z"
}
```

### 6. Security Measures
- **Hash-based URL Generation**: Prevents URL enumeration attacks.
- **HTTPS Enforcement**: Secures API communications.
- **Throttling & Rate Limiting**: Prevents excessive API calls.
- **Authentication & Authorization**: Restricts API access to authenticated users.

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

#### `api.url.shorten`
- **Address**: `api.url.shorten`
- **Description**: Channel to create shortened URLs.

#### `api.url.redirect`
- **Address**: `api.url.redirect`
- **Description**: Channel to redirect using a shortened URL.

---

### Operations

#### `api.status.subscribe`
- **Action**: Send
- **Summary**: Get API status.

#### `api.url.shorten.publish`
- **Action**: Receive
- **Summary**: Shorten a URL.

#### `api.url.shorten.subscribe`
- **Action**: Send
- **Summary**: Response after shortening the URL.

#### `api.url.redirect.subscribe`
- **Action**: Send
- **Summary**: Redirect to the original URL.

---

## Components

### Schemas

#### `ShortenUrlPayload`
```json
{
  "longUrl": "string",
  "userId": "string",
  "metadata": {
    "title": "string",
    "description": "string",
    "imageURL": "string"
  }
}
```

#### `ShortenUrlResponse`
```json
{
  "message": "string",
  "shortUrlId": "string",
  "longUrl": "string",
  "shortenURL": "string"
}
```

#### `RedirectPayload`
```json
{
  "shortUrl": "string"
}
```

### Messages

#### `shortenUrlRequest`
- **Name**: Shorten URL Request
- **Payload**: `ShortenUrlPayload`

#### `shortenUrlResponse`
- **Name**: Shorten URL Response
- **Payload**: `ShortenUrlResponse`

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

