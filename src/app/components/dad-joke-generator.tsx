'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"

export default function DadJokeGenerator() {
    const [joke, setJoke] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

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
            setJoke(data.joke)
        } catch (err) {
            setError('Failed to fetch joke. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchJoke()
    }, [])

    return (
        <div className="flex items-center w-100 justify-center bg-foreground text-background rounded-md">
            <Card className="min-w-3/5">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Dad Joke Generator</CardTitle>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <p className="text-center mb-4">Loading joke...</p>
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
                        {isLoading ? 'Fetching...' : 'Get New Joke'}
                    </Button>
                </CardContent>
            </Card>
        </div >
    )
}