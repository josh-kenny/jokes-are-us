'use client'

import { useTranslation } from '@/contexts/translation-context'
import { useEffect, useState } from 'react'

// TranslatedTitle component that takes an initial title as a prop
export function TranslatedTitle({ initialTitle }: { initialTitle: string }) {
    // Use the translation hook to get the translate function and current language
    const { translate, language } = useTranslation()
    // State to hold the translated title
    const [title, setTitle] = useState(initialTitle)

    // Effect to update the title when language changes or initial title changes
    useEffect(() => {
        const updateTitle = async () => {
            // Translate the initial title
            const translatedTitle = await translate(initialTitle)
            // Update the title state with the translated version
            setTitle(translatedTitle)
        }

        // Call the updateTitle function
        updateTitle()
    }, [language, initialTitle, translate]) // Dependencies for the effect

    // Render the translated title
    return (
        <div className="z-10 items-center justify-between font-mono text-sm lg:flex">
            <h1 className="flex w-full justify-center rounded-lg  border-gray-300  p-4 backdrop-blur-2xl  lg:w-auto lg:rounded-xl border">
                {title}
            </h1>
        </div>
    )
}