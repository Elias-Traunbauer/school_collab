#!/bin/bash

# Define the repository and project directories
REPO_DIR=~/school_collab
API_DIR=$REPO_DIR/Graduater/Api
PERSISTENCE_DIR=$REPO_DIR/Graduater/Persistence

# Pull the latest changes from the repository
cd $REPO_DIR
git reset --hard HEAD
git pull origin master

# Backend Deployment
# -------------------

# Navigate to the Persistence project directory for migrations
cd $PERSISTENCE_DIR

# Run EF Core migrations (ensure the correct appsettings.json is used)
~/.dotnet/tools/dotnet-ef database update --startup-project $PERSISTENCE_DIR

# Navigate to the .NET Core API project directory and build
cd $API_DIR
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
