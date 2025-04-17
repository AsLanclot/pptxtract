#!/bin/bash

# 顯示腳本信息
echo "===================================================="
echo "  PPT提取工具 - SSH密鑰設置腳本"
echo "===================================================="
echo ""

# 定義伺服器信息
SERVER_IP="108.181.199.105"
SERVER_PORT="22"
SERVER_USER="administrator"
SERVER_PASSWORD="Jack0429!"

# 確認SSH目錄存在
mkdir -p ~/.ssh

# 檢查是否已存在SSH密鑰
if [ ! -f ~/.ssh/id_rsa.pptxtract ]; then
  echo "正在生成SSH密鑰對..."
  ssh-keygen -t rsa -b 4096 -f ~/.ssh/id_rsa.pptxtract -N "" -C "pptxtract@aslaninno.com"
  echo "SSH密鑰對已生成"
else
  echo "SSH密鑰對已存在，使用現有密鑰"
fi

# 使用sshpass安裝公鑰到服務器
if ! command -v sshpass &> /dev/null; then
  echo "需要安裝sshpass工具..."
  if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    brew install sshpass
  elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    sudo apt-get update && sudo apt-get install -y sshpass
  else
    echo "無法確定操作系統類型，請手動安裝sshpass"
    exit 1
  fi
fi

echo "正在將SSH公鑰上傳至伺服器..."
sshpass -p "$SERVER_PASSWORD" ssh-copy-id -i ~/.ssh/id_rsa.pptxtract -p $SERVER_PORT -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP

# 配置SSH配置文件
echo "正在設置SSH配置..."
cat > ~/.ssh/config << EOF
Host pptxtract
  HostName $SERVER_IP
  User $SERVER_USER
  Port $SERVER_PORT
  IdentityFile ~/.ssh/id_rsa.pptxtract
  StrictHostKeyChecking no
EOF

chmod 600 ~/.ssh/config

echo ""
echo "===================================================="
echo "  SSH設置完成!"
echo "  現在您可以使用以下命令直接連接到伺服器:"
echo "  ssh pptxtract"
echo "====================================================" 