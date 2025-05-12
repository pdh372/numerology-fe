#!/usr/bin/env bash

SERVER="pet"
DEPLOY_PATH="/var/www/numerology-fe/out"
SOURCE_FOLDER_NAME="out"

FILE_NAME="$SOURCE_FOLDER_NAME.tar.gz"
echo "=================================="


START_TIME=$(date +%s%3N)

pnpm build

tar -zc -f ${FILE_NAME} ${SOURCE_FOLDER_NAME} tsconfig.json next.config.js package.json tailwind.config.js postcss.config.js
echo "=================================="
echo "Upload source..."
scp ${FILE_NAME} ${SERVER}:~
echo "=================================="
echo "Deploying..."

SCRIPT1="cd ~ && sudo mkdir -p $DEPLOY_PATH"
SCRIPT2="sudo mv $FILE_NAME $DEPLOY_PATH"
SCRIPT3="cd $DEPLOY_PATH && sudo tar -xzf $FILE_NAME"
SCRIPT4="sudo rm -rf $FILE_NAME"
SCRIPT5="cd $DEPLOY_PATH && cd .."
SCRIPT6="/root/.nvm/versions/node/v22.15.0/bin/npx serve out"
#   pm2 start "npx serve out -p 5005" --name=numerology-fe
SCRIPT7="pm2 restart --time --sort=id numerology-fe"
# SCRIPT8="bash ../script/discord.sh"
ssh ${SERVER} "$SCRIPT1 && $SCRIPT2 && $SCRIPT3 && $SCRIPT4 && $SCRIPT5 && $SCRIPT6 && $SCRIPT7"

END_TIME=$(date +%s%3N)
ELAPSED_TIME=$(echo "scale=3; ($END_TIME - $START_TIME) / 1000" | bc)

echo "Deploy finished..."
echo "=================================="
echo "Deployment took $ELAPSED_TIME seconds."
rm -rf ${FILE_NAME}