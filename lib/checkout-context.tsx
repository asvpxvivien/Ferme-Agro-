"use client"

import { createContext, useContext, useState, ReactNode } from "react"
import type { CartItem } from "./cart-context"

export type DeliveryMethod = "farm" | "home"

export interface CustomerInfo {
  name: string
  phone: string
  address: string
  city?: string
  postalCode?: string
  additionalNotes?: string
}

export interface CheckoutData {
  deliveryMethod: DeliveryMethod
  customerInfo: CustomerInfo
  items: CartItem[]
}

interface CheckoutContextType {
  currentStep: number
  deliveryMethod: DeliveryMethod
  customerInfo: CustomerInfo
  checkoutItems: CartItem[]
  setCurrentStep: (step: number) => void
  setDeliveryMethod: (method: DeliveryMethod) => void
  setCustomerInfo: (info: CustomerInfo) => void
  setCheckoutItems: (items: CartItem[]) => void
  nextStep: () => void
  previousStep: () => void
  resetCheckout: () => void
  getDeliveryFee: () => number
  getTotalWithDelivery: () => number
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined)

const DELIVERY_FEE = 1000 // 1000 FCFA pour livraison à domicile

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>("farm")
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([])
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    additionalNotes: "",
  })

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const resetCheckout = () => {
    setCurrentStep(1)
    setDeliveryMethod("farm")
    setCustomerInfo({
      name: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      additionalNotes: "",
    })
  }

  const getDeliveryFee = () => {
    return deliveryMethod === "home" ? DELIVERY_FEE : 0
  }

  const getTotalWithDelivery = () => {
    const itemsTotal = checkoutItems.reduce((sum, item) => {
      const price = item.purchaseType === "gros"
        ? item.price * 0.85
        : item.price
      return sum + (price * item.quantity)
    }, 0)
    return itemsTotal + getDeliveryFee()
  }

  return (
    <CheckoutContext.Provider
      value={{
        currentStep,
        deliveryMethod,
        customerInfo,
        checkoutItems,
        setCurrentStep,
        setDeliveryMethod,
        setCustomerInfo,
        setCheckoutItems,
        nextStep,
        previousStep,
        resetCheckout,
        getDeliveryFee,
        getTotalWithDelivery,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  )
}

export function useCheckout() {
  const context = useContext(CheckoutContext)
  if (context === undefined) {
    throw new Error("useCheckout must be used within a CheckoutProvider")
  }
  return context
}
