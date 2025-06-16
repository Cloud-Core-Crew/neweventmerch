# EventMerch

A full-stack microservices-based event and merchandise platform with a Netflix-inspired UI.

## Technologies
- **Backend:** Node.js, Express, MongoDB (Mongoose), JWT Auth, AWS S3
- **Frontend:** React, Vite, Framer Motion, Netflix-style theme
- **DevOps:** .env support, Docker-ready structure

## Project Structure
```
event-merch-app/
├── backend/
│   ├── auth-service/
│   ├── event-service/
│   ├── merch-service/
│   ├── order-service/
│   ├── payment-service/
│   ├── review-service/
│   └── storage-service/
├── frontend/  (React + Vite)
├── docker-compose.yml
├── .env.example
└── README.md
```

## Backend Services
Each service has its own README with endpoints and environment variables.
- **auth-service:** User registration/login, JWT
- **event-service:** Event CRUD, seeding
- **merch-service:** Merch CRUD, image upload, seeding
- **order-service:** Orders
- **payment-service:** Payments
- **review-service:** Reviews
- **storage-service:** AWS S3 uploads

## Frontend
- Netflix-style dark theme, carousels, and animations
- Pages: Home, Events, Merchandise, Cart, Checkout, Login
- Uses Framer Motion for smooth UI

## Setup
1. Copy `.env.example` to `.env` in each backend service and fill in your secrets.
2. Install dependencies:
   ```powershell
   cd backend/<service>
   npm install
   ```
3. Start each backend service:
   ```powershell
   npm start
   ```
4. Seed sample data (optional):
   ```powershell
   Invoke-WebRequest -Uri http://localhost:5002/api/events/seed -Method POST
   Invoke-WebRequest -Uri http://localhost:5003/api/merch/seed -Method POST
   ```
5. Start the frontend:
   ```powershell
   cd frontend
   npm install
   npm run dev
   ```

## DevOps & Docker Setup

1. **Copy `.env.example` to `.env` in each backend service and fill in your secrets.**
2. **Build and run all services with Docker Compose:**
   ```powershell
   docker-compose up --build
   ```
3. **Access the frontend at** [http://localhost:5180](http://localhost:5180)
4. **All backend services are available on their respective ports (5000-5007).**
5. **MongoDB is available on port 27017.**

### Health Checks
- Each service exposes a `/health` endpoint for monitoring.

### Environment Variables
- See each service's `.env.example` for required variables.

### Stopping All Services
```powershell
docker-compose down
```

## Testing
- Each service exposes a `/health` endpoint.
- Use Postman for API testing.

## Production Nginx Setup

- Use the provided `nginx.conf` for production deployments.
- Serve the frontend static files from `/usr/share/nginx/html`.
- All `/api/` requests are proxied to the gateway container.
- For SSL, add your certificate config to the Nginx server block.

Example Docker run:
```sh
docker run -d -p 80:80 -v $(pwd)/nginx.conf:/etc/nginx/nginx.conf:ro -v $(pwd)/frontend/dist:/usr/share/nginx/html:ro nginx:alpine
```

## Kubernetes Deployment

1. Build Docker images for all services and tag them as `:latest` (or use a registry).
2. Apply all manifests in the `k8s/` directory:
   ```powershell
   kubectl apply -f k8s/
   ```
3. Access the frontend via the NodePort shown in `kubectl get svc frontend`.
4. All backend services and MongoDB will be available as Kubernetes services.

**Note:**
- You may need to create ConfigMaps or Secrets for environment variables.
- For production, use a LoadBalancer or Ingress for external access.

## License
MIT