'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import { Upload, FileText, X, Loader, AlertCircle } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

interface FileUploadProps {
  onUpload: (file: File) => void
  isUploading: boolean
}

export default function FileUpload({ onUpload, isUploading }: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [sizeError, setSizeError] = useState(false)
  const { t, language } = useLanguage()
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      if (file.name.endsWith('.pptx')) {
        // 檢查文件大小是否超過30MB
        if (file.size > 30 * 1024 * 1024) {
          setSizeError(true)
          return
        }
        
        setSizeError(false)
        setSelectedFile(file)
      } else {
        alert('請選擇 .pptx 格式的文件')
      }
    }
  }, [])
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx']
    },
    maxFiles: 1
  })
  
  const handleSubmit = () => {
    if (selectedFile) {
      onUpload(selectedFile)
    }
  }
  
  const removeFile = () => {
    setSelectedFile(null)
    setSizeError(false)
  }

  return (
    <div>
      {sizeError && (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-4 mb-4 flex items-start">
          <AlertCircle className="mr-2 mt-0.5 flex-shrink-0" size={18} />
          <div>
            <p className="font-medium">{t('fileTooBig')}</p>
            <p className="text-sm">{t('fileSizeExceeded')}</p>
          </div>
        </div>
      )}
    
      {!selectedFile ? (
        <motion.div 
          {...getRootProps()} 
          className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${
            isDragActive 
              ? 'border-brand-blue bg-blue-50' 
              : 'border-gray-200 hover:border-brand-blue hover:bg-blue-50'
          }`}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Upload size={24} className="text-brand-blue" />
            </div>
            <h3 className={`font-bold mb-2 ${language === 'en' ? 'text-lg' : 'text-xl'}`}>{t('dragDropText')}</h3>
            <p className="text-gray-500 mb-4">{t('fileFormatSupport')}</p>
            <button 
              type="button" 
              className="btn btn-primary flex items-center gap-2"
            >
              <Upload size={16} />
              {t('chooseFile')}
            </button>
          </div>
        </motion.div>
      ) : (
        <div className="space-y-6">
          <div className="card-gradient">
            <div className="bg-white rounded-[calc(0.75rem-1px)] p-4 flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FileText size={24} className="text-brand-blue" />
              </div>
              <div className="ml-4 flex-1">
                <p className="font-medium">{selectedFile.name}</p>
                <p className="text-sm text-gray-500">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <button 
                onClick={removeFile}
                className="p-2 hover:bg-gray-100 rounded-lg"
                disabled={isUploading}
                title="移除文件"
                aria-label="移除文件"
              >
                <X size={18} />
              </button>
            </div>
          </div>
          
          <motion.button
            onClick={handleSubmit}
            className="btn btn-primary w-full flex justify-center items-center h-12"
            disabled={isUploading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isUploading ? (
              <>
                <Loader size={18} className="animate-spin mr-2" />
                {t('processing')}
              </>
            ) : (
              <>
                <FileText size={18} className="mr-2" />
                {t('processFile')}
              </>
            )}
          </motion.button>
        </div>
      )}
    </div>
  )
} 