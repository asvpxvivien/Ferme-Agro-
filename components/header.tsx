"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ShoppingCart, Menu, X, Leaf } from "lucide-react"
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
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 md:pt-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 backdrop-blur-md shadow-lg rounded-full md:rounded-full rounded-2xl border border-amber-200/50">
          <div className="flex items-center justify-between px-4 md:px-6 h-14 md:h-16">
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-2">
              <div className="bg-gradient-to-br from-primary to-green-600 rounded-lg p-1.5 shadow-sm">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <span className="text-base font-bold tracking-tight group-hover:scale-105 transition-transform inline-block">
                <span className="text-gray-800">ASS</span><span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">IKO</span>
              </span>
            </Link>

            {/* Navigation Desktop */}
            <nav className="hidden md:flex items-center gap-8" role="navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-base text-gray-700 hover:text-green-600 hover:scale-110 active:scale-95 transition-all duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Link href="/panier">
                <Button
                  size="sm"
                  className="relative bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white rounded-full h-9 w-9 p-0"
                >
                  <ShoppingCart className="w-4 h-4" />
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
                size="sm"
                className="md:hidden text-gray-700 h-9 w-9 p-0"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
                className="md:hidden border-t border-amber-200/30 overflow-hidden"
              >
                <nav className="px-4 py-3 flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-sm text-gray-700 hover:text-green-600 hover:bg-amber-100/50 transition-all font-medium py-2.5 px-3 rounded-lg"
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
