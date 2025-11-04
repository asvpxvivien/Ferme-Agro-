"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { Product } from "@/lib/cart-context"
import { useState } from "react"
import { AddToCartModal } from "./add-to-cart-modal"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/hooks/use-toast"

interface ProductCardProps {
  product: Product
  index: number
}

export function ProductCard({ product, index }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { addToCart } = useCart()
  const { toast } = useToast()

  const handleAddToCart = () => {
    setIsModalOpen(true)
  }

  const handleConfirmAdd = (quantity: number, purchaseType: "detail" | "gros") => {
    addToCart(product, quantity, purchaseType)
    setIsModalOpen(false)
    toast({
      title: "Produit ajouté !",
      description: `${quantity} x ${product.name} ajouté${quantity > 1 ? 's' : ''} à votre panier${purchaseType === "gros" ? " (en gros)" : ""}.`,
    })
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: Math.min(index * 0.02, 0.1), ease: "easeOut" }}
      >
        <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col border-2 hover:border-primary/50 !p-0 !gap-0">
          <div className="relative flex-1 min-h-[240px] sm:min-h-[260px] overflow-hidden rounded-t-xl">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              loading={index < 6 ? "eager" : "lazy"}
              quality={75}
              priority={index < 4}
            />
            <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-2.5 py-1 rounded-full text-xs font-semibold shadow-lg z-10">
              {product.category}
            </div>
            {/* Overlay hover sur desktop uniquement */}
            <Link href={`/produit/${product.id}`} aria-label={`Voir les détails du produit ${product.name}`} className="hidden md:block">
              <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Button variant="secondary" size="lg" className="shadow-lg transition-all duration-300 hover:scale-105">
                  <Eye className="w-5 h-5 mr-2" aria-hidden="true" />
                  Voir détails
                </Button>
              </div>
            </Link>
          </div>
          <CardContent className="p-4">
            <Link href={`/produit/${product.id}`} aria-label={`Voir les détails du produit ${product.name}`}>
              <h3 className="text-lg font-bold text-foreground mb-1.5 group-hover:text-primary transition-colors cursor-pointer">
                {product.name}
              </h3>
            </Link>
            <p className="text-muted-foreground text-sm mb-3 leading-relaxed line-clamp-2">{product.description}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-primary">{product.price.toLocaleString('fr-FR')} FCFA</span>
              <span className="text-muted-foreground text-xs">/ {product.unit}</span>
            </div>
          </CardContent>
          <CardFooter className="p-3 pt-0 flex flex-col sm:flex-row gap-2">
            {/* Bouton Voir détails sur mobile */}
            <Link href={`/produit/${product.id}`} className="w-full sm:hidden">
              <Button
                variant="outline"
                className="w-full h-9 py-1.5 px-3 text-sm border-primary text-primary hover:bg-primary hover:text-white transition-all"
                aria-label={`Voir les détails de ${product.name}`}
              >
                <Eye className="w-4 h-4 mr-1.5" aria-hidden="true" />
                Voir détails
              </Button>
            </Link>

            {/* Bouton Ajouter au panier */}
            <Button
              onClick={handleAddToCart}
              className="w-full h-9 py-1.5 px-3 group/btn bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-[1.02] text-sm"
              aria-label={`Ajouter ${product.name} au panier`}
            >
              <ShoppingCart className="w-4 h-4 mr-1.5 group-hover/btn:scale-110 transition-transform duration-300" aria-hidden="true" />
              Ajouter au panier
            </Button>
          </CardFooter>
        </Card>
      </motion.div>

      <AddToCartModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmAdd}
        product={product}
      />
    </>
  )
}