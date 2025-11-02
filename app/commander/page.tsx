"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCart, MapPin, Phone, User, CheckCircle } from "lucide-react"
import Link from "next/link"

const DELIVERY_FEES = {
  cotonou: { name: "Cotonou", fee: 1000 },
  porto_novo: { name: "Porto-Novo", fee: 1500 },
  calavi: { name: "Calavi", fee: 1200 },
  abomey_calavi: { name: "Abomey-Calavi", fee: 1200 },
  other: { name: "Autres zones", fee: 2000 },
}

const FREE_DELIVERY_THRESHOLD = 25000 // FCFA

export default function CommanderPage() {
  const { cart, clearCart } = useCart()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "cotonou",
    neighborhood: "",
    address: "",
    landmark: "",
    deliverySlot: "morning",
    notes: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getDeliveryFee = () => {
    const total = getTotalPrice()
    if (total >= FREE_DELIVERY_THRESHOLD) return 0
    return DELIVERY_FEES[formData.city as keyof typeof DELIVERY_FEES]?.fee || 0
  }

  const getFinalTotal = () => {
    return getTotalPrice() + getDeliveryFee()
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Le nom complet est requis"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Le numéro de téléphone est requis"
    } else if (!/^(\+229)?[0-9]{8}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Numéro de téléphone invalide (format: +229 XX XX XX XX)"
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Adresse email invalide"
    }

    if (!formData.neighborhood.trim()) {
      newErrors.neighborhood = "Le quartier est requis"
    }

    if (!formData.address.trim()) {
      newErrors.address = "L'adresse détaillée est requise"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Simuler l'envoi de la commande
    setTimeout(() => {
      setOrderSuccess(true)
      setIsSubmitting(false)
      clearCart()

      // Rediriger après 3 secondes
      setTimeout(() => {
        router.push("/")
      }, 3000)
    }, 1500)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Effacer l'erreur du champ modifié
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  if (cart.length === 0 && !orderSuccess) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/10">
        <Header />
        <main className="flex-1 pt-16">
          <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-foreground mb-4">Votre panier est vide</h1>
              <p className="text-muted-foreground mb-8">
                Ajoutez des produits à votre panier avant de passer commande.
              </p>
              <Link href="/catalogue">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Découvrir nos produits
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (orderSuccess) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/10">
        <Header />
        <main className="flex-1 pt-16">
          <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center max-w-2xl mx-auto"
            >
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-primary" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Commande confirmée !
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Merci pour votre commande ! Nous vous contacterons très prochainement pour confirmer la livraison.
              </p>
              <div className="bg-background rounded-xl border border-border p-6 mb-8">
                <p className="text-sm text-muted-foreground mb-2">Montant total</p>
                <p className="text-3xl font-bold text-primary">{getFinalTotal().toLocaleString('fr-FR')} FCFA</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Redirection vers la page d'accueil...
              </p>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50/30 to-white">
      <Header />
      <main className="flex-1 pt-32 pb-16">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center"
          >
            Finaliser la <span className="text-primary">Commande</span>
          </motion.h1>

          <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
            {/* Formulaire */}
            <div className="lg:col-span-2 space-y-8">
              {/* Informations personnelles */}
              <Card className="shadow-xl rounded-3xl border-2 border-gray-100">
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-green-600 flex items-center justify-center shadow-lg">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    Informations personnelles
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 p-8 pt-0">
                  <div>
                    <Label htmlFor="fullName" className="text-base font-semibold text-gray-700">Nom complet *</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Votre nom complet"
                      className={`mt-2 h-12 rounded-xl border-2 ${errors.fullName ? "border-red-300" : "border-gray-200"} focus:border-primary`}
                    />
                    {errors.fullName && (
                      <p className="text-sm text-red-500 mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Téléphone *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+229 XX XX XX XX"
                        className={errors.phone ? "border-destructive" : ""}
                      />
                      {errors.phone && (
                        <p className="text-sm text-destructive mt-1">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="email">Email (optionnel)</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="votre@email.com"
                        className={errors.email ? "border-destructive" : ""}
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Adresse de livraison */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    Adresse de livraison
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="city">Ville / Commune *</Label>
                    <select
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <option value="cotonou">Cotonou ({DELIVERY_FEES.cotonou.fee.toLocaleString()} FCFA)</option>
                      <option value="porto_novo">Porto-Novo ({DELIVERY_FEES.porto_novo.fee.toLocaleString()} FCFA)</option>
                      <option value="calavi">Calavi ({DELIVERY_FEES.calavi.fee.toLocaleString()} FCFA)</option>
                      <option value="abomey_calavi">Abomey-Calavi ({DELIVERY_FEES.abomey_calavi.fee.toLocaleString()} FCFA)</option>
                      <option value="other">Autres zones ({DELIVERY_FEES.other.fee.toLocaleString()} FCFA)</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="neighborhood">Quartier *</Label>
                    <Input
                      id="neighborhood"
                      name="neighborhood"
                      value={formData.neighborhood}
                      onChange={handleChange}
                      placeholder="Nom du quartier"
                      className={errors.neighborhood ? "border-destructive" : ""}
                    />
                    {errors.neighborhood && (
                      <p className="text-sm text-destructive mt-1">{errors.neighborhood}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="address">Adresse détaillée *</Label>
                    <Textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Numéro de maison, nom de la rue..."
                      rows={3}
                      className={errors.address ? "border-destructive" : ""}
                    />
                    {errors.address && (
                      <p className="text-sm text-destructive mt-1">{errors.address}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="landmark">Point de repère (optionnel)</Label>
                    <Input
                      id="landmark"
                      name="landmark"
                      value={formData.landmark}
                      onChange={handleChange}
                      placeholder="Ex: Près de la pharmacie..."
                    />
                  </div>

                  <div>
                    <Label htmlFor="deliverySlot">Horaire de livraison préféré</Label>
                    <select
                      id="deliverySlot"
                      name="deliverySlot"
                      value={formData.deliverySlot}
                      onChange={handleChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <option value="morning">Matin (8h - 12h)</option>
                      <option value="afternoon">Après-midi (14h - 18h)</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="notes">Instructions spéciales (optionnel)</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Informations complémentaires pour la livraison..."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Récapitulatif */}
            <div>
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Récapitulatif de la commande</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Articles */}
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <div className="flex-1">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-muted-foreground">
                            {item.quantity} x {item.price.toLocaleString('fr-FR')} FCFA
                          </p>
                        </div>
                        <p className="font-medium">
                          {(item.price * item.quantity).toLocaleString('fr-FR')} FCFA
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Sous-total</span>
                      <span className="font-medium">{getTotalPrice().toLocaleString('fr-FR')} FCFA</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Frais de livraison</span>
                      <span className="font-medium">
                        {getDeliveryFee() === 0 ? (
                          <span className="text-primary">Gratuit</span>
                        ) : (
                          `${getDeliveryFee().toLocaleString('fr-FR')} FCFA`
                        )}
                      </span>
                    </div>
                    {getTotalPrice() >= FREE_DELIVERY_THRESHOLD && (
                      <p className="text-xs text-primary">
                        Livraison gratuite à partir de {FREE_DELIVERY_THRESHOLD.toLocaleString('fr-FR')} FCFA
                      </p>
                    )}
                  </div>

                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold">Total</span>
                      <span className="text-2xl font-bold text-primary">
                        {getFinalTotal().toLocaleString('fr-FR')} FCFA
                      </span>
                    </div>
                  </div>

                  <div className="bg-secondary/30 rounded-lg p-4 text-sm">
                    <p className="font-medium mb-2">Mode de paiement</p>
                    <p className="text-muted-foreground">
                      Paiement à la livraison (espèces ou mobile money)
                    </p>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Envoi en cours..." : "Confirmer la commande"}
                  </Button>

                  <Link href="/panier">
                    <Button variant="outline" className="w-full" type="button">
                      Retour au panier
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  )
}
