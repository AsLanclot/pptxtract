#!/bin/bash

# 顯示腳本信息
echo "===================================================="
echo "  PPT提取工具 - 部署腳本"
echo "===================================================="
echo ""

# 檢查SSH配置是否存在
if [ ! -f ~/.ssh/config ] || ! grep -q "Host pptxtract" ~/.ssh/config; then
  echo "請先運行 setup-ssh.sh 腳本設置SSH連接"
  exit 1
fi

# 創建遠程目錄
echo "正在創建遠程目錄結構..."
ssh pptxtract "mkdir -p ~/pptxtract/nginx/conf.d ~/pptxtract/certbot/conf ~/pptxtract/certbot/www ~/pptxtract/logs/frontend ~/pptxtract/logs/backend"

# 複製文件到伺服器
echo "正在複製文件到伺服器..."
scp app.py extract_ppt.py requirements.txt pptxtract:~/pptxtract/
scp -r templates pptxtract:~/pptxtract/
scp dockerfile.backend dockerfile.frontend docker-compose.yml pptxtract:~/pptxtract/
scp nginx/conf.d/pptxtract.conf pptxtract:~/pptxtract/nginx/conf.d/
scp -r frontend pptxtract:~/pptxtract/

# 更新前端配置
echo "正在更新前端配置..."
cat > next.config.js << EOF
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['pptxtract.aslaninno.com', 'localhost', '127.0.0.1'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pptxtract.aslaninno.com',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ]
  }
}

module.exports = nextConfig
EOF

scp next.config.js pptxtract:~/pptxtract/frontend/

# 建立並啟動Docker容器
echo "正在建立並啟動Docker容器..."
ssh pptxtract "cd ~/pptxtract && docker-compose down && docker-compose build && docker-compose up -d"

# 檢查服務狀態
echo "正在檢查服務狀態..."
ssh pptxtract "cd ~/pptxtract && docker-compose ps"

echo ""
echo "===================================================="
echo "  部署完成!"
echo "  請訪問 https://pptxtract.aslaninno.com 檢查應用"
echo "====================================================" 