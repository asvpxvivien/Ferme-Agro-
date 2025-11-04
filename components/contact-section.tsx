"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-white to-green-50/30">
      <div className="container mx-auto px-6 sm:px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Contactez-<span className="text-primary">nous</span>
          </h2>
          <p className="text-lg md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10">
            Une question sur nos produits ? Besoin d'informations ?<br className="hidden sm:block" />Nous sommes là pour vous répondre !
          </p>
          <div className="flex justify-center px-4">
            <Link href="/contact" className="w-full sm:w-auto max-w-md sm:max-w-none">
              <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-primary to-green-600 hover:from-primary/90 hover:to-green-600/90 shadow-2xl rounded-xl text-sm sm:text-xl px-4 sm:px-12 py-8 sm:py-9 group relative overflow-hidden whitespace-normal sm:whitespace-nowrap leading-tight">
                Accéder au formulaire de contact
                <ArrowRight className="ml-2 sm:ml-3 w-4 h-4 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-all duration-300 flex-shrink-0" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
