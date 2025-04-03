## Quickstart: Run the Database Locally

### Prerequisites

- [Docker](https://www.docker.com/) installed and running
- Bash shell to execute the script
- `psql` installed (for manual testing)

---

### DB setup
Start the postgreSQL container

```bash
docker-compose up -d
```
Run init to create all the tables, insert sample users, items and borrow requestf

```bash
./init-db.sh
```