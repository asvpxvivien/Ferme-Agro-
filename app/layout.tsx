import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { CartProvider } from "@/lib/cart-context"
import { CheckoutProvider } from "@/lib/checkout-context"
import { Toaster } from "@/components/ui/toaster"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "Ferme AgroEcologique ASSIKO - Produits Bio & Naturels | Bénin",
  description:
    "Ferme AgroEcologique ASSIKO à Calavi, Bénin. Produits biologiques 100% naturels : poulets fermiers, œufs frais, lapins, légumes bio. Agriculture écologique et locale. Livraison disponible.",
  keywords: "ferme bio Bénin, produits naturels Calavi, poulet fermier, œufs bio, légumes biologiques, agriculture écologique, produits frais Bénin, ferme Assiko",
  authors: [{ name: "Ferme AgroEcologique ASSIKO" }],
  openGraph: {
    title: "Ferme AgroEcologique ASSIKO - Produits Bio & Naturels",
    description: "Découvrez nos produits biologiques 100% naturels : poulets fermiers, œufs frais, légumes bio cultivés à Calavi, Bénin",
    type: "website",
    locale: "fr_BJ",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className="scroll-smooth light" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
          forcedTheme="light"
        >
          <Suspense fallback={null}>
            <CartProvider>
              <CheckoutProvider>
                {children}
                <Toaster />
              </CheckoutProvider>
            </CartProvider>
          </Suspense>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}