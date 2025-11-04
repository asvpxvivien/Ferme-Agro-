"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useCart } from "@/lib/cart-context"
import { useCheckout } from "@/lib/checkout-context"
import { CheckCircle2, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CheckoutStep1 } from "@/components/checkout/checkout-step-1"
import { CheckoutStep2 } from "@/components/checkout/checkout-step-2"
import { CheckoutStep3 } from "@/components/checkout/checkout-step-3"

export default function CheckoutPage() {
  const router = useRouter()
  const { cart } = useCart()
  const { currentStep, checkoutItems, setCheckoutItems } = useCheckout()

  useEffect(() => {
    // Scroll to top when entering checkout
    window.scrollTo({ top: 0, behavior: 'smooth' })

    // Si le panier est vide, rediriger vers la page panier
    if (cart.length === 0 && checkoutItems.length === 0) {
      router.push("/panier")
      return
    }

    // Initialiser les items de checkout avec les items du panier
    if (checkoutItems.length === 0 && cart.length > 0) {
      setCheckoutItems(cart)
    }
  }, [cart, checkoutItems, router, setCheckoutItems])

  const steps = [
    { number: 1, title: "Produits", description: "Vérifier votre commande" },
    { number: 2, title: "Informations", description: "Vos coordonnées" },
    { number: 3, title: "Confirmation", description: "Valider la commande" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-3 max-w-6xl pt-2">
        {/* Back Button */}
        <Link href="/panier" className="inline-block mb-1">
          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900 h-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour au panier
          </Button>
        </Link>

        {/* Progress Steps */}
        <div className="mb-3 max-w-3xl mx-auto">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                      currentStep >= step.number
                        ? "bg-primary border-primary text-white"
                        : "bg-white border-gray-300 text-gray-400"
                    }`}
                  >
                    {currentStep > step.number ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      <span className="font-bold">{step.number}</span>
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <div
                      className={`font-semibold text-sm ${
                        currentStep >= step.number ? "text-primary" : "text-gray-400"
                      }`}
                    >
                      {step.title}
                    </div>
                    <div className="text-xs text-muted-foreground hidden sm:block">
                      {step.description}
                    </div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 mx-2 transition-all ${
                      currentStep > step.number ? "bg-primary" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="rounded-lg border border-border p-4 sm:p-6 max-w-4xl mx-auto">
          {currentStep === 1 && <CheckoutStep1 />}
          {currentStep === 2 && <CheckoutStep2 />}
          {currentStep === 3 && <CheckoutStep3 />}
        </div>
      </div>
    </div>
  )
}
