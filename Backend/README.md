# Backend – Mon Vieux Grimoire

## Installation & Launch

### 1. Install dependencies

While in the Backend directory, run the command npm install.
```bash
npm install
```

### 2. Configure environment variables

Use the `env.example` file as a template and rename it to `.env`.
Fill in the parameters in the .env file.

```env
HTTP_PORT=4000 # The port on which the server will listen for requests.

DB_NAME= # The name of the database. (For example - Grimoire)

# To use MongoDB locally: (For use Docker)

Database administrator password

DB_USER= # Database administrator username
DB_PASSWORD= # Database administrator password
DB_HOST=localhost # The host of the database. 
		  # For local development, this is typically set to "localhost", 
		  # which means the database is hosted on the same machine as the application.
DB_PORT=27017 # The port on which the database server is listening for connections. 
	      #By default, MongoDB uses port 27017.

# MongoDB Atlas (optional)
DB_USER_ATLAS= #The username for the MongoDB Atlas database administrator. 
DB_PASSWORD_ATLAS= # The password associated with the MongoDB Atlas administrator username.
DB_CLUSTER= # The MongoDB Atlas cluster URL, which specifies the address of the cluster in the MongoDB Atlas cloud service.
DB_APP_NAME= # The name of the MongoDB Atlas application or project associated with the database cluster.
```

### 3. Start MongoDB with Docker

To run MongoDB locally, you need to use Docker. 
If Docker is not installed, you should download and install it from the official website: https://www.docker.com.
IMPORTANT! The .env file must be filled out before starting the Docker container creation, 
as the MongoDB administrator login and password are required to create the image.

After installing Docker, you need to create a container using the following command:

```bash
docker compose up -d
```
To create the Docker container, Docker Compose will use the docker-compose.yml file located in the Backend folder.

### 4. Start the server

To run the project using the local database, execute the command (development mode):

```bash
npm run dev
```

To run the project using the cloud service, execute the command (production):

```bash
npm run prod
```
