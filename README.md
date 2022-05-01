# Microservice

# Services

- User
- file upload service

# Pre-requisites

- Install Node.js above 14
- Docker (Optional)
- mongoDB

# Highlights

- Use monorepo with npm workspaces
- RabbitMQ for inter service communication
- JWT for authentication and authorization

# Run service

- Run npm install in root directory `npm install`
- Install rabbitMQ of local or Run with docker-compose `docker-compose up -d`

## User

- cd app/users-service

- npm install
- cp .env.example to .env
- npm run dev

## file upload

- cd app/users-service

- npm install
- cp .env.example to .env
- npm run dev

# Target

- Containerize with docker-compose, micro-services services and deployment
- Unit test scripts
