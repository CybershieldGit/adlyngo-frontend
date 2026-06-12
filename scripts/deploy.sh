#!/usr/bin/env bash
set -euo pipefail

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$APP_DIR"

echo "==> Deploying frontend from $APP_DIR"

git fetch origin
git reset --hard "origin/${DEPLOY_BRANCH:-main}"

npm ci
npm run build

if pm2 describe frontend >/dev/null 2>&1; then
  pm2 reload ecosystem.config.cjs --update-env
else
  pm2 start ecosystem.config.cjs
fi

pm2 save
echo "==> Frontend deploy complete"
