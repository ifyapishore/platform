#!/bin/bash

# Function to get REMOTE_HOST from Docker context
getRemoteHost() {
  docker context inspect | grep '"Host"' | head -1 | sed -E 's/.*ssh:\/\/([^"]+)".*/\1/'
}

# Function to kill existing SSH tunnels to REMOTE_HOST
killExistingTunnels() {
  echo "🔪 Killing existing SSH tunnels to $REMOTE_HOST..."
  ps aux | grep "ssh" | grep "$REMOTE_HOST" | grep "\-L" | awk '{print $2}' | xargs -r kill
}

# Function to forward a single port or a port range
dockerForward() {
  local portSpec=$1

  if [[ "$portSpec" == *"-"* ]]; then
    local startPort=$(echo "$portSpec" | cut -d'-' -f1)
    local endPort=$(echo "$portSpec" | cut -d'-' -f2)

    for port in $(seq "$startPort" "$endPort"); do
      echo "🚀 Forwarding port in range [$startPort: $endPort] - $port..."
      ssh -N -f -L "$port:localhost:$port" "$REMOTE_HOST"
    done
  else
    echo "🚀 Forwarding port - $portSpec..."
    ssh -N -f -L "$portSpec:localhost:$portSpec" "$REMOTE_HOST"
  fi
}

# --- MAIN SCRIPT STARTS ---

# Step 1: Get remote host
REMOTE_HOST=$(getRemoteHost)
echo "🌍 Detected remote host: $REMOTE_HOST"

# Step 2: Kill old tunnels
killExistingTunnels

# Step 3: Switch context silently
docker context use remote > /dev/null

# Step 4: Collect unique ports
PORT_LIST=$(docker ps --format '{{.Ports}}' | \
  grep -oE '([0-9]+)(-[0-9]+)?->' | \
  sed 's/->//' | \
  sort -u)

# Step 5: Forward all collected ports
for portSpec in $PORT_LIST; do
  dockerForward "$portSpec"
done

dockerForward "3000"

echo "✅ All ports are tunneled fresh through SSH!"
