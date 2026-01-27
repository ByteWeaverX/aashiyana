FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Install system dependencies required by some Python packages
RUN apt-get update \
    && apt-get install -y --no-install-recommends build-essential libgomp1 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install Python dependencies first to leverage Docker layer caching
COPY requirements.txt /app/
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Copy project
COPY . /app

# Set default port
ENV PORT=5000

# Expose port
EXPOSE ${PORT}

# Create entrypoint script to use environment variables
RUN echo '#!/bin/bash\ngunicorn app:app -w 4 -b 0.0.0.0:${PORT} --timeout 120' > /app/entrypoint.sh && \
    chmod +x /app/entrypoint.sh

# Use entrypoint script to properly interpret environment variables
ENTRYPOINT ["/app/entrypoint.sh"]
