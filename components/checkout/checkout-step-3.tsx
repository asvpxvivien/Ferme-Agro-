"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useCheckout } from "@/lib/checkout-context"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle2, Store, Home, User, Phone, MapPin, Edit2 } from "lucide-react"
import type { CartItem } from "@/lib/cart-context"

export function CheckoutStep3() {
  const router = useRouter()
  const { clearCart } = useCart()
  const {
    deliveryMethod,
    customerInfo,
    checkoutItems,
    previousStep,
    setCurrentStep,
    resetCheckout,
    getDeliveryFee,
    getTotalWithDelivery,
  } = useCheckout()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderConfirmed, setOrderConfirmed] = useState(false)

  const getItemPrice = (item: CartItem) => {
    return item.purchaseType === "gros" ? item.price * 0.85 : item.price
  }

  const getItemTotal = (item: CartItem) => {
    return getItemPrice(item) * item.quantity
  }

  const getSubtotal = () => {
    return checkoutItems.reduce((sum, item) => sum + getItemTotal(item), 0)
  }

  const handleConfirmOrder = async () => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Clear cart and show confirmation
    clearCart()
    setOrderConfirmed(true)
    setIsSubmitting(false)

    // Redirect to home after 3 seconds
    setTimeout(() => {
      resetCheckout()
      router.push("/")
    }, 3000)
  }

  if (orderConfirmed) {
    return (
      <div className="text-center py-12">
        <div className="mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Commande confirmée !</h2>
        <p className="text-lg text-muted-foreground mb-2">
          Merci pour votre commande, {customerInfo.name}
        </p>
        <p className="text-muted-foreground mb-6">
          Nous vous contacterons au {customerInfo.phone} pour confirmer les détails.
        </p>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-md mx-auto">
          <p className="text-sm text-green-800">
            {deliveryMethod === "farm"
              ? "Votre commande sera prête sous 24h pour retrait à la ferme."
              : "Votre commande sera livrée sous 1-2 jours."}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Confirmation de la commande</h2>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Order Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Delivery Information */}
          <div className="border border-gray-200 rounded-lg p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Informations de livraison</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentStep(2)}
                className="text-primary hover:text-primary/80"
              >
                <Edit2 className="w-4 h-4 mr-1" />
                Modifier
              </Button>
            </div>

            {/* Delivery Method */}
            <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
              {deliveryMethod === "farm" ? (
                <>
                  <Store className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-semibold">Retrait à la ferme</div>
                    <div className="text-sm text-muted-foreground">Disponible sous 24h</div>
                  </div>
                </>
              ) : (
                <>
                  <Home className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-semibold">Livraison à domicile</div>
                    <div className="text-sm text-muted-foreground">Sous 1-2 jours</div>
                  </div>
                </>
              )}
            </div>

            {/* Customer Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-gray-400" />
                <span className="text-gray-900">{customerInfo.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <span className="text-gray-900">{customerInfo.phone}</span>
              </div>
              {deliveryMethod === "home" && (
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-gray-900">{customerInfo.address}</div>
                    <div className="text-sm text-muted-foreground">
                      {customerInfo.postalCode && `${customerInfo.postalCode}, `}
                      {customerInfo.city}
                    </div>
                  </div>
                </div>
              )}
              {customerInfo.additionalNotes && (
                <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="text-sm font-semibold text-blue-900 mb-1">Note:</div>
                  <div className="text-sm text-blue-800">{customerInfo.additionalNotes}</div>
                </div>
              )}
            </div>
          </div>

          {/* Order Items */}
          <div className="border border-gray-200 rounded-lg p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Produits commandés ({checkoutItems.length})
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentStep(1)}
                className="text-primary hover:text-primary/80"
              >
                <Edit2 className="w-4 h-4 mr-1" />
                Modifier
              </Button>
            </div>

            <div className="space-y-3">
              {checkoutItems.map((item) => (
                <div
                  key={`${item.id}-${item.purchaseType}`}
                  className="flex gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="relative w-16 h-16 flex-shrink-0 rounded overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">{item.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-muted-foreground">
                            {getItemPrice(item).toLocaleString('fr-FR')} FCFA × {item.quantity}
                          </span>
                          {item.purchaseType === "gros" && (
                            <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-semibold">
                              En gros
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="font-bold text-primary text-sm">
                        {getItemTotal(item).toLocaleString('fr-FR')} FCFA
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:col-span-1">
          <div className="border border-gray-200 rounded-lg p-5 sticky top-24">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Récapitulatif</h3>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-gray-600">
                <span>Sous-total</span>
                <span>{getSubtotal().toLocaleString('fr-FR')} FCFA</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Livraison</span>
                <span>
                  {getDeliveryFee() === 0 ? (
                    <span className="text-green-600 font-semibold">Gratuit</span>
                  ) : (
                    `${getDeliveryFee().toLocaleString('fr-FR')} FCFA`
                  )}
                </span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-primary">
                    {getTotalWithDelivery().toLocaleString('fr-FR')} FCFA
                  </span>
                </div>
              </div>
            </div>

            <Button
              onClick={handleConfirmOrder}
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary/90 mb-3"
            >
              {isSubmitting ? (
                "Confirmation en cours..."
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  Valider la commande
                </>
              )}
            </Button>

            <Button variant="outline" onClick={previousStep} className="w-full">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Retour
            </Button>

            <div className="mt-4 text-xs text-muted-foreground text-center">
              En validant, vous acceptez nos conditions générales de vente
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
