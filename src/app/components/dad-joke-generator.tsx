'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { useTranslation } from '@/contexts/translation-context'

export default function DadJokeGenerator() {
    const [joke, setJoke] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [uiTexts, setUiTexts] = useState({
        cardTitle: 'Dad Joke Generator',
        buttonText: 'Get New Joke',
        loading: 'Loading joke...',
        error: 'Failed to fetch joke. Please try again.',
    })
    const { translate, language } = useTranslation()

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
            setError(uiTexts.error)
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
        <div className="flex items-center w-100 justify-center bg-foreground text-background rounded-md">
            <Card className="md:min-w-3/5">

                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">{uiTexts.cardTitle}</CardTitle>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <p className="text-center mb-4">{uiTexts.loading}</p>
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
                        {isLoading ? uiTexts.loading : uiTexts.buttonText}
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}