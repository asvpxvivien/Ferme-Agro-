"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, Mail, MessageCircle, Send, CheckCircle2 } from "lucide-react"
import { categories } from "@/lib/products-data"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    product: "",
    subject: "",
    message: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const contactMethods = [
    {
      icon: Phone,
      title: "Téléphone",
      href: "tel:+22997446230",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      href: "https://wa.me/22997446230",
    },
    {
      icon: Mail,
      title: "Email",
      href: "mailto:fermeassiko@gmail.com",
    },
  ]

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Le nom est requis"
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email invalide"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Le téléphone est requis"
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Le sujet est requis"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Le message est requis"
    } else if (formData.message.length < 10) {
      newErrors.message = "Le message doit contenir au moins 10 caractères"
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

    try {
      // Envoyer le message à l'API
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de l'envoi du message")
      }

      // Success
      setIsSuccess(true)
      setFormData({
        name: "",
        email: "",
        phone: "",
        product: "",
        subject: "",
        message: "",
      })

      // Réinitialiser après 5 secondes
      setTimeout(() => {
        setIsSuccess(false)
      }, 5000)
    } catch (error) {
      console.error("Erreur lors de l'envoi du message:", error)
      alert("Une erreur est survenue lors de l'envoi de votre message. Veuillez réessayer.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* En-tête */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Contactez-<span className="text-primary">nous</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Une question ? Besoin d'informations ? <br /> Nous sommes là pour vous répondre !
            </p>
          </motion.div>

          {/* Formulaire centré */}
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="border-2">
                <CardContent className="p-8">
                  {isSuccess ? (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-center py-12"
                    >
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-12 h-12 text-green-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">
                        Message envoyé !
                      </h3>
                      <p className="text-muted-foreground">
                        Nous vous répondrons dans les plus brefs délais.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Nom */}
                        <div>
                          <Label htmlFor="name">Nom complet *</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Votre nom"
                            className={`h-12 ${errors.name ? "border-red-500" : ""}`}
                          />
                          {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                          )}
                        </div>

                        {/* Email */}
                        <div>
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="votre@email.com"
                            className={`h-12 ${errors.email ? "border-red-500" : ""}`}
                          />
                          {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Téléphone */}
                        <div>
                          <Label htmlFor="phone">Téléphone *</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+229 XX XX XX XX"
                            className={`h-12 ${errors.phone ? "border-red-500" : ""}`}
                          />
                          {errors.phone && (
                            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                          )}
                        </div>

                        {/* Produit */}
                        <div>
                          <Label htmlFor="product">Produit concerné</Label>
                          <Select
                            value={formData.product}
                            onValueChange={(value) =>
                              setFormData((prev) => ({ ...prev, product: value }))
                            }
                          >
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder="Sélectionner un produit" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.filter(cat => cat !== "Tous").map((category) => (
                                <SelectItem key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Sujet */}
                      <div>
                        <Label htmlFor="subject">Sujet *</Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="L'objet de votre message"
                          className={`h-12 ${errors.subject ? "border-red-500" : ""}`}
                        />
                        {errors.subject && (
                          <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                        )}
                      </div>

                      {/* Message */}
                      <div>
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Votre message..."
                          rows={10}
                          className={errors.message ? "border-red-500" : ""}
                        />
                        {errors.message && (
                          <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                        )}
                      </div>

                      {/* Bouton Submit */}
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-green-600 hover:from-primary/90 hover:to-green-600/90 rounded-xl shadow-lg"
                      >
                        {isSubmitting ? (
                          "Envoi en cours..."
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" />
                            Envoyer le message
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Icônes de contact en bas */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-12 flex justify-center gap-8"
            >
              {contactMethods.map((method, index) => (
                <a
                  key={index}
                  href={method.href}
                  target={method.title === "WhatsApp" ? "_blank" : undefined}
                  rel={method.title === "WhatsApp" ? "noopener noreferrer" : undefined}
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-green-600 flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg">
                    <method.icon className="w-8 h-8 text-white" />
                  </div>
                  <p className="font-semibold text-foreground text-sm">{method.title}</p>
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
