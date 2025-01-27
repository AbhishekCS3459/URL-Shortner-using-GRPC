#!/bin/bash

echo "Running insertKeys.js"

# Run the Node.js script
node insertKeys.js

# Check the exit code of the Node.js script
if [ $? -eq 0 ]; then
  echo "Script executed successfully"
else
  echo "Script failed"
fi
