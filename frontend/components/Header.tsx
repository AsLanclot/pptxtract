'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FileSliders, Globe } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export default function Header() {
  const { language, toggleLanguage, t } = useLanguage()
  
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-brand-blue to-brand-purple text-white py-16 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <FileSliders size={32} />
            </div>
            <div>
              <h1 className="text-4xl md:text-6xl font-bold">{t('appTitle')}</h1>
              <p className="text-lg md:text-xl mt-2 text-white/80">
                {t('appDescription')}
              </p>
            </div>
          </div>
          
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 transition-colors"
          >
            <Globe size={20} />
            <span>{language === 'zh' ? 'English' : '中文'}</span>
          </button>
        </div>
      </div>
      
      {/* 背景裝飾 */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-2xl" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-2xl" />
    </motion.header>
  )
} 