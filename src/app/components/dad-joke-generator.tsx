'use client'

import { useState, useEffect } from 'react'
import { useTranslation } from '@/contexts/translation-context'
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"

export default function DadJokeGenerator() {
    const [joke, setJoke] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const { translate, language } = useTranslation()

    const [uiTexts, setUiTexts] = useState({
        cardTitle: 'Dad Joke Generator',
        buttonTextNew: 'Get New Joke',
        buttonTextLoading: 'Loading...',
        loadingText: 'Loading joke...',
        errorText: 'Failed to fetch joke. Please try again.'
    })

    const fetchJoke = async () => {
        setIsLoading(true)
        setError(null)
        try {
            const response = await fetch('https://icanhazdadjoke.com/', {
                headers: {
                    'Accept': 'application/json'
                }
            })
            if (!response.ok) {
                throw new Error('Failed to fetch joke')
            }
            const data = await response.json()
            const translatedJoke = await translate(data.joke)
            setJoke(translatedJoke)
        } catch (err) {
            setError(uiTexts.errorText)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchJoke()
    }, [])

    useEffect(() => {
        const translateUiTexts = async () => {
            const translatedTexts = await Promise.all(
                Object.entries(uiTexts).map(async ([key, value]) => [key, await translate(value)])
            )
            setUiTexts(Object.fromEntries(translatedTexts))
        }

        translateUiTexts()
        fetchJoke()
    }, [language])

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">{uiTexts.cardTitle}</CardTitle>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <p className="text-center mb-4">{uiTexts.loadingText}</p>
                ) : error ? (
                    <p className="text-center mb-4 text-red-500">{error}</p>
                ) : (
                    <p className="text-center mb-4">{joke}</p>
                )}
                <Button
                    onClick={fetchJoke}
                    className="w-full"
                    disabled={isLoading}
                    variant="destructive"
                >
                    {isLoading ? uiTexts.buttonTextLoading : uiTexts.buttonTextNew}
                </Button>
            </CardContent>
        </Card>
    )
}