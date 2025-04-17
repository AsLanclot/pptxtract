# PPT提取工具前端

這是PPT提取工具的Next.js前端應用，提供美觀的用戶界面來上傳、處理和查看PPT內容提取結果。

## 功能特點

- 基於Next.js和TypeScript開發的現代前端應用
- 使用Tailwind CSS實現的響應式美觀設計
- Framer Motion動畫提供流暢的用戶體驗
- 支持拖放上傳PPTX文件
- 顯示提取的文字內容和圖片
- 分析並展示PPT中的主題色彩
- 提供UI/UX設計建議

## 安裝與運行

確保您的系統已安裝Node.js 18或更高版本。

1. 安裝依賴：

```bash
npm install
```

2. 運行開發服務器：

```bash
npm run dev
```

3. 訪問 [http://localhost:3000](http://localhost:3000) 查看應用

## 構建生產版本

```bash
npm run build
npm start
```

## 技術棧

- **Next.js** - React框架
- **TypeScript** - 類型安全
- **Tailwind CSS** - 原子化CSS框架
- **Framer Motion** - 動畫庫
- **Lucide Icons** - 圖標系統
- **React Dropzone** - 文件上傳
- **React Markdown** - Markdown渲染
- **Axios** - HTTP請求

## 後端連接

應用默認連接到 `http://localhost:5000` 的Flask後端服務。您可以在 `next.config.js` 中修改此設置。 