"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Heart, Sprout, Users, Award } from "lucide-react"

const values = [
  {
    icon: Heart,
    title: "Passion",
    description: "Un amour authentique pour la terre et nos animaux",
  },
  {
    icon: Sprout,
    title: "Naturel",
    description: "Des produits cultivés sans pesticides ni produits chimiques",
  },
  {
    icon: Users,
    title: "Familial",
    description: "Une exploitation transmise de génération en génération",
  },
  {
    icon: Award,
    title: "Qualité",
    description: "Un engagement pour l'excellence à chaque étape",
  },
]

export function AboutSection() {
  return (
    <section id="about" className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative h-64 rounded-2xl overflow-hidden">
                  <Image 
                    src="/farmer-with-vegetables.jpg" 
                    alt="Fermier" 
                    fill 
                    className="object-cover" 
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="relative h-48 rounded-2xl overflow-hidden">
                  <Image 
                    src="/fresh-farm-eggs.png" 
                    alt="Œufs frais" 
                    fill 
                    className="object-cover" 
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="relative h-48 rounded-2xl overflow-hidden">
                  <Image 
                    src="/organic-vegetables-garden.jpg" 
                    alt="Potager" 
                    fill 
                    className="object-cover" 
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="relative h-64 rounded-2xl overflow-hidden">
                  <Image 
                    src="/free-range-chickens.png" 
                    alt="Poules" 
                    fill 
                    className="object-cover" 
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
            {/* Badge flottant */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className="absolute -bottom-6 -right-6 bg-accent text-accent-foreground rounded-2xl p-6 shadow-xl"
            >
              <div className="text-4xl font-bold">25+</div>
              <div className="text-sm font-semibold">Ans d'expérience</div>
            </motion.div>
          </motion.div>

          {/* Contenu */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Une Ferme Familiale
              <br />
              <span className="text-primary">Depuis 1998</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Nichée au cœur de la campagne, notre ferme familiale perpétue une tradition agricole authentique. Nous
              cultivons nos terres avec respect et élevons nos animaux en plein air, dans le respect de leur bien-être.
            </p>
            <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
              Chaque produit que nous proposons est le fruit d'un travail passionné et d'un savoir-faire transmis de
              génération en génération. Notre engagement : vous offrir le meilleur de la nature, directement du
              producteur au consommateur.
            </p>

            {/* Valeurs */}
            <div className="grid sm:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
                  className="flex gap-4"
                >
                  <div className="bg-primary/10 rounded-xl p-3 h-fit">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">{value.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}