"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ShoppingCart, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { motion, AnimatePresence } from "framer-motion"

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { getTotalItems } = useCart()

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
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="w-full max-w-[1400px] mx-auto px-6 py-4">
        <div className="bg-white/80 backdrop-blur-xl shadow-xl rounded-2xl border border-gray-100/50">
          <div className="flex items-center justify-between px-6 py-3">
            {/* Logo */}
            <Link href="/" className="group">
              <span className="text-2xl font-bold tracking-tight group-hover:scale-105 transition-transform inline-block">
                <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">Agro</span>
                <span className="text-gray-800">Fresh</span>
              </span>
            </Link>

            {/* Navigation Desktop */}
            <nav className="hidden md:flex items-center gap-8" role="navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-700 font-medium hover:text-primary hover:scale-105 transition-all duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <Link href="/panier">
                <Button
                  size="icon"
                  className="relative bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {getTotalItems() > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold"
                    >
                      {getTotalItems()}
                    </motion.span>
                  )}
                </Button>
              </Link>

              {/* Menu Mobile */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-gray-700"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
              >
                <nav className="px-6 py-4 flex flex-col gap-3">
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
      </div>
    </header>
  )
}
