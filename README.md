# HNG12 DevOps Stage 1 - Personal API

A minimal Node.js (Express) API built with TypeScript and Bun, deployed on an AWS EC2 instance. This project serves as a demonstration of backend service structure, Nginx reverse proxy configuration, and process persistence for DevOps Stage 1.

## 🚀 Live Deployment
The API is publicly accessible at:
URL: http://13.48.68.182 or https://kellstech.duckdns.org/


🛠️ Project Setup & Local Development

### Prerequisites
- Bun (Recommended) or Node.js
- Nginx (for reverse proxy)
- PM2 (for process management)

### Local Installation

1. #### Clone the repository:
```
git clone https://github.com/KellsCodes/HNG14Stage1.git
cd HNG14Stage1.git
```

2. #### Install dependencies:
# if no bun installed, install bun using:

```
# Update your packages:
sudo apt update

# Run the Installation Script
curl -fsSL https://bun.sh/install | bash

# Add Bun to Your PATH 
echo 'export BUN_INSTALL="$HOME/.bun"' >> ~/.bashrc
echo 'export PATH="$BUN_INSTALL/bin:$PATH"' >> ~/.bashrc

# Reload the configuration:
source ~/.bashrc

# Verify the Installation
bun --version

bun install

```

3. #### Run the application:
```
bun start
```
The server will start on http://localhost:5001.

### 📡 API Endpoints
All endpoints return Content-Type: application/json with an HTTP 200 OK status and a response time of < 500ms.

#### 1. Root Endpoint
##### GET /
```
{
  "message": "API is running"
}
```

#### 2. Health Check
##### GET /health
```
{
  "message": "healthy"
}
```
#### 3. Personal Details
##### GET /me
```
{
  "name": "Ifeanyi Nworji",
  "email": "nworjiifeanyi@gmail.com",
  "github": "https://github.com/kellscodes"
}
```

## 🏗️ Deployment Details (DevOps)

### 1. Reverse Proxy Configuration (Nginx)
The application runs locally on port 5001. Nginx is configured to listen on port 80 and proxy requests to the application:

```
# nginx config: /etc/nginx/sites-available/default

# 1. HTTPS Block - Handles all secure traffic
server {
    listen [::]:443 ssl; 
    listen 443 ssl; 
    server_name kellstech.duckdns.org 13.48.68.182;

    ssl_certificate /etc/letsencrypt/live/kellstech.duckdns.org/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/kellstech.duckdns.org/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    location /api {
        default_type application/json;
        return 200 '{"message":"HNGI14 Stage 0","track":"DevOps","username":"kells"}';
    }

    location / {
        proxy_pass http://127.0.0.1:5001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

server {
    listen 80;
    listen [::]:80;
    server_name kellstech.duckdns.org 13.48.68.182;

    location / {
        return 301 https://kellstech.duckdns.org$request_uri;
    }
}
```
### 2 Save and Restart:

```
sudo nginx -t
sudo systemctl restart nginx
```

# 2. Process Persistence
To ensure the API remains online after SSH sessions end or system reboots, PM2 is used to manage the process:

```
# Using PM2 to ensure it's up
pm2 start src/app.ts --name "stage1" -- 5001

# Ensure PM2 starts on boot
pm2 save
pm2 startup

```

## 🗂️ Project Structure
```
.
├── src/
│   ├── routes/
│   │   └── main.ts     # Route handlers for /, /health, and /me
│   └── app.ts          # Express application setup
├── package.json        # Project dependencies and scripts
└── tsconfig.json       # TypeScript configuration
```


### Author: Ifeanyi Nworji
### HNG12 DevOps Track