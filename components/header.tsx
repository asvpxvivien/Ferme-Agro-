"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ShoppingCart, Menu, X, Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { motion, AnimatePresence } from "framer-motion"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { getTotalItems } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Fermer le menu mobile quand la taille de l'écran change
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false)
      }
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const navLinks = [
    { href: "/", label: "Accueil" },
    { href: "/#about", label: "Notre Ferme" },
    { href: "/#products", label: "Nos Produits" },
    { href: "/catalogue", label: "Catalogue" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <header
      className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8"
    >
      <div className="w-full max-w-7xl mx-auto bg-white shadow-lg rounded-2xl border border-gray-100">
        <div className="flex items-center justify-between h-20 px-6">
          <Link href="/" className="flex items-center gap-3 group" aria-label="Page d'accueil">
            <div className="bg-gradient-to-br from-primary to-green-600 rounded-xl p-2.5 group-hover:scale-105 transition-transform shadow-md">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold">
              <span className="text-gray-800">Agro</span>
              <span className="text-primary">Fresh</span>
            </span>
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center gap-8" role="navigation" aria-label="Navigation principale">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-primary transition-colors font-medium relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full rounded-full" />
              </Link>
            ))}
          </nav>

          {/* Panier et Menu Mobile */}
          <div className="flex items-center gap-3">
            <Link href="/panier" aria-label={`Voir le panier (${getTotalItems() || 0} articles)`}>
              <Button
                variant="outline"
                size="icon"
                className="relative hover:bg-primary hover:text-white hover:border-primary transition-colors bg-white border-gray-200"
              >
                <ShoppingCart className="w-5 h-5" aria-hidden="true" />
                <span className="sr-only">Voir le panier</span>
                {getTotalItems() > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-lg"
                  >
                    {getTotalItems()}
                    <span className="sr-only">articles dans le panier</span>
                  </motion.span>
                )}
              </Button>
            </Link>

            {/* Bouton Menu Mobile */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-gray-700"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Menu de navigation"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
            </Button>
          </div>
        </div>

        {/* Menu Mobile */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-100"
              id="mobile-menu"
            >
              <nav className="px-6 py-4 flex flex-col gap-3" role="navigation" aria-label="Navigation mobile">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-gray-700 hover:text-primary transition-colors font-medium py-2"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}