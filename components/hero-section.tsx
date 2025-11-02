"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState, useEffect } from "react"
import Image from "next/image"

const heroImages = [
  {
    url: "/photo de la ferme/Poulailler Vue de Face 1.jpg",
    title: "Notre Poulailler Familial",
  },
  {
    url: "/photo de la ferme/Legumes 1.jpg",
    title: "Légumes Frais du Potager",
  },
  {
    url: "/photo de la ferme/Lapin 1.jpg",
    title: "Élevage de Lapins Naturels",
  },
  {
    url: "/photo de la ferme/Poule 1.jpg",
    title: "Poulets Élevés en Plein Air",
  },
  {
    url: "/photo de la ferme/Legumes 3.jpg",
    title: "Production Maraîchère Bio",
  },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000) // Change toutes les 5 secondes
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative h-[85vh] sm:h-[90vh] lg:h-[95vh] flex items-center justify-center overflow-hidden bg-black">
      {/* Carousel avec effet de fade */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={heroImages[currentSlide].url}
              alt={heroImages[currentSlide].title}
              fill
              className="object-cover"
              priority={currentSlide === 0}
              quality={90}
            />
            {/* Overlay avec dégradé pour meilleure lisibilité */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Indicateurs de slides */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-2" role="tablist" aria-label="Navigation du carrousel">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 rounded-full transition-all ${
              index === currentSlide ? "w-12 bg-white shadow-lg" : "w-1.5 bg-white/60 hover:bg-white/80"
            }`}
            aria-label={`Aller à l'image ${index + 1} : ${heroImages[index].title}`}
            aria-current={index === currentSlide ? "true" : "false"}
            role="tab"
          />
        ))}
      </div>

      {/* Contenu */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          {/* Titre */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            style={{
              textShadow:
                "0 0 30px rgba(0,0,0,0.9), 0 4px 15px rgba(0,0,0,0.8), 0 2px 6px rgba(0,0,0,0.6)",
            }}
          >
            Bienvenue chez <span className="text-primary">AgroFresh</span>
            <br />
            <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-secondary">Du Champ à Votre Table</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-lg sm:text-xl md:text-2xl text-white mb-10 leading-relaxed max-w-3xl mx-auto"
            style={{
              textShadow:
                "0 0 20px rgba(0,0,0,0.9), 0 2px 8px rgba(0,0,0,0.8), 0 1px 3px rgba(0,0,0,0.6)",
            }}
          >
            Découvrez nos produits frais et authentiques, cultivés avec passion et respect de la nature.
            Une ferme familiale au service de votre bien-être.
          </motion.p>

          {/* Boutons CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/catalogue">
              <Button size="lg" className="text-lg px-8 py-6 group bg-primary hover:bg-primary/90 shadow-2xl rounded-xl">
                Découvrir nos produits
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Button>
            </Link>
            <Link href="/#about">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 bg-white/95 backdrop-blur-sm hover:bg-white border-2 border-white text-gray-900 hover:text-gray-900 shadow-2xl rounded-xl"
              >
                Notre histoire
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
