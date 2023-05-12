import './globals.css'
import { Inter } from 'next/font/google'
import AuthContext from '@/components/auth/auth-context';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'LunarChat',
  description: 'A chat app of sorts',
}

interface Props {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen max-h-screen flex flex-col text-xs sm:text-base`}>
        <AuthContext>
          <header className="p-4 bg-white/20">
            <h1 className="text-2xl">LunarChat!</h1>
          </header>
          {children}
        </AuthContext>
      </body>
    </html>
  )
}
