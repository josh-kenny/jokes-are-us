'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { useTranslation } from '@/contexts/translation-context'

export default function DadJokeGenerator() {
    // State variables for joke, loading status, and error handling
    const [joke, setJoke] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // State for UI text elements, initialized with English defaults
    const [uiTexts, setUiTexts] = useState({
        cardTitle: 'Dad Joke Generator',
        buttonText: 'Get New Joke',
        loading: 'Loading joke...',
        error: 'Failed to fetch joke. Please try again.',
    })

    // Hook to access translation function and current language
    const { translate, language } = useTranslation()

    // Function to fetch a new joke from the API
    const fetchJoke = async () => {
        setIsLoading(true)
        setError(null)
        try {
            // Fetch joke from icanhazdadjoke API
            const response = await fetch('https://icanhazdadjoke.com/', {
                headers: {
                    'Accept': 'application/json'
                }
            })
            if (!response.ok) {
                throw new Error('Failed to fetch joke')
            }
            const data = await response.json()
            // Translate the fetched joke
            const translatedJoke = await translate(data.joke)
            setJoke(translatedJoke)
        } catch (err) {
            setError(uiTexts.error)
        } finally {
            setIsLoading(false)
        }
    }

    // Fetch a joke when the component mounts
    useEffect(() => {
        fetchJoke()
    }, [])

    // Translate UI texts and fetch a new joke when language changes
    useEffect(() => {
        const translateUiTexts = async () => {
            // Translate all UI text elements
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
                    {/* Conditional rendering based on loading and error states */}
                    {isLoading ? (
                        <p className="text-center mb-4">{uiTexts.loading}</p>
                    ) : error ? (
                        <p className="text-center mb-4 text-red-500">{error}</p>
                    ) : (
                        <p className="text-center mb-4">{joke}</p>
                    )}
                    {/* Button to fetch a new joke */}
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