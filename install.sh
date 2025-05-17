#!/bin/bash

sudo mkdir -p /app
sudo cp -r smartbox /app/cn.fmsoft.hybridos.settings
sudo cp -r smart-panel /app/cn.fmsoft.hybridos.smartcontrolpanel
sudo cp -r instrument /app/cn.fmsoft.hybridos.instrument
sudo cp -r access-control /app/cn.fmsoft.hybridos.ac

echo "Installation complete!"
