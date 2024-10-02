'use client'

import { useTranslation } from '@/contexts/translation-context'
import { LanguageSelector } from '@/app/components/language-selector'
import { useEffect, useState } from 'react'

// LayoutContent component that wraps the main content of the application
export function LayoutContent({ children }: { children: React.ReactNode }) {
    // Use the translation hook to get the translate function and current language
    const { translate, language } = useTranslation()
    // State to hold the translated page title
    const [pageTitle, setPageTitle] = useState('Dad Joke Generator')

    // Effect to update the page title when language changes
    useEffect(() => {
        const updatePageTitle = async () => {
            // Translate the page title
            const translatedTitle = await translate('Dad Joke Generator')
            // Update the state with the translated title
            setPageTitle(translatedTitle)
            // Update the document title (shown in browser tab)
            document.title = translatedTitle
        }

        // Call the updatePageTitle function
        updatePageTitle()
    }, [language, translate]) // Dependencies for the effect

    return (
        <>
            {/* Language selector positioned in the top-right corner */}
            <div className="fixed top-4 right-4 z-50">
                <LanguageSelector />
            </div>
            {/* Render the child components */}
            {children}
        </>
    )
}