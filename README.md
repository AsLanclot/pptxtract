# PPT 內容及圖片提取工具 (Community Edition v1.1)
# PPT Content and Image Extraction Tool (Community Edition v1.1)

![Version](https://img.shields.io/badge/version-1.1-blue)
![License](https://img.shields.io/badge/license-MIT-green)

[English](#english) | [繁體中文](#繁體中文)

<a name="繁體中文"></a>
## 繁體中文

這是一個網頁應用，可以將 PowerPoint (PPTX) 文件中的文字和圖片提取出來，並轉換為 Markdown 格式。同時，它還會分析 PPT 中的主題色彩，提供 UI/UX 設計建議，並支持AI網頁生成、AI輔助設計和內容再利用等應用場景。

### 功能特點

- 上傳 PPTX 文件並提取所有文字內容
- 提取所有圖片並在 Markdown 中正確引用
- 分析 PPT 中的主題色彩
- 提供基於主題色彩的 UI/UX 設計建議
- 將所有提取的內容打包為 ZIP 文件供下載
- 美觀的網頁界面，支持拖放上傳
- 支持中英文雙語切換
- 適用於AI網頁生成、AI輔助設計和內容再利用等場景

### 安裝與運行

#### 前提條件

- Python 3.7 或更高版本
- pip 包管理器
- Node.js 18 或更高版本 (新版UI)

#### 快速啟動（推薦）

使用提供的啟動腳本快速啟動應用：

```bash
# 克隆代碼庫
git clone https://github.com/AsLanclot/pptxtract.git
cd pptxtract

# 運行啟動腳本
./start.sh
```

腳本會自動安裝所需依賴，並同時啟動後端和前端服務。

#### 手動安裝步驟

1. 克隆或下載此代碼庫

```bash
git clone https://github.com/AsLanclot/pptxtract.git
cd pptxtract
```

2. 安裝所需依賴：

```bash
pip install -r requirements.txt
```

3. 運行應用：

```bash
python app.py
```

4. 在瀏覽器中訪問：`http://localhost:8080`

#### 新版UI安裝 (Next.js版本)

1. 進入前端目錄：

```bash
cd frontend
```

2. 安裝依賴：

```bash
npm install
```

3. 運行開發服務器：

```bash
npm run dev
```

4. 在瀏覽器中訪問：`http://localhost:3000`

### 使用方法

1. 在網頁界面上傳 PPTX 文件（支持拖放或點擊選擇）
2. 等待處理完成
3. 在「提取內容」標籤查看提取的文字和圖片
4. 在「主題色分析」標籤查看顏色分析和 UI/UX 建議
5. 點擊「下載所有內容」按鈕獲取完整的 ZIP 文件
6. 點擊右上角的語言切換按鈕可在中文和英文之間切換

### 注意事項

- 支持的檔案格式：僅限 .pptx 格式
- 檔案大小限制：最大 30MB
- 支持語言：中文（繁體）和英文

---

<a name="english"></a>
## English

This is a web application that extracts text and images from PowerPoint (PPTX) files and converts them to Markdown format. It also analyzes theme colors from the PPT, provides UI/UX design suggestions, and supports AI web generation, AI-assisted design, and content repurposing scenarios.

### Features

- Upload PPTX files and extract all text content
- Extract all images and reference them correctly in Markdown
- Analyze theme colors from the PPT
- Provide UI/UX design suggestions based on theme colors
- Package all extracted content as a ZIP file for download
- Beautiful web interface with drag-and-drop upload support
- Supports bilingual switching between Chinese and English
- Suitable for AI web generation, AI-assisted design, and content repurposing

### Installation and Running

#### Prerequisites

- Python 3.7 or higher
- pip package manager
- Node.js 18 or higher (for new UI)

#### Quick Start (Recommended)

Use the provided start script to quickly start the application:

```bash
# Clone the repository
git clone https://github.com/AsLanclot/pptxtract.git
cd pptxtract

# Run the start script
./start.sh
```

The script will automatically install the required dependencies and start both the backend and frontend services.

#### Manual Installation Steps

1. Clone or download this repository

```bash
git clone https://github.com/AsLanclot/pptxtract.git
cd pptxtract
```

2. Install required dependencies:

```bash
pip install -r requirements.txt
```

3. Run the application:

```bash
python app.py
```

4. Access in browser: `http://localhost:8080`

#### New UI Installation (Next.js version)

1. Enter the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Access in browser: `http://localhost:3000`

### How to Use

1. Upload a PPTX file on the web interface (supports drag-and-drop or click to select)
2. Wait for processing to complete
3. View extracted text and images in the "Extracted Content" tab
4. View color analysis and UI/UX suggestions in the "Theme Color Analysis" tab
5. Click the "Download All" button to get the complete ZIP file
6. Click the language toggle button in the top right corner to switch between Chinese and English

### Notes

- Supported file format: .pptx format only
- File size limit: Maximum 30MB
- Supported languages: Chinese (Traditional) and English

---

## 技術棧 | Technology Stack

### 後端 | Backend
- Flask (Python)
- python-pptx, Pillow

### 前端 | Frontend
- Next.js - React框架 | React framework
- Tailwind CSS - 原子化CSS框架 | Atomic CSS framework
- Framer Motion - 動畫庫 | Animation library
- Lucide Icons - 現代線條圖標 | Modern line icons

## 貢獻 | Contributing

歡迎提交問題報告和功能請求。如果您想貢獻代碼，請先開啟一個問題討論您想要更改的內容。

We welcome issue reports and feature requests. If you want to contribute code, please open an issue first to discuss what you would like to change.

## 授權 | License

MIT License - 詳見 [LICENSE](LICENSE) 文件
MIT License - See the [LICENSE](LICENSE) file for details.

## 文件結構

- `app.py` - Flask 應用主程序
- `extract_ppt.py` - PPT提取核心邏輯
- `start.sh` - 一鍵啟動腳本
- `templates/index.html` - 舊版網頁前端界面
- `requirements.txt` - 依賴庫列表
- `uploads/` - 臨時存放上傳文件的目錄
- `outputs/` - 存放處理結果的目錄
- `frontend/` - Next.js 前端應用 (新版UI)
  - `context/LanguageContext.tsx` - 語言上下文提供者和翻譯系統
  - `components/` - UI組件，包括Header、FileUpload和ResultTabs等
  - `app/` - Next.js頁面和布局
- `progress.md` - 開發進度記錄
- `requirement.md` - 需求文檔

## UI 設計系統

### 色彩系統
- 科技藍(`#0072c5`)到紫色(`#9333ea`)的漸變作為主色調
- 純白(`#FFFFFF`)作為背景，提高可讀性
- 使用透明度變化創造層次感
- 多層次陰影效果增強深度感

### 主要組件
- 卡片組件：圓角、漸變邊框、陰影與玻璃態卡片
- 按鈕系統：漸變填充、輪廓、浮動與帶圖標按鈕
- 排版元素：漸變文字、標題系統、內容文字與標籤
- 導航元素：頂部進度條、折疊面板、浮動返回頂部按鈕
- 數據展示：表格系統、數字標記、圖標卡片與列表項

完整的UI組件和設計規範見 `requirement.md`。

## 原理

應用使用 python-pptx 庫解析 PPTX 文件，提取文字和圖片。使用 Pillow 庫分析圖片的主要顏色，並生成顏色建議。前端使用 Marked.js 將 Markdown 轉換為 HTML 進行預覽。新版UI採用 Next.js 和 Tailwind CSS 構建，提供更現代的用戶體驗和設計。

## 注意事項

- 支持的檔案格式：僅限 .pptx 格式
- 檔案大小限制：最大 30MB
- 支持語言：中文（繁體）和英文

---

© 2025 PPT Content and Image Extraction Tool. Community Edition v1.1