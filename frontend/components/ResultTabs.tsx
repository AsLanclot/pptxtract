'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, PaintBucket } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

interface ResultTabsProps {
  result: any
  activeTab: string
  onTabChange: (tab: string) => void
}

export default function ResultTabs({ result, activeTab, onTabChange }: ResultTabsProps) {
  const { t, language } = useLanguage()
  
  const tabs = [
    { id: 'content', label: t('extractedContent'), icon: <FileText size={18} /> },
    { id: 'colors', label: t('themeColors'), icon: <PaintBucket size={18} /> }
  ]
  
  const renderContent = () => {
    if (activeTab === 'content') {
      return (
        <div>
          {result.html_content ? (
            <div 
              className="prose prose-blue max-w-none" 
              dangerouslySetInnerHTML={{ __html: result.html_content }}
            />
          ) : (
            <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-md">
              <p className="text-yellow-700">
                {language === 'zh' ? '無法渲染Markdown內容，請下載原始文件查看詳細信息。' : 
                'Cannot render Markdown content, please download the original file for details.'}
              </p>
              <pre className="mt-4 p-2 bg-gray-50 rounded text-xs overflow-auto max-h-60">
                {result.content_md}
              </pre>
            </div>
          )}
        </div>
      )
    }
    
    if (activeTab === 'colors') {
      return (
        <div>
          <h3 className={`mb-6 ${language === 'en' ? 'text-xl' : 'text-2xl'}`}>{t('mainColors')}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
            {result.dominant_colors?.map((color: any, index: number) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div 
                  className="w-full h-24 rounded-lg mb-2" 
                  style={{ backgroundColor: color.hex }}
                />
                <div className="text-center">
                  <p className="font-mono text-sm">{color.hex}</p>
                  <p className="font-mono text-xs text-gray-500">({color.count})</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* 顯示配色建議內容 */}
          {result.color_theme_md && (
            <div className="mb-8 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="prose prose-blue max-w-none">
                <h4 className={`mb-4 ${language === 'en' ? 'text-lg' : 'text-xl'}`}>{t('themeRecommendations')}</h4>
                <pre className="p-3 bg-gray-50 rounded text-sm overflow-auto">
                  {result.color_theme_md}
                </pre>
              </div>
            </div>
          )}
          
          <h3 className={`mt-10 mb-6 ${language === 'en' ? 'text-xl' : 'text-2xl'}`}>{t('aiUsage')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <FileText size={20} className="text-brand-blue" />
                </div>
                <h4 className={`font-medium ${language === 'en' ? 'text-base' : 'text-lg'}`}>{t('aiWebGeneration').split('：')[0]}</h4>
              </div>
              <p className="text-gray-600">{t('aiWebGeneration').split('：')[1]}</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                  <PaintBucket size={20} className="text-brand-purple" />
                </div>
                <h4 className={`font-medium ${language === 'en' ? 'text-base' : 'text-lg'}`}>{t('aiDesignAssistant').split('：')[0]}</h4>
              </div>
              <p className="text-gray-600">{t('aiDesignAssistant').split('：')[1]}</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <FileText size={20} className="text-brand-blue" />
                </div>
                <h4 className={`font-medium ${language === 'en' ? 'text-base' : 'text-lg'}`}>{t('contentRepurposing').split('：')[0]}</h4>
              </div>
              <p className="text-gray-600">{t('contentRepurposing').split('：')[1]}</p>
            </div>
          </div>
        </div>
      )
    }
    
    return null
  }
  
  return (
    <div className="card">
      <div className="flex border-b mb-6">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 font-medium ${
              activeTab === tab.id 
                ? 'text-brand-blue border-b-2 border-brand-blue' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="p-2"
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  )
} 