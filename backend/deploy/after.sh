#!/bin/bash

echo "After installing"

pm2 delete all

pm2 flush
