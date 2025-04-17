'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import { FileText, PaintBucket, Cpu } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

interface ColorInfo {
  hex: string
  count: number
}

interface ResultData {
  content_md: string
  color_theme_md: string
  dominant_colors: ColorInfo[]
}

interface ResultTabsProps {
  result: ResultData
  activeTab: string
  onTabChange: (tab: string) => void
}

export default function ResultTabs({ result, activeTab, onTabChange }: ResultTabsProps) {
  const { t } = useLanguage()
  
  if (!result) return null
  
  return (
    <div className="card">
      <div className="flex border-b mb-6">
        <button
          onClick={() => onTabChange('content')}
          className={`px-4 py-3 flex items-center gap-2 font-medium ${
            activeTab === 'content' 
              ? 'text-brand-blue border-b-2 border-brand-blue' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <FileText size={18} />
          {t('extractedContent')}
        </button>
        <button
          onClick={() => onTabChange('color')}
          className={`px-4 py-3 flex items-center gap-2 font-medium ${
            activeTab === 'color' 
              ? 'text-brand-blue border-b-2 border-brand-blue' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <PaintBucket size={18} />
          {t('themeColors')}
        </button>
      </div>
      
      <AnimatePresence mode="wait">
        {activeTab === 'content' ? (
          <motion.div
            key="content"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
              <h3 className="flex items-center gap-2 text-brand-blue font-medium mb-2">
                <Cpu size={18} />
                {t('aiUsage')}
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• {t('aiWebGeneration')}</li>
                <li>• {t('aiDesignAssistant')}</li>
                <li>• {t('contentRepurposing')}</li>
              </ul>
            </div>
            
            <div className="markdown-preview max-h-[50vh] overflow-y-auto p-4 bg-gray-50 rounded-lg">
              <ReactMarkdown>{result.content_md}</ReactMarkdown>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="color"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="mb-4">{t('mainColors')}</h3>
                <div className="space-y-4">
                  {result.dominant_colors.map((color, index) => (
                    <div key={index} className="card-gradient p-0.5">
                      <div 
                        className="bg-white rounded-[calc(0.75rem-1px)] p-4 flex items-center" 
                        style={{ backgroundColor: color.hex }}
                      >
                        <div className="bg-white/90 px-3 py-2 rounded-lg backdrop-blur-sm">
                          <span className="font-mono">{color.hex}</span>
                          <span className="ml-2 text-sm text-gray-500">{t('useFrequency')}: {color.count}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="markdown-preview p-4 bg-gray-50 rounded-lg">
                <ReactMarkdown>{result.color_theme_md}</ReactMarkdown>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 