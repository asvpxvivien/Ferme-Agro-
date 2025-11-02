"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-white to-green-50/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Contactez-<span className="text-primary">nous</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10">
            Une question sur nos produits ? Besoin d'informations ?<br />Notre équipe est là pour vous répondre !
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-gradient-to-r from-primary to-green-600 hover:from-primary/90 hover:to-green-600/90 shadow-2xl rounded-xl text-xl px-10 py-7 group relative overflow-hidden">
              Accéder au formulaire de contact
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-all duration-300 animate-bounce" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
