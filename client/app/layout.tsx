import './globals.css'
import { Inter } from 'next/font/google'
import { Session } from 'next-auth'
import { headers } from 'next/headers'
import { SessionProvider } from 'next-auth/react';
import AuthContext from '@/components/auth/auth-context';

const inter = Inter({ subsets: ['latin'] })

async function getSession(cookie: string): Promise<Session> {
  const response = await fetch(`/api/auth/session`, {
    headers: {
      cookie,
    },
  });

  const session = await response.json();

  return Object.keys(session).length > 0 ? session : null;
}

export const metadata = {
  title: 'LunarChat',
  description: 'A chat app of sorts',
}

interface Props {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: Props) {
  //const session = await getSession(headers().get('cookie') ?? '');

  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen max-h-screen flex flex-col text-xs sm:text-base`}>
        <AuthContext>
          <header className="p-4 bg-white/20">
            <h1 className="text-2xl">LunarChat!</h1>
          </header>
          <div className="overflow-hidden flex-1 flex flex-row items-stretch">
            {children}
          </div>
        </AuthContext>
      </body>
    </html>
  )
}
