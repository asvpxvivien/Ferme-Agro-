"use client"

import { use, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { products } from "@/lib/products-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ShoppingCart, ArrowLeft, Plus, Minus } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { addToCart } = useCart()
  const { toast } = useToast()
  const [quantity, setQuantity] = useState(1)
  const [purchaseType, setPurchaseType] = useState<"detail" | "gros">("detail")

  const { id } = use(params)
  const product = products.find(p => p.id === id)

  if (!product) {
    notFound()
  }

  const handleIncrement = () => {
    setQuantity(prev => prev + 1)
  }

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1)
    }
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    if (!isNaN(value) && value > 0) {
      setQuantity(value)
    }
  }

  const getTotalPrice = () => {
    const basePrice = product.price
    const multiplier = purchaseType === "gros" ? 0.85 : 1
    return basePrice * quantity * multiplier
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, purchaseType)
    toast({
      title: "Produit ajouté !",
      description: `${quantity} x ${product.name} ajouté${quantity > 1 ? 's' : ''} à votre panier${purchaseType === "gros" ? " (en gros)" : ""}.`,
    })
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <Link href="/catalogue" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8">
            <ArrowLeft className="w-4 h-4" />
            Retour au catalogue
          </Link>

          <div className="grid md:grid-cols-2 gap-8">
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
            <div className="bg-gradient-to-b from-background to-secondary/10 p-6 rounded-2xl">
              <div className="bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full inline-block mb-3">
                {product.category}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">{product.name}</h1>
              <p className="text-muted-foreground mb-6 leading-relaxed text-sm">{product.description}</p>

              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-2xl md:text-3xl font-bold text-primary">{product.price.toLocaleString('fr-FR')} FCFA</span>
                <span className="text-muted-foreground text-sm">/ {product.unit}</span>
              </div>

              {/* Purchase Type */}
              <div className="mb-4">
                <Label className="text-sm font-semibold mb-2 block">Type d'achat</Label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setPurchaseType("detail")}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      purchaseType === "detail"
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="font-semibold text-sm">Détail</div>
                    <div className="text-xs text-muted-foreground">Prix normal</div>
                  </button>
                  <button
                    onClick={() => setPurchaseType("gros")}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      purchaseType === "gros"
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="font-semibold text-sm">En gros</div>
                    <div className="text-xs text-muted-foreground">-15%</div>
                  </button>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-4">
                <Label className="text-sm font-semibold mb-2 block">Quantité</Label>
                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={handleDecrement}
                    disabled={quantity <= 1}
                    className="h-10 w-10"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="text-center h-10 text-lg font-semibold"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={handleIncrement}
                    className="h-10 w-10"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Total Price */}
              <div className="bg-gradient-to-br from-primary/10 to-green-500/10 rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-muted-foreground">Total</span>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">
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

              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={handleAddToCart}
                  size="default"
                  className="group bg-primary hover:bg-primary/90 flex-1"
                >
                  <ShoppingCart className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  Ajouter au panier
                </Button>
                <Button
                  onClick={() => {
                    handleAddToCart()
                    setTimeout(() => window.location.href = "/checkout", 500)
                  }}
                  variant="outline"
                  size="default"
                  className="flex-1"
                >
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
