# Home Media Server (HMS)

A home media server built with **NestJS** and **Clean Architecture**, designed to stream movies and media within a local home network. It supports downloading files from provided URLs using **Redis** queues and **Bull MQ** for background job processing, with media management and processing capabilities.

## Features

- **Media Streaming**: Stream movies and media files over a local network via **RESTful APIs**, supporting seamless playback.
- **File Download Management**: Queue and process file downloads from URLs using **Bull MQ** and **Redis**, enabling efficient background task handling.
- **Media Library Management**: Store and manage media metadata (e.g., titles, file paths) in a **PostgreSQL** database using **TypeORM**.
- **Media Processing**: Extract video frames for thumbnails or previews using **FFmpeg**, enhancing the user interface.
- **Archive Handling**: Extract media files from RAR archives with **Node-unrar-js**, simplifying content addition.
- **Scalable Architecture**: Implement **Clean Architecture** and **CQRS** for modular, maintainable code, with **Docker** for containerized deployment.

## Technology Stack

- **NestJS**: Progressive Node.js framework for scalable server-side applications.
- **TypeScript**: Typed JavaScript for robust development.
- **PostgreSQL**: Open-source relational database for media metadata.
- **Redis**: In-memory store for caching and job queue management.
- **Bull MQ**: Robust queue system for background tasks.
- **FFmpeg**: Multimedia framework for video processing.
- **Node-unrar-js**: Module for extracting RAR archives.
- **TypeORM**: ORM for database interactions.
- **Docker**: Containerization for consistent development and deployment.
- **CQRS**: Command Query Responsibility Segregation for scalable design.

## Prerequisites

- **Docker** and **Docker Compose**: For running the application in containers.
- **Node.js** (optional, for non-Docker setup): Version 18.x or higher.
- **Git**: For cloning the repository.

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/astric-0/HMS-Server-Clean-Architecture.git
   cd HMS-Server-Clean-Architecture

## Execution

1. **Set up**:
   ```bash
   # create .env file using copy of .env.example
   cp .env.example .env
2. **Set up enviornment variables**:
   ```bash
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=postgres
   POSTGRES_DB=hms
   PORT=3000  
3. **Run**:
   ```bash
   # run using docker
   docker-compose up -d
