#!/bin/bash

echo "Starting Cleaning"

echo "kill process in port 8080"

sudo kill -9 $(lsof -t -i:8080)

if [ -d "/home/ec2-user/app/"]; then
    echo "removing files in /home/ec2-user/app/"
    rm -rf /home/ec2-user/app/*
else 
    echo "Creating directory /home/ec2-user/app/"
    mkdir -p /home/ec2-user/app
fi

