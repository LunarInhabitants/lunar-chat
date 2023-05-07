import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'LunarChat',
  description: 'A chat app of sorts',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen max-h-screen flex flex-col`}>
        <header className="p-4 bg-white/20">
          <h1 className="text-2xl">LunarChat!</h1>
        </header>
        <div className="overflow-hidden flex-1 flex flex-row items-stretch">
          {children}
        </div>
      </body>
    </html>
  )
}
