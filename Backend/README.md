# Backend – Mon Vieux Grimoire

## Installation & Launch

### 1. Install dependencies

While in the `backend` directory, run the following command:

```bash
npm install
```

---

### 2. Configure environment variables

Use the `env.example` file as a template and rename it to `.env`.  
Then fill in the required parameters in the `.env` file:

```env
HTTP_PORT=4000                      # The port on which the server will listen for requests.
DB_NAME=Grimoire                    # The name of the database.

# Local MongoDB (used with Docker)
DB_USER=admin                       # Database administrator username.
DB_PASSWORD=secret                  # Database administrator password.
DB_HOST=localhost                   # Hostname of the database (usually localhost for local development).
DB_PORT=27017                       # Port on which MongoDB listens (default is 27017).

# MongoDB Atlas (optional)
DB_USER_ATLAS=                     # MongoDB Atlas administrator username.
DB_PASSWORD_ATLAS=                 # MongoDB Atlas administrator password.
DB_CLUSTER=                        # MongoDB Atlas cluster URL (e.g. cluster-name.mongodb.net).
DB_APP_NAME=                       # Name of the MongoDB Atlas application/project.
```

---

### 3. Start MongoDB with Docker

To run MongoDB locally, Docker is required.  
If Docker is not installed, download and install it from the official website: [https://www.docker.com](https://www.docker.com).

**IMPORTANT:**  
Make sure the `.env` file is filled **before** running the Docker container.  
The MongoDB administrator username and password are required to initialize the database.

Then, run the following command to start the MongoDB container:

```bash
docker compose up -d
```

Docker Compose will use the `docker-compose.yml` file located in the `backend` folder.

---

### 4. Start the server

To run the project using the **local database** (development mode):

```bash
npm run dev
```

To run the project using **MongoDB Atlas** (production mode):

```bash
npm run prod
```
