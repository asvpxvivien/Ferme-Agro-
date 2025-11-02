"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, ShoppingCart, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/cart-context"
import Image from "next/image"
import Link from "next/link"

interface AddToCartModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  product: Product | null
}

export function AddToCartModal({ isOpen, onClose, onConfirm, product }: AddToCartModalProps) {
  if (!product) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-foreground/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
          >
            <div className="bg-card rounded-xl shadow-2xl overflow-hidden border border-border">
              {/* Header */}
              <div className="relative h-48 bg-secondary/20">
                <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm hover:bg-background p-2 rounded-full transition-all hover:scale-110"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <ShoppingCart className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-1">Ajouter au panier ?</h3>
                    <p className="text-muted-foreground text-sm">Confirmez l'ajout de ce produit</p>
                  </div>
                </div>

                {/* Product Info */}
                <div className="bg-muted/50 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-foreground mb-2">{product.name}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{product.description}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-primary">{product.price.toFixed(2)} €</span>
                    <span className="text-muted-foreground text-sm">/ {product.unit}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button onClick={onClose} variant="outline" className="flex-1 bg-transparent">
                    Annuler
                  </Button>
                  <Button onClick={onConfirm} className="flex-1 bg-primary hover:bg-primary/90">
                    <Check className="w-5 h-5 mr-2" />
                    Confirmer
                  </Button>
                </div>

                {/* Link to cart */}
                <Link href="/panier" className="block mt-4">
                  <Button variant="ghost" className="w-full text-sm">
                    Voir mon panier
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
