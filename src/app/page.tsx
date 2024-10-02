import { TranslatedTitle } from '@/app/components/translated-title'
import DadJokeGenerator from '@/app/components/dad-joke-generator'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-y-32 justify-center sm:p-8 md:p-24">
      <TranslatedTitle initialTitle="Welcome to Dad Jokes" />
      <DadJokeGenerator />

    </main>
  )
}