"use client"

import { useState } from "react"
import { useCheckout } from "@/lib/checkout-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Store, Home, ArrowRight, ArrowLeft, Clock, MapPin } from "lucide-react"

export function CheckoutStep2() {
  const {
    deliveryMethod,
    setDeliveryMethod,
    customerInfo,
    setCustomerInfo,
    nextStep,
    previousStep,
    getDeliveryFee,
  } = useCheckout()

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: string, value: string) => {
    setCustomerInfo({ ...customerInfo, [field]: value })
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!customerInfo.name.trim()) {
      newErrors.name = "Le nom est requis"
    }
    if (!customerInfo.phone.trim()) {
      newErrors.phone = "Le téléphone est requis"
    }
    if (!customerInfo.email?.trim()) {
      newErrors.email = "L'email est requis"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email)) {
      newErrors.email = "Email invalide"
    }

    if (deliveryMethod === "farm") {
      // Pour retrait à la ferme, pas besoin d'adresse détaillée
      if (!customerInfo.address.trim()) {
        customerInfo.address = "Retrait à la ferme" // Adresse par défaut
      }
    } else {
      // Pour livraison à domicile, adresse complète requise
      if (!customerInfo.address.trim()) {
        newErrors.address = "L'adresse de livraison est requise"
      }
      if (!customerInfo.city?.trim()) {
        newErrors.city = "La ville est requise"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleContinue = () => {
    if (validateForm()) {
      nextStep()
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Informations de livraison</h2>

      {/* Delivery Method Selection */}
      <div className="mb-8">
        <Label className="text-base font-semibold mb-3 block">Mode de livraison</Label>
        <div className="grid md:grid-cols-2 gap-4">
          {/* Farm Pickup */}
          <button
            onClick={() => setDeliveryMethod("farm")}
            className={`p-6 rounded-lg border-2 transition-all text-left ${deliveryMethod === "farm"
              ? "border-primary bg-primary/5"
              : "border-gray-200 hover:border-primary/50"
              }`}
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-full ${deliveryMethod === "farm" ? "bg-primary/10" : "bg-gray-100"
                }`}>
                <Store className={`w-6 h-6 ${deliveryMethod === "farm" ? "text-primary" : "text-gray-600"
                  }`} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1">Retrait à la ferme</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Venez récupérer votre commande directement
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>Disponible sous 24h</span>
                </div>
                <div className="mt-2">
                  <span className="text-lg font-bold text-primary">Gratuit</span>
                </div>
              </div>
            </div>
          </button>

          {/* Home Delivery */}
          <button
            onClick={() => setDeliveryMethod("home")}
            className={`p-6 rounded-lg border-2 transition-all text-left ${deliveryMethod === "home"
              ? "border-primary bg-primary/5"
              : "border-gray-200 hover:border-primary/50"
              }`}
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-full ${deliveryMethod === "home" ? "bg-primary/10" : "bg-gray-100"
                }`}>
                <Home className={`w-6 h-6 ${deliveryMethod === "home" ? "text-primary" : "text-gray-600"
                  }`} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1">Livraison à domicile</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Recevez votre commande chez vous
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>Livraison sous 1-2 jours</span>
                </div>
                <div className="mt-2">
                  <span className="text-lg font-bold text-primary">
                    {getDeliveryFee().toLocaleString('fr-FR')} FCFA
                  </span>
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Customer Information Form */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Vos coordonnées</h3>

        {/* Name */}
        <div>
          <Label htmlFor="name">Nom complet *</Label>
          <Input
            id="name"
            value={customerInfo.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="Votre nom complet"
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Phone */}
        <div>
          <Label htmlFor="phone">Téléphone *</Label>
          <Input
            id="phone"
            type="tel"
            value={customerInfo.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            placeholder="+229 XX XX XX XX"
            className={errors.phone ? "border-red-500" : ""}
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={customerInfo.email || ""}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder="votre.email@exemple.com"
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          <p className="text-xs text-muted-foreground mt-1">Nécessaire pour le suivi de votre commande</p>
        </div>

        {/* Address - Only for home delivery */}
        {deliveryMethod === "home" && (
          <>
            <div>
              <Label htmlFor="address">Adresse de livraison *</Label>
              <Input
                id="address"
                value={customerInfo.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="Numéro et nom de rue"
                className={errors.address ? "border-red-500" : ""}
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
            </div>

            {/* City and Postal Code */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">Ville *</Label>
                <Select
                  value={customerInfo.city}
                  onValueChange={(value) => handleInputChange("city", value)}
                >
                  <SelectTrigger className={errors.city ? "border-red-500" : ""}>
                    <SelectValue placeholder="Sélectionnez une ville" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Calavi">Calavi</SelectItem>
                    <SelectItem value="Cotonou">Cotonou</SelectItem>
                    <SelectItem value="Akassato">Akassato</SelectItem>
                    <SelectItem value="Godomey">Godomey</SelectItem>
                    <SelectItem value="Sèmè-Kpodji">Sèmè-Kpodji</SelectItem>
                  </SelectContent>
                </Select>
                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
              </div>
              <div>
                <Label htmlFor="postalCode">Code postal</Label>
                <Input
                  id="postalCode"
                  value={customerInfo.postalCode}
                  onChange={(e) => handleInputChange("postalCode", e.target.value)}
                  placeholder="Code postal"
                />
              </div>
            </div>
          </>
        )}

        {/* Farm Address Info - Only for farm pickup */}
        {deliveryMethod === "farm" && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-green-900 mb-1">Adresse de la ferme</h4>
                <p className="text-sm text-green-700">
                  Ferme AgroEcologique ASSIKO<br />
                  Sis à Calavi, Bénin
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Additional Notes */}
        <div>
          <Label htmlFor="notes">Notes supplémentaires (optionnel)</Label>
          <Textarea
            id="notes"
            value={customerInfo.additionalNotes}
            onChange={(e) => handleInputChange("additionalNotes", e.target.value)}
            placeholder="Informations supplémentaires pour votre commande"
            rows={5}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-8 pt-6 border-t">
        <Button variant="outline" onClick={previousStep} className="flex-1">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Retour
        </Button>
        <Button onClick={handleContinue} className="flex-1 bg-primary hover:bg-primary/90">
          Continuer
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  )
}
