#!/bin/bash

# Define the repository directory and navigate to it
REPO_DIR=~/school_collab
cd $REPO_DIR

# Pull the latest changes
git pull origin main

# Backend Deployment
# -------------------

# Navigate to the .NET Core project directory and build
cd Graduater/Api
dotnet publish -c Release -o out

# Restart the .NET Core backend service
sudo systemctl restart syp-b.service

# Frontend Deployment
# -------------------

# Navigate to the Next.js project root
cd $REPO_DIR

# Install dependencies and build the Next.js project
npm install
npm run build

# Restart the Next.js application service
sudo systemctl restart syp-f.service
