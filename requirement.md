# PPT提取工具需求文檔

## 功能需求

1. 上傳PPTX文件並提取所有文字內容
2. 提取所有圖片並在Markdown中正確引用
3. 分析PPT中的主題色彩
4. 提供基於主題色彩的UI/UX設計建議
5. 將所有提取的內容打包為ZIP文件供下載

## UI/UX需求

### 核心框架與設計系統

- **Next.js** - React框架，提供頁面路由和渲染
- **Tailwind CSS** - 原子化CSS框架，用於所有樣式設計
- **Framer Motion** - 動畫庫，用於所有過渡和互動效果
- **Lucide Icons** - 現代線條圖標系統

### 色彩系統

- **漸變色彩** - 科技藍(`#0072c5`)到紫色(`#9333ea`)的漸變作為主色調
- **白色底色** - 純白(`#FFFFFF`)作為背景，提高可讀性
- **透明度變化** - 使用rgba和opacity創造層次感
- **陰影系統** - 多層次陰影效果(shadow-lg, shadow-md)增強深度感

### UI組件需求

#### 卡片組件
- 圓角卡片(rounded-xl)
- 漸變邊框卡片(bg-gradient-to-r from-blue-600 to-purple-600 p-0.5)
- 陰影卡片(shadow-lg, shadow-xl)
- 玻璃態卡片(backdrop-blur效果)

#### 按鈕系統
- 漸變填充按鈕(bg-gradient-to-r from-blue-600 to-purple-600)
- 輪廓按鈕(border border-gray-200)
- 圓形浮動按鈕(fixed bottom-6 right-6)
- 帶圖標按鈕(flex items-center gap-2)

#### 排版元素
- 漸變文字(text-transparent bg-clip-text bg-gradient-to-r)
- 標題系統(text-4xl md:text-6xl font-bold)
- 內容文字(text-lg text-gray-700 leading-relaxed)
- 標籤(inline-block bg-gradient-to-r text-lg font-semibold px-4 py-1 rounded-full)

#### 導航元素
- 頂部進度條(fixed top-0 left-0 h-1)
- 折疊面板(onClick toggle)
- 浮動返回頂部按鈕

#### 數據展示
- 表格系統(w-full text-left)
- 數字標記(w-6 h-6 bg-blue-100 rounded-full)
- 圖標卡片(w-12 h-12 bg-blue-100 rounded-full)
- 列表項(flex items-start gap-3)

### 視覺效果需求

#### 模糊效果
- 背景模糊(blur-3xl, blur-2xl)
- 漸變疊加(bg-gradient-to-br from-blue-600/10 to-purple-600/10)

#### 動畫效果
- 淡入效果(initial={ opacity: 0 } animate={ opacity: 1 })
- 縮放效果(whileHover={ scale: 1.05 })
- 滑入效果(initial={ opacity: 0, y: 20 })
- 視差滾動效果

#### 互動反饋
- 懸停效果(hover:shadow-lg transition-shadow)
- 點擊效果(whileTap={ scale: 0.95 })
- 展開/折疊轉場(animate={ opacity: 1, height: "auto" })

### 響應式設計
- **斷點系統** - 使用Tailwind的md:、lg:前綴實現響應式布局
- **網格系統** - grid grid-cols-1 md:grid-cols-2/3
- **彈性盒布局** - flex flex-col md:flex-row
- **間距調整** - 在不同屏幕尺寸下調整padding和margin

### 特殊效果
- **玻璃態效果** - 半透明背景配合模糊
- **浮動元素** - 絕對定位的裝飾性圓形(absolute -top-40 -right-40)
- **漸變疊加** - 多層漸變創造深度
- **微妙動畫** - 緩慢的脈動和呼吸效果 

## 部署需求

### Docker部署規劃

- **容器化應用** - 前端與後端分別使用獨立容器
- **Docker Compose** - 使用docker-compose.yml進行服務編排
- **網絡配置** - 前端端口(12300)和後端端口(12305)映射
- **持久化存儲** - 使用Docker volumes保存上傳文件與提取內容
- **環境變量** - 使用.env文件管理配置參數
- **日誌管理** - 實現集中式日誌收集與監控

### 伺服器需求

- **域名** - 已註冊域名pptxtract.aslaninno.com用於服務訪問
- **SSL證書** - 使用Let's Encrypt實現HTTPS安全連接
- **防火牆** - 只開放必要端口(80, 443, 22)，關閉其他端口
- **資源配置** - 至少2GB RAM, 2vCPU, 20GB SSD
- **SSH訪問** - 使用SSH金鑰認證，禁用密碼登入
- **備份策略** - 定期備份用戶數據和應用配置

### CI/CD流程

- **自動化部署** - 設置GitHub Actions實現自動構建和部署
- **部署環境** - 建立開發、測試和生產三個獨立環境
- **回滾機制** - 實現快速版本回滾功能
- **健康檢查** - 監控應用運行狀態與資源使用情況 

### 程式碼儲存庫管理

- **GitHub倉庫** - 代碼位於 https://github.com/AsLanclot/pptxtract.git
- **版本控制** - 使用Git進行版本管理，主分支為main
- **貢獻流程** - 通過Pull Request模式進行代碼貢獻和審核
- **議題追蹤** - 使用GitHub Issues進行問題追蹤和功能請求
- **版本發布** - 使用GitHub Releases管理軟件版本
- **文檔管理** - 確保README.md包含完整的安裝和使用說明
- **授權說明** - 使用MIT開源授權許可 