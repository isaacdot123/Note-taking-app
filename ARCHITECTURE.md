# Architecture Overview

This repository is a MERN-style note-taking application with a React frontend and an Express/MongoDB backend.

```mermaid
flowchart TB
    User([User])

    subgraph Frontend["React Frontend (Vite)"]
        Pages["Pages<br/>Home, Create, Detail"]
        Components["Reusable Components<br/>Navbar, Note Card, Status Views"]
        Axios["Axios API Client"]
        Pages --> Components
        Pages --> Axios
    end

    subgraph Backend["Express Backend"]
        Server["server.js<br/>HTTP Server & Middleware"]
        Limiter["Rate Limiter"]
        Routes["/api/notes Routes"]
        Controllers["Notes Controllers"]
        Model["Mongoose Note Model"]

        Server --> Limiter
        Limiter --> Routes
        Routes --> Controllers
        Controllers --> Model
    end

    subgraph Data["Data & External Services"]
        Mongo[("MongoDB")]
        Redis[("Upstash Redis<br/>Rate Limiting")]
    end

    User -->|Browser| Pages
    Axios -->|HTTP REST JSON| Server
    Model -->|Mongoose| Mongo
    Limiter -->|Check request limits| Redis

    subgraph API["Notes REST API"]
        direction LR
        CRUD["GET /api/notes<br/>GET /api/notes/:id<br/>POST /api/notes<br/>PUT /api/notes/:id<br/>DELETE /api/notes/:id"]
    end

    Routes -. defines .-> CRUD
```

## Runtime Flow

1. The user interacts with React pages rendered by Vite.
2. The Axios client sends REST requests to the Express API.
3. Express applies JSON parsing and rate-limiting middleware.
4. Note routes dispatch requests to the controller functions.
5. Controllers use the Mongoose `Note` model for CRUD operations.
6. Mongoose stores and retrieves note documents in MongoDB.

In development, the frontend calls `http://localhost:5001/api`; in production, it uses the same-origin `/api` path and serves the built frontend from Express.
