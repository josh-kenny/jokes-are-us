import { NextResponse } from 'next/server'
import { Translate } from '@google-cloud/translate/build/src/v2'

// Initialize the Google Translate client with the API key from environment variables
const translate = new Translate({
    key: process.env.GOOGLE_TRANSLATE_API_KEY,
})

// Define the POST request handler
export async function POST(req: Request) {
    // Extract the text to translate and the target language from the request body
    const { text, targetLanguage } = await req.json()

    try {
        // Attempt to translate the text using Google Translate API
        const [translation] = await translate.translate(text, targetLanguage)

        // If successful, return the translated text as JSON
        return NextResponse.json({ translatedText: translation })
    } catch (error) {
        // If an error occurs during translation, log it and return an error response
        console.error('Translation error:', error)
        return NextResponse.json({ error: 'Translation failed' }, { status: 500 })
    }
}