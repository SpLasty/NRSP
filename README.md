# Neighborhood Resource Sharing Platform

This project is a full-stack web application that allows neighbors to lend and borrow tools and items. It includes a PostgreSQL database, a NestJS backend (REST API), and a React frontend (coming soon).

## Tech Stack

- Backend: NestJS (Node.js + TypeScript)
- Database: PostgreSQL (via Docker)
- ORM: TypeORM
- Containerization: Docker / Docker Compose

## Quickstart: Run the Project Locally

### Prerequisites

- Docker installed and running
- Bash shell to execute scripts
- `psql` installed (optional, for manual DB testing)
- Node.js (version 18 or higher) and npm installed

---

## Step 1: Start the PostgreSQL Database

From the project root:

```bash
docker-compose up -d
```
You can view the database via pgadmin or run cli sql commands.


## Step 2: Setup the Backend (NestJS API)

Change directory into Backend and run npm install. After that this command:  **npm run start**. Drop the env file for backend

## Step 3: Setup the Frontend(React+MUI)
Change Directory into frontend and npm install. Drop the env file in frontend folder and then run this command: **npm run dev**

### Create a `.env` file in `backend/`:

```env

env file has to be placed inside frontend, inside backend and inside root directory.
Here are the env files:

root directory .env
POSTGRES_DB=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_PORT=
POSTGRES_HOST=
JWT_SECRET=
VITE_GOOGLE_MAPS_MAP_ID =


Frontend env:
VITE_API_URL=http://localhost:3000

Backend env:
POSTGRES_DB=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_PORT=
POSTGRES_HOST=
JWT_SECRET=



## Authors

Wasif Ud Dowlah  
Faiz Marsad  
Shahriar Bin Zaman  

SENG 513 - Group 5 - Winter 2025
EOF
