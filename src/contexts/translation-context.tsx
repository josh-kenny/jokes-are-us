'use client'

import React, { createContext, useContext, useState } from 'react'

interface TranslationContextType {
    language: string
    setLanguage: (lang: string) => void
    translate: (text: string) => Promise<string>
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

// Helper function to decode HTML entities
function decodeHTMLEntities(text: string) {
    const textArea = document.createElement('textarea')
    textArea.innerHTML = text
    return textArea.value
}

export function TranslationProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState('en')

    const translate = async (text: string) => {
        try {
            const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${process.env.NEXT_PUBLIC_GOOGLE_TRANSLATE_API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    q: text,
                    target: language,
                }),
            })
            if (!response.ok) {
                throw new Error('Translation failed')
            }
            const data = await response.json()
            // Decode HTML entities before returning the translated text
            return decodeHTMLEntities(data.data.translations[0].translatedText)
        } catch (error) {
            console.error('Translation error:', error)
            return text // Return original text if translation fails
        }
    }

    return (
        <TranslationContext.Provider value={{ language, setLanguage, translate }}>
            {children}
        </TranslationContext.Provider>
    )
}

export function useTranslation() {
    const context = useContext(TranslationContext)
    if (context === undefined) {
        throw new Error('useTranslation must be used within a TranslationProvider')
    }
    return context
}