"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { products } from "@/lib/products-data"
import { Button } from "@/components/ui/button"
import { ShoppingCart, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

export default function ProductPage({ params }: { params: { id: string } }) {
  const { addToCart } = useCart()
  const { toast } = useToast()
  
  const product = products.find(p => p.id === params.id)
  
  if (!product) {
    notFound()
  }

  const handleAddToCart = () => {
    addToCart(product)
    toast({
      title: "Produit ajouté !",
      description: `${product.name} a été ajouté à votre panier.`,
    })
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/10">
      <Header />
      <main className="flex-1 pt-16">
        <div className="container mx-auto px-6 py-8">
          <Link href="/catalogue" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8">
            <ArrowLeft className="w-4 h-4" />
            Retour au catalogue
          </Link>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Image du produit */}
            <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden bg-secondary/10">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Informations du produit */}
            <div>
              <div className="bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full inline-block mb-4">
                {product.category}
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-4">{product.name}</h1>
              <p className="text-muted-foreground mb-8 leading-relaxed">{product.description}</p>
              
              <div className="flex items-baseline gap-3 mb-8">
                <span className="text-3xl font-bold text-primary">{product.price.toFixed(2)} €</span>
                <span className="text-muted-foreground">/ {product.unit}</span>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button 
                  onClick={handleAddToCart}
                  size="lg"
                  className="group bg-primary hover:bg-primary/90"
                >
                  <ShoppingCart className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Ajouter au panier
                </Button>
                <Button variant="outline" size="lg">
                  Commander maintenant
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
