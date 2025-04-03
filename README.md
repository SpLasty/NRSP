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

This will:
- Launch a PostgreSQL 15 container
- Load credentials from the internal environment (defined in the `docker-compose.yml`)
- Expose the database on port the port specified in .env file

---

## Step 2: Initialize the Database

Navigate to the `backend/db/` directory and run the initialization script:

```bash
cd backend/db
chmod +x init-db.sh
./init-db.sh
```

This will:
- Create the database schema (tables for users, items, borrow requests)
- Seed the database with sample data

You can verify the tables manually using `psql` or pgAdmin.

---

## Step 3: Setup the Backend (NestJS API)

The backend code is located in the `backend/` directory. It connects to the PostgreSQL database using environment variables and TypeORM.

### Create a `.env` file in `backend/`:

```env
POSTGRES_DB=value
POSTGRES_USER=value
POSTGRES_PASSWORD=value
POSTGRES_PORT=value
POSTGRES_HOST=value
JWT_SECRET=value (for later)
```

Note: This file should **not** be committed. A `.env.example` file should be created for sharing defaults.

---

### Install Dependencies and Start the Backend

```bash
cd backend
npm install
npm run start:dev
```

This will:
- Start the NestJS development server on `http://localhost:3000`
- Automatically reload on file changes
- Connect to the PostgreSQL DB and log DB activity

To verify, visit:

```bash
http://localhost:3000
```


---

## Project Structure

```
/ (project root)
├── backend/                # NestJS backend
│   ├── src/
│   ├── test/
│   ├── db/                 # Schema, seed, and init-db.sh scripts
│   ├── .env                # Local secrets (ignored)
│   └── README.md
├── docker-compose.yml      # Spins up PostgreSQL
└── README.md               # Main project README
```

---

## Environment and Secrets

- Each service (backend, database) manages its own `.env` file.
- These files are excluded via `.gitignore`.
- Actual secrets will be submitted in `config.yml` on D2L as required.

## Authors

Wasif Ud Dowlah  
Faiz Marsad  
Shahriar Bin Zaman  

SENG 513 - Group 5 - Winter 2025
EOF
