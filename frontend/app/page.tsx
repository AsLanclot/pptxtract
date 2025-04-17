'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, FileText, PaintBucket, Download, ArrowRight, Cpu, Layout, Palette, Globe } from 'lucide-react'
import Header from '@/components/Header'
import FileUpload from '@/components/FileUpload'
import ResultTabs from '@/components/ResultTabs'
import { useLanguage } from '@/context/LanguageContext'
import { uploadPpt, getDownloadUrl, cleanupFiles } from '@/services/api'

export default function Home() {
  const [isUploading, setIsUploading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('content')
  const { t, language } = useLanguage()

  const handleUpload = async (file: File) => {
    setIsUploading(true)
    
    try {
      const formData = new FormData()
      formData.append('file', file)
      
      const data = await uploadPpt(file)
      
      if (data.error) {
        throw new Error(data.error)
      }
      
      setResult(data)
    } catch (error) {
      alert(`${t('uploadError')}: ${error instanceof Error ? error.message : t('unknownError')}\n${t('fileSizeNote')}`)
    } finally {
      setIsUploading(false)
    }
  }
  
  const handleDownload = () => {
    if (result?.output_id) {
      window.location.href = getDownloadUrl(result.output_id)
    }
  }
  
  const handleReset = () => {
    if (result?.output_id) {
      cleanupFiles(result.output_id)
        .catch(error => console.error('清理文件失敗:', error));
    }
    setResult(null)
  }

  return (
    <main className="flex-1 flex flex-col min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        {!result ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="card max-w-3xl mx-auto"
          >
            <h2 className="text-center mb-6">{t('uploadTitle')}</h2>
            <p className="text-center text-gray-500 mb-4">{t('fileSizeNote')}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center mb-2">
                  <Layout className="text-brand-blue mr-2" size={20} />
                  <h3 className={`font-medium ${language === 'en' ? 'text-base' : 'text-lg'}`}>{t('aiWebGeneration').split('：')[0]}</h3>
                </div>
                <p className="text-sm text-gray-600">{t('aiWebGeneration').split('：')[1]}</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center mb-2">
                  <Palette className="text-brand-purple mr-2" size={20} />
                  <h3 className={`font-medium ${language === 'en' ? 'text-base' : 'text-lg'}`}>{t('aiDesignAssistant').split('：')[0]}</h3>
                </div>
                <p className="text-sm text-gray-600">{t('aiDesignAssistant').split('：')[1]}</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center mb-2">
                  <Cpu className="text-brand-blue mr-2" size={20} />
                  <h3 className={`font-medium ${language === 'en' ? 'text-base' : 'text-lg'}`}>{t('contentRepurposing').split('：')[0]}</h3>
                </div>
                <p className="text-sm text-gray-600">{t('contentRepurposing').split('：')[1]}</p>
              </div>
            </div>
            
            <FileUpload 
              onUpload={handleUpload} 
              isUploading={isUploading} 
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2>{t('extractionResults')}</h2>
              <div className="flex gap-3">
                <button 
                  onClick={handleDownload}
                  className="btn btn-primary btn-icon"
                >
                  <Download size={18} />
                  {t('downloadAll')}
                </button>
                <button 
                  onClick={handleReset}
                  className="btn btn-outline"
                >
                  {t('uploadNew')}
                </button>
              </div>
            </div>
            
            <ResultTabs 
              result={result}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </motion.div>
        )}
      </div>
      
      {/* Footer */}
      <footer className="mt-auto py-6 text-center">
        <div className="gradient-text font-semibold">{t('footerByDesign')}</div>
        <a href="https://me.aslaninno.com" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-brand-blue transition-colors">
          {t('footerReadMore')}
        </a>
      </footer>
      
      {/* 裝飾元素 */}
      <div className="fixed -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-brand-blue/10 to-brand-purple/10 rounded-full blur-3xl -z-10" />
      <div className="fixed -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-brand-purple/10 to-brand-blue/10 rounded-full blur-3xl -z-10" />
    </main>
  )
} 