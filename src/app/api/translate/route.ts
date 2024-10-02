import { NextResponse } from 'next/server'
import { Translate } from '@google-cloud/translate/build/src/v2'

const translate = new Translate({
    key: process.env.GOOGLE_TRANSLATE_API_KEY,
})

export async function POST(req: Request) {
    const { text, targetLanguage } = await req.json()

    try {
        const [translation] = await translate.translate(text, targetLanguage)
        return NextResponse.json({ translatedText: translation })
    } catch (error) {
        console.error('Translation error:', error)
        return NextResponse.json({ error: 'Translation failed' }, { status: 500 })
    }
}

// Add this GET function for static export
export async function GET() {
    return NextResponse.json({ message: "This is a static response from the translation API" })
}