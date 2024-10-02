'use client'

import React, { createContext, useState, useContext, useEffect } from 'react'
import axios from 'axios'

type TranslationContextType = {
    translate: (text: string) => Promise<string>
    language: string
    setLanguage: (lang: string) => void
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

export const useTranslation = () => {
    const context = useContext(TranslationContext)
    if (!context) {
        throw new Error('useTranslation must be used within a TranslationProvider')
    }
    return context
}

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState('en')

    const translate = async (text: string): Promise<string> => {
        if (language === 'en') return text

        try {
            const response = await axios.post('/api/translate', { text, targetLanguage: language })
            return response.data.translatedText
        } catch (error) {
            console.error('Translation error:', error)
            return text
        }
    }

    return (
        <TranslationContext.Provider value={{ translate, language, setLanguage }}>
            {children}
        </TranslationContext.Provider>
    )
}