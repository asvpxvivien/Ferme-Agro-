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

  const handleConfirmAdd = () => {
    addToCart(product)
    setIsModalOpen(false)
    toast({
      title: "Produit ajouté !",
      description: `${product.name} a été ajouté à votre panier.`,
    })
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3), ease: "easeOut" }}
      >
        <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col border-2 hover:border-primary/50">
          <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden bg-secondary/10">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              loading={index < 4 ? "eager" : "lazy"}
              quality={85}
            />
            <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg">
              {product.category}
            </div>
            <Link href={`/produit/${product.id}`} aria-label={`Voir les détails du produit ${product.name}`}>
              <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Button variant="secondary" size="lg" className="shadow-lg transition-all duration-300 hover:scale-105">
                  <Eye className="w-5 h-5 mr-2" aria-hidden="true" />
                  Voir détails
                </Button>
              </div>
            </Link>
          </div>
          <CardContent className="flex-1 p-6">
            <Link href={`/produit/${product.id}`} aria-label={`Voir les détails du produit ${product.name}`}>
              <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors cursor-pointer">
                {product.name}
              </h3>
            </Link>
            <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-2">{product.description}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-primary">{product.price.toLocaleString('fr-FR')} FCFA</span>
              <span className="text-muted-foreground text-sm">/ {product.unit}</span>
            </div>
          </CardContent>
          <CardFooter className="p-6 pt-0">
            <Button 
              onClick={handleAddToCart} 
              className="w-full group/btn bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-[1.02]" 
              size="lg"
              aria-label={`Ajouter ${product.name} au panier`}
            >
              <ShoppingCart className="w-5 h-5 mr-2 group-hover/btn:scale-110 transition-transform duration-300" aria-hidden="true" />
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