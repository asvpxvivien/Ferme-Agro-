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

        </div>
      </div>

      {/* Menu Mobile Plein Écran */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Menu Content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-4 right-4 bottom-auto w-[280px] bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 shadow-2xl z-50 md:hidden rounded-2xl"
            >
              <div className="p-6">
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Fermer le menu"
                  title="Fermer"
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
                >
                  <X className="w-5 h-5 text-gray-700" aria-hidden="true" />
                </button>

                {/* Logo */}
                <div className="flex items-center gap-2 mb-8 mt-2">
                  <div className="bg-gradient-to-br from-primary to-green-600 rounded-lg p-2 shadow-sm">
                    <Leaf className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg font-bold">
                    <span className="text-gray-800">ASS</span>
                    <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">IKO</span>
                  </span>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col gap-2">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block text-gray-700 hover:text-green-600 hover:bg-white/60 hover:scale-105 hover:shadow-sm transition-all duration-200 py-3 px-4 rounded-xl"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Panier Link */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-6 pt-6 border-t border-amber-200/50"
                >
                  <Link
                    href="/panier"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between bg-gradient-to-r from-green-600 to-emerald-500 text-white py-3 px-4 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200"
                  >
                    <div className="flex items-center gap-2">
                      <ShoppingCart className="w-5 h-5" />
                      <span>Mon Panier</span>
                    </div>
                    {getTotalItems() > 0 && (
                      <span className="bg-white text-green-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                        {getTotalItems()}
                      </span>
                    )}
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
