#!/bin/bash

echo "Waiting for MySQL to be ready..."
sleep 30

echo "Starting Node.js server..."
node Server.js