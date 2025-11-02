"use client"

import { motion } from "framer-motion"
import { Phone, Mail, MessageCircle, MapPin, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

const contactMethods = [
  {
    icon: Phone,
    title: "Téléphone",
    value: "+229 XX XX XX XX",
    href: "tel:+229XXXXXXXX",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "Discuter maintenant",
    href: "https://wa.me/229XXXXXXXX",
    color: "bg-green-500/10 text-green-600",
  },
  {
    icon: Mail,
    title: "Email",
    value: "contact@agrofresh.bj",
    href: "mailto:contact@agrofresh.bj",
    color: "bg-accent/10 text-accent",
  },
]

export function ContactSection() {
  return (
    <section id="contact" className="py-16 bg-gradient-to-b from-white to-green-50/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Contactez-<span className="text-primary">nous</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Une question sur nos produits ? Besoin d'informations ? Notre équipe est là pour vous répondre !
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-gradient-to-r from-primary to-green-600 hover:from-primary/90 hover:to-green-600/90 shadow-xl rounded-xl text-lg px-8 py-6 group">
              Accéder au formulaire de contact
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-xl transition-all duration-300 h-full border-border">
                <CardContent className="p-6 text-center">
                  <div
                    className={`${method.color} w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <method.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{method.title}</h3>
                  <p className="text-muted-foreground mb-4 text-sm">{method.value}</p>
                  <a href={method.href} target="_blank" rel="noopener noreferrer">
                    <Button className="w-full text-sm" variant="outline">
                      Contacter
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Informations supplémentaires */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-6"
        >
          <Card className="border-border">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 rounded-xl p-3">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">Notre adresse</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    Ferme Familiale AgroFresh
                    <br />
                    Cotonou, Bénin
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-accent/10 rounded-xl p-3">
                  <Clock className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">Horaires d'ouverture</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    Lundi - Samedi : 8h - 19h
                    <br />
                    Dimanche : 9h - 13h
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}