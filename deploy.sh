#!/bin/bash
# Vercel Deploy Script for AWS Blog Demo
# Usage: ./deploy.sh

set -e

echo "🚀 开始部署到Vercel..."

# 部署到生产环境
cd /home/ubuntu/aws

echo "📦 部署中..."
DEPLOY_OUTPUT=$(vercel --prod --token=$VERCEL_TOKEN 2>&1)

echo "$DEPLOY_OUTPUT"

# 提取部署URL
DEPLOY_URL=$(echo "$DEPLOY_OUTPUT" | grep -E "https://.*\.vercel\.app" | tail -1 | awk '{print $NF}')

if [ -n "$DEPLOY_URL" ]; then
    echo ""
    echo "✅ 部署成功！"
    echo "🔗 访问地址: $DEPLOY_URL"
    
    # 发送Telegram通知
    if [ -n "$TELEGRAM_TOKEN" ] && [ -n "$TELEGRAM_CHAT_ID" ]; then
        curl -s -X POST "https://api.telegram.org/bot$TELEGRAM_TOKEN/sendMessage" \
            -d "chat_id=$TELEGRAM_CHAT_ID" \
            -d "text=🚀 AWS Blog Demo 已更新！%0A%0A🔗 $DEPLOY_URL" \
            -d "parse_mode=HTML"
    fi
else
    echo "❌ 部署失败，请检查输出"
    exit 1
fi
