#!/bin/bash

# 顯示歡迎信息
echo "========================================"
echo "  PPT內容及圖片提取工具 (社區版 v1.0)  "
echo "  PPT Content and Image Extraction Tool "
echo "========================================"
echo ""

# 檢查Python是否安裝
if ! command -v python3 &> /dev/null; then
    echo "錯誤: 找不到Python3。請安裝Python 3.7或更高版本。"
    echo "Error: Python3 not found. Please install Python 3.7 or higher."
    exit 1
fi

# 檢查Node.js是否安裝
if ! command -v node &> /dev/null; then
    echo "錯誤: 找不到Node.js。請安裝Node.js 18或更高版本。"
    echo "Error: Node.js not found. Please install Node.js 18 or higher."
    exit 1
fi

# 確保所需目錄存在
mkdir -p uploads outputs

# 啟動Python後端
echo "正在啟動Python後端..."
echo "Starting Python backend..."
pip install -r requirements.txt
python3 app.py &
BACKEND_PID=$!
echo "後端已啟動，PID: $BACKEND_PID"
echo "Backend started, PID: $BACKEND_PID"
echo ""

# 等待後端啟動
sleep 3

# 啟動前端
echo "正在啟動Next.js前端..."
echo "Starting Next.js frontend..."
cd frontend
npm install
npm run dev &
FRONTEND_PID=$!
echo "前端已啟動，PID: $FRONTEND_PID"
echo "Frontend started, PID: $FRONTEND_PID"
echo ""

# 等待前端啟動
sleep 3

echo "========================================"
echo "應用已成功啟動！"
echo "請在瀏覽器訪問: http://localhost:3000"
echo ""
echo "Application started successfully!"
echo "Please visit in browser: http://localhost:3000"
echo "========================================"

# 等待用戶按Ctrl+C
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait 