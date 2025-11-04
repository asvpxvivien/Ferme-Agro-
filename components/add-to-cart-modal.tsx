"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ShoppingCart, Check, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Product } from "@/lib/cart-context"
import Image from "next/image"
import Link from "next/link"

interface AddToCartModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (quantity: number, purchaseType: "detail" | "gros") => void
  product: Product | null
}

export function AddToCartModal({ isOpen, onClose, onConfirm, product }: AddToCartModalProps) {
  const [quantity, setQuantity] = useState(1)
  const [purchaseType, setPurchaseType] = useState<"detail" | "gros">("detail")

  if (!product) return null

  const minQuantity = purchaseType === "gros" ? 5 : 1

  const handleIncrement = () => {
    setQuantity(prev => prev + 1)
  }

  const handleDecrement = () => {
    if (quantity > minQuantity) {
      setQuantity(prev => prev - 1)
    }
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    if (!isNaN(value) && value >= minQuantity) {
      setQuantity(value)
    }
  }

  const handlePurchaseTypeChange = (type: "detail" | "gros") => {
    setPurchaseType(type)
    if (type === "gros") {
      // Si on passe en gros et la quantité est < 5, on la met à 5
      if (quantity < 5) {
        setQuantity(5)
      }
    } else {
      // Si on passe en détail, on remet à 1
      setQuantity(1)
    }
  }

  const getTotalPrice = () => {
    const basePrice = product.price
    const multiplier = purchaseType === "gros" ? 0.85 : 1 // 15% de réduction en gros
    return basePrice * quantity * multiplier
  }

  const handleConfirm = () => {
    onConfirm(quantity, purchaseType)
    setQuantity(1)
    setPurchaseType("detail")
  }

  const handleClose = () => {
    onClose()
    setQuantity(1)
    setPurchaseType("detail")
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-foreground/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:inset-auto z-50 w-full md:max-w-md mx-0 md:mx-4 h-full md:h-auto overflow-y-auto"
          >
            <div className="bg-card min-h-full md:min-h-0 md:rounded-2xl shadow-2xl overflow-hidden md:border border-border flex flex-col">
              {/* Header */}
              <div className="relative h-64 md:h-40 bg-secondary/20 flex-shrink-0">
                <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                <button
                  onClick={handleClose}
                  aria-label="Fermer la fenêtre"
                  title="Fermer"
                  className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm hover:bg-background p-1.5 rounded-full transition-all hover:scale-110"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4 flex-1 overflow-y-auto">
                <div className="flex items-start gap-3 mb-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <ShoppingCart className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground mb-1">Ajouter au panier</h3>
                    <p className="text-muted-foreground text-xs">Configurez votre commande</p>
                  </div>
                </div>

                {/* Product Info */}
                <div className="bg-muted/50 rounded-lg p-3 mb-3">
                  <h4 className="font-semibold text-foreground mb-2">{product.name}</h4>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-primary">{product.price.toLocaleString('fr-FR')} FCFA</span>
                    <span className="text-muted-foreground text-sm">/ {product.unit}</span>
                  </div>
                </div>

                {/* Purchase Type */}
                <div className="mb-3">
                  <Label className="text-sm font-semibold mb-2 block">Type d'achat</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handlePurchaseTypeChange("detail")}
                      className={`p-2 rounded-lg border-2 transition-all ${
                        purchaseType === "detail"
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="font-semibold text-sm">Détail</div>
                      <div className="text-xs text-muted-foreground">Achat à l'unité</div>
                    </button>
                    <button
                      onClick={() => handlePurchaseTypeChange("gros")}
                      className={`p-2 rounded-lg border-2 transition-all ${
                        purchaseType === "gros"
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="font-semibold text-sm">En gros</div>
                      <div className="text-xs text-muted-foreground">Min. 5 unités · -15%</div>
                    </button>
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="mb-3">
                  <Label className="text-sm font-semibold mb-2 block">
                    Quantité {purchaseType === "gros" && <span className="text-xs font-normal text-muted-foreground">(minimum 5)</span>}
                  </Label>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={handleDecrement}
                      disabled={quantity <= minQuantity}
                      className="h-9 w-9"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      min={minQuantity}
                      value={quantity}
                      onChange={handleQuantityChange}
                      className="text-center h-9 text-base font-semibold"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={handleIncrement}
                      className="h-9 w-9"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Total Price */}
                <div className="bg-gradient-to-br from-primary/10 to-green-500/10 rounded-lg p-3 mb-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-muted-foreground">Total</span>
                    <div className="text-right">
                      <div className="text-xl font-bold text-primary">
                        {getTotalPrice().toLocaleString('fr-FR')} FCFA
                      </div>
                      {purchaseType === "gros" && (
                        <div className="text-xs text-green-600 font-semibold">
                          Économie: {(product.price * quantity * 0.15).toLocaleString('fr-FR')} FCFA
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button onClick={handleClose} variant="outline" className="flex-1 border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
                    Annuler
                  </Button>
                  <Button onClick={handleConfirm} className="flex-1 bg-primary hover:bg-primary/90 hover:scale-105 transition-transform">
                    <Check className="w-4 h-4 mr-1" />
                    Confirmer
                  </Button>
                </div>

                {/* Link to cart */}
                <Link href="/panier" className="block mt-3">
                  <Button variant="outline" className="w-full text-sm text-primary hover:bg-primary hover:text-white transition-colors">
                    <ShoppingCart className="w-4 h-4 mr-2" />
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
