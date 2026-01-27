# Deployment Guide — AASHIYANA

This document explains how to containerize and deploy the Aashiyana Flask application. The repository includes a `Dockerfile`, `docker-compose.yml`, and a `Procfile` to ease deployment.

1) Run locally with Docker (recommended)

Prerequisites:
- Docker installed (Desktop or Engine)

Build image locally:
```powershell
cd C:\Users\DELL\Desktop\aashiyana\House_price_pridiction
docker build -t aashiyana-house:latest .
```

Run container locally:
```powershell
docker run --rm -p 5000:5000 --name aashiyana-local \
  -e SECRET_KEY="your-secret-here" \
  aashiyana-house:latest
```

Or use docker-compose for development (live-mounted code):
```powershell
docker-compose up --build
```

Then open: http://localhost:5000

2) Push image to Docker Hub (optional)

Tag and push (replace `<your-dockerhub-username>`):
```powershell
docker tag aashiyana-house:latest <your-dockerhub-username>/aashiyana-house:latest
docker push <your-dockerhub-username>/aashiyana-house:latest
```

3) Deploy to a cloud/container service

Azure Container Instances (example):
- Login to Azure and set variables:
```powershell
az login
az group create -n aashiyana-rg -l eastus
az container create -g aashiyana-rg -n aashiyana --image <your-dockerhub-username>/aashiyana-house:latest --dns-name-label aashiyana-demo --ports 5000 --environment-variables SECRET_KEY=your-secret
```

DigitalOcean App Platform / AWS ECS / GCP Cloud Run / Azure Web App for Containers all support deploying a container image — push the image to a registry and follow the provider instructions.

4) Deploy to a VPS (Docker-compose)

On a Linux VPS (Ubuntu 20.04+):
```bash
# Copy repo to server, then:
docker-compose -f /path/to/docker-compose.yml up -d --build

# To view logs:
docker-compose logs -f
```

5) Notes for production
- Use a real production database (Postgres) instead of SQLite for multi-instance deployments.
- Do not store `SECRET_KEY` in source; use environment variables or a secrets manager.
- Use HTTPS (load balancer / reverse proxy) in front of containers.
- Configure log rotation and monitoring (Prometheus/Grafana, or provider-managed).
- If model file `house_price_model.pkl` is large, consider storing it in a volume or object storage and loading on startup.

6) Optional: Continuous Deployment (GitHub Actions)
- Create a GitHub Actions workflow to build and push images to Docker Hub or Azure Container Registry on `push` to your branch. If you'd like, I can scaffold a GitHub Actions workflow for you.

If you'd like, I can:
- Scaffold a GitHub Actions workflow to build + push images on commits
- Help deploy to a chosen provider (Azure/DigitalOcean/GCP) step-by-step
- Replace SQLite with PostgreSQL and add Docker Compose service for it
