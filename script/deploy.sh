#!/usr/bin/env bash

cd ..

SERVER="pet"
DEPLOY_PATH="/var/www"
SOURCE_FOLDER_NAME="numerology-fe"

FILE_NAME="${SOURCE_FOLDER_NAME}.tar.gz"
echo "=================================="

START_TIME=$(date +%s%3N)

tar -zc -f ${FILE_NAME} --exclude="${SOURCE_FOLDER_NAME}/node_modules" --exclude="${SOURCE_FOLDER_NAME}/.next" ${SOURCE_FOLDER_NAME}

echo "=================================="
echo "Upload source..."
scp ${FILE_NAME} ${SERVER}:~
echo "=================================="
echo "Deploying..."

SCRIPT1="cd ~ && sudo mkdir -p $DEPLOY_PATH"
SCRIPT2="sudo mv $FILE_NAME $DEPLOY_PATH"
SCRIPT3="cd $DEPLOY_PATH && sudo tar -xzf $FILE_NAME"
SCRIPT4="sudo rm -rf $FILE_NAME"
SCRIPT5="cd $DEPLOY_PATH && cd $SOURCE_FOLDER_NAME"
SCRIPT6="/root/.nvm/versions/node/v22.15.0/bin/pnpm install && pnpm build"
#   pm2 start "pnpm start" --name=numerology-fe --env PORT=5005
# SCRIPT7="pm2 restart --time --sort=id numerology-fe"
# SCRIPT8="bash ../script/discord.sh"
ssh ${SERVER} "$SCRIPT1 && $SCRIPT2 && $SCRIPT3 && $SCRIPT4 && $SCRIPT5 && $SCRIPT6"

END_TIME=$(date +%s%3N)
ELAPSED_TIME=$(echo "scale=3; ($END_TIME - $START_TIME) / 1000" | bc)

echo "Deploy finished..."
echo "=================================="
echo "Deployment took $ELAPSED_TIME seconds."
rm -rf ${FILE_NAME}
