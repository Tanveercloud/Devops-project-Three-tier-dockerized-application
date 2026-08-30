MERN Three-Tier Dockerized Application

A MERN e-commerce application containerized and deployed as a three-tier architecture using Docker and Docker Compose.

Architecture

Presentation tier: React/Vite application served by Nginx.

Application tier: Node.js + Express backend.

Data tier: MongoDB with persistent Docker volume storage.

Reverse proxy: Nginx routes /api/* requests to the backend container.

Container networking: All three services communicate over a dedicated Docker bridge network.

Request flow

Browser
   |
   | HTTP :5173
   v
Nginx / React
   |
   | /api/*
   v
Node.js + Express :5000
   |
   | MongoDB
   v
MongoDB :27017

Dockerization

Backend

The backend uses node:22-alpine.

Key choices:

Small Alpine base image.

npm install --legacy-peer-deps to accommodate the application's dependency tree.

Application runs with node server.js.

Backend port 5000 is internal to the Docker network in Compose.

Frontend

The frontend uses a multi-stage build:

node:22-slim builds the Vite application.

nginx:alpine serves the generated dist/ files.

This keeps Node/build dependencies out of the runtime image.

Nginx also:

serves the React SPA,

supports client-side routes with try_files,

reverse-proxies /api/ to backend:5000.

Database

MongoDB runs from the official mongo:latest image.

Persistent storage is provided by:

volumes:
  - mongo-data:/data/db

The database has no public host port in the final Compose configuration; it is reachable by the backend through the Docker network.

Docker Compose

The Compose stack defines:

database

backend

frontend

with:

mern-network for service-to-service communication.

mongo-data for persistence.

depends_on for startup ordering.

env_file for backend environment variables.

Start the stack:

docker compose up -d --build

Check status:

docker compose ps

Stop the stack:

docker compose down

The MongoDB data remains in the named volume unless the volume is explicitly removed.

Verification

The deployment was tested end-to-end.

Frontend:

curl -I http://localhost:5173

API through Nginx:

curl -v http://localhost:5173/api/products

The /api/products request returned HTTP 200 OK, confirming the path:

Nginx → backend → MongoDB

The API response was an empty JSON array at the time of testing because no product records were present.

Image sizes

Record the final values from:

docker images --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}"

Current measured values from the deployment notes:

Image

Size

mern-backend:v2

~372 MB

mern-frontend:v1

Fill from final docker images output

mongo:latest

~1.3 GB

Note: MongoDB is a database image rather than an application image, so its larger size is expected.

Security / configuration notes

JWT and other credentials are kept in environment configuration rather than hard-coded in source.

Braintree payment processing was made optional for this deployment exercise so the application can run without production payment credentials.

MongoDB is not intended to be exposed publicly.

Backend port 5000 is internal to the Compose network.

Nginx is the single application entry point.

Repository

GitHub:
https://github.com/Tanveercloud/Devops-project-Three-tier-dockerized-application

Project outcome

The project demonstrates:

Dockerfile creation for frontend and backend.

Multi-stage frontend image optimization.

Docker networking.

Persistent database volumes.

Docker Compose orchestration.

Nginx reverse proxying.

Containerized MERN application deployment.

End-to-end API verification.
