"use client"

import { useState } from "react"
import Image from "next/image"
import { useCheckout } from "@/lib/checkout-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react"
import type { CartItem } from "@/lib/cart-context"

export function CheckoutStep1() {
  const { checkoutItems, setCheckoutItems, nextStep } = useCheckout()
  const [editingItem, setEditingItem] = useState<string | null>(null)

  const updateQuantity = (itemId: string, purchaseType: string, newQuantity: number) => {
    if (newQuantity < 1) return
    setCheckoutItems(
      checkoutItems.map((item) =>
        item.id === itemId && item.purchaseType === purchaseType
          ? { ...item, quantity: newQuantity }
          : item
      )
    )
  }

  const removeItem = (itemId: string, purchaseType: string) => {
    setCheckoutItems(
      checkoutItems.filter(
        (item) => !(item.id === itemId && item.purchaseType === purchaseType)
      )
    )
  }

  const getItemPrice = (item: CartItem) => {
    return item.purchaseType === "gros" ? item.price * 0.85 : item.price
  }

  const getItemTotal = (item: CartItem) => {
    return getItemPrice(item) * item.quantity
  }

  const getTotal = () => {
    return checkoutItems.reduce((sum, item) => sum + getItemTotal(item), 0)
  }

  const handleContinue = () => {
    if (checkoutItems.length > 0) {
      nextStep()
    }
  }

  if (checkoutItems.length === 0) {
    return (
      <div className="text-center py-12">
        <ShoppingBag className="w-16 h-16 mx-auto text-gray-300 mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Votre panier est vide</h3>
        <p className="text-muted-foreground mb-6">
          Ajoutez des produits pour continuer votre commande
        </p>
        <Button onClick={() => window.location.href = "/catalogue"}>
          Découvrir nos produits
        </Button>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Vérifiez votre commande</h2>

      {/* Product List */}
      <div className="space-y-4 mb-6">
        {checkoutItems.map((item) => {
          const itemKey = `${item.id}-${item.purchaseType}`
          const isEditing = editingItem === itemKey

          return (
            <div
              key={itemKey}
              className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow relative"
            >
              {/* Product Image */}
              <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col gap-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <div className="flex flex-col gap-1 mt-1">
                      <span className="text-sm text-muted-foreground">
                        {getItemPrice(item).toLocaleString('fr-FR')} FCFA / {item.unit}
                      </span>
                      {item.purchaseType === "gros" && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold w-fit">
                          En gros (-15%)
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between mt-2 gap-3">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.purchaseType || "detail",
                          item.quantity - 1
                        )
                      }
                      disabled={item.quantity <= 1}
                      className="h-8 w-8"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(
                          item.id,
                          item.purchaseType || "detail",
                          parseInt(e.target.value) || 1
                        )
                      }
                      className="w-16 text-center h-8"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.purchaseType || "detail",
                          item.quantity + 1
                        )
                      }
                      className="h-8 w-8"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-left sm:text-right">
                    <div className="font-bold text-lg text-primary">
                      {getItemTotal(item).toLocaleString('fr-FR')} FCFA
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Total and Actions */}
      <div className="border-t pt-6">
        <div className="flex justify-between items-center mb-6">
          <span className="text-lg font-semibold text-gray-700">Total des produits</span>
          <span className="text-2xl font-bold text-primary">
            {getTotal().toLocaleString('fr-FR')} FCFA
          </span>
        </div>

        <div className="flex gap-3 max-w-2xl mx-auto">
          <Button
            variant="outline"
            onClick={() => window.location.href = "/catalogue"}
            className="flex-1"
          >
            Ajouter des produits
          </Button>
          <Button onClick={handleContinue} className="flex-1 bg-primary hover:bg-primary/90">
            Continuer
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}
