#!/bin/bash

echo "Start"

sleep 2

pm2 start /home/ec2-user/app/dist/server.js

echo "Server started"
