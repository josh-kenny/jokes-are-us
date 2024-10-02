import localFont from "next/font/local";
import "./styles/globals.scss";
import { TranslationProvider } from '@/contexts/translation-context'
import { LayoutContent } from '@/app/components/layout-content'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <TranslationProvider>
          <LayoutContent>{children}</LayoutContent>
        </TranslationProvider>
      </body>
    </html>
  )
}