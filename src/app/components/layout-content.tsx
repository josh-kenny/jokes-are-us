'use client'

import { useTranslation } from '@/contexts/translation-context'
import { LanguageSelector } from '@/app/components/language-selector'
import { useEffect, useState } from 'react'

export function LayoutContent({ children }: { children: React.ReactNode }) {
    const { translate, language } = useTranslation()
    const [pageTitle, setPageTitle] = useState('Dad Joke Generator')

    useEffect(() => {
        const updatePageTitle = async () => {
            const translatedTitle = await translate('Dad Joke Generator')
            setPageTitle(translatedTitle)
            document.title = translatedTitle
        }

        updatePageTitle()
    }, [language, translate])

    return (
        <>
            <div className="fixed top-4 right-4 z-50">
                <LanguageSelector />
            </div>
            {children}
        </>
    )
}