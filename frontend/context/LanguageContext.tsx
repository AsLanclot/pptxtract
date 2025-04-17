'use client'

import React, { createContext, useState, useContext, ReactNode } from 'react'

type Language = 'zh' | 'en'

interface Translations {
  [key: string]: {
    zh: string
    en: string
  }
}

// 翻譯詞彙表
const translations: Translations = {
  appTitle: {
    zh: 'PPT 內容及圖片提取工具',
    en: 'PPT Content and Image Extraction Tool'
  },
  appDescription: {
    zh: '上傳 PPTX 文件，提取文字與圖片資源，用於AI網頁生成、AI輔助設計和視覺創作',
    en: 'Extract text and images from PPTX files for AI web generation, AI-assisted design and visual creation'
  },
  uploadTitle: {
    zh: '上傳 PPTX 文件',
    en: 'Upload PPTX File'
  },
  fileSizeLimit: {
    zh: '請注意：文件大小必須小於30MB',
    en: 'Note: File size must be less than 30MB'
  },
  fileSizeNote: {
    zh: '請注意：文件大小必須小於30MB',
    en: 'Note: File size must be less than 30MB'
  },
  dragDropText: {
    zh: '拖放文件到這裡或點擊選擇',
    en: 'Drag & drop file here or click to select'
  },
  fileFormatSupport: {
    zh: '支持 .pptx 格式，檔案大小 < 30MB',
    en: 'Supports .pptx format, file size < 30MB'
  },
  chooseFile: {
    zh: '選擇文件',
    en: 'Choose File'
  },
  processing: {
    zh: '處理中...',
    en: 'Processing...'
  },
  processFile: {
    zh: '處理文件',
    en: 'Process File'
  },
  fileTooBig: {
    zh: '文件過大',
    en: 'File Too Large'
  },
  fileSizeExceeded: {
    zh: '上傳的文件超過30MB限制，請選擇較小的文件。',
    en: 'The uploaded file exceeds the 30MB limit. Please choose a smaller file.'
  },
  uploadError: {
    zh: '上傳失敗',
    en: 'Upload Failed'
  },
  unknownError: {
    zh: '未知錯誤',
    en: 'Unknown Error'
  },
  uploadErrorMsg: {
    zh: '上傳失敗: {error}\n注意：文件大小必須小於30MB。',
    en: 'Upload failed: {error}\nNote: File size must be less than 30MB.'
  },
  extractionResults: {
    zh: '提取結果',
    en: 'Extraction Results'
  },
  results: {
    zh: '提取結果',
    en: 'Extraction Results'
  },
  downloadAll: {
    zh: '下載所有內容',
    en: 'Download All'
  },
  uploadNew: {
    zh: '上傳新文件',
    en: 'Upload New File'
  },
  extractedContent: {
    zh: '提取內容',
    en: 'Extracted Content'
  },
  themeColors: {
    zh: '主題色分析',
    en: 'Theme Color Analysis'
  },
  mainColors: {
    zh: '主要顏色',
    en: 'Main Colors'
  },
  useFrequency: {
    zh: '使用頻率',
    en: 'Usage Frequency'
  },
  aiUsage: {
    zh: '適用於AI應用',
    en: 'Suitable for AI Applications'
  },
  aiWebGeneration: {
    zh: 'AI網頁生成：利用提取的內容快速建立網站和應用',
    en: 'AI Web Generation: Quickly create websites and applications with extracted content'
  },
  aiDesignAssistant: {
    zh: 'AI輔助設計：將提取的圖片及配色用於生成新的設計素材',
    en: 'AI-assisted Design: Use extracted images and color schemes to generate new design assets'
  },
  contentRepurposing: {
    zh: '內容再利用：將演示文稿轉換為其他格式，用於不同平台',
    en: 'Content Repurposing: Convert presentations into other formats for different platforms'
  },
  footerByDesign: {
    zh: '由 Aslan.Design 製作',
    en: 'by Aslan.Design'
  },
  footerReadMore: {
    zh: '了解更多：www.me.aslaninno.com',
    en: 'read more: www.me.aslaninno.com'
  },
  footerWebsite: {
    zh: '網址',
    en: 'Website'
  }
}

interface LanguageContextType {
  language: Language
  toggleLanguage: () => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('zh')

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'zh' ? 'en' : 'zh')
  }

  const t = (key: string) => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`)
      return key
    }
    return translations[key][language]
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
} 