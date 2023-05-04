import { PT_Sans_Caption } from 'next/font/google'
import './globals.css'

const ptSans = PT_Sans_Caption({
  subsets: ['latin'],
  weight: '700'
})

export const metadata = {
  title: '25Friday - We boost tomorrow',
  description: '25Friday - We boost tomorrow',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={ptSans.className}>{children}</body>
    </html>
  )
}
