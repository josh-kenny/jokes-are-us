'use client'

import { useTranslation } from '@/contexts/translation-context'
import { useEffect, useState } from 'react'

export function TranslatedTitle({ initialTitle }: { initialTitle: string }) {
    const { translate, language } = useTranslation()
    const [title, setTitle] = useState(initialTitle)

    useEffect(() => {
        const updateTitle = async () => {
            const translatedTitle = await translate(initialTitle)
            setTitle(translatedTitle)
        }

        updateTitle()
    }, [language, initialTitle, translate])

    return (
        <div className="z-10 items-center justify-between font-mono text-sm lg:flex">
            <h1 className="flex w-full justify-center rounded-lg  border-gray-300  p-4 backdrop-blur-2xl  lg:w-auto lg:rounded-xl border">
                {title}
            </h1>
        </div>
    )
}