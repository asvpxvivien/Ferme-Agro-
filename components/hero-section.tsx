"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

const heroImages = [
  "/Photo de la ferme/Poulailler Vue de Face 1.jpg",
  "/Photo de la ferme/Legumes 1.jpg",
  "/Photo de la ferme/Lapin 1.jpg",
  "/Photo de la ferme/Poule 1.jpg",
  "/Photo de la ferme/Legumes 3.jpg",
  "/Photo de la ferme/Poulailler Vue de Face 2.jpg",
  "/Photo de la ferme/Legumes 5.jpg",
  "/Photo de la ferme/Lapin 2.jpg",
]

export function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Carousel défilant horizontalement */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="flex h-full"
          animate={{
            x: [0, -3200], // Défile de 3200px (8 images * 400px)
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {/* Dupliquer les images pour un défilement infini */}
          {[...heroImages, ...heroImages].map((image, index) => (
            <div key={index} className="relative h-full w-[400px] flex-shrink-0">
              <Image
                src={image}
                alt={`Ferme ASSIKO ${index + 1}`}
                fill
                className="object-cover"
                priority={index < 4}
                quality={90}
              />
            </div>
          ))}
        </motion.div>
        {/* Overlay avec dégradé pour meilleure lisibilité */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
      </div>

      {/* Contenu */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 z-10 text-center">
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
            className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight px-2"
            style={{
              textShadow: "0 0 30px rgba(0,0,0,0.9), 0 4px 15px rgba(0,0,0,0.8), 0 2px 6px rgba(0,0,0,0.6)"
            }}
          >
            Bienvenue à la <span className="text-primary">Ferme ASSIKO</span>
            <br className="hidden sm:block" />
            <span className="block sm:inline text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-secondary mt-2 sm:mt-0">Agriculture Écologique & Naturelle</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1.2,
              delay: 0.4,
              ease: "easeOut",
              scale: {
                type: "spring",
                stiffness: 100,
                damping: 10
              }
            }}
            className="text-lg sm:text-lg md:text-xl text-white mb-6 md:mb-10 leading-relaxed max-w-3xl mx-auto px-4"
            style={{
              textShadow: "0 0 20px rgba(0,0,0,0.9), 0 2px 8px rgba(0,0,0,0.8), 0 1px 3px rgba(0,0,0,0.6)"
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
            className="flex justify-center"
          >
            <Link href="/catalogue">
              <Button size="lg" className="text-lg px-8 py-6 group bg-primary hover:bg-primary/90 shadow-2xl rounded-xl relative overflow-hidden">
                Découvrir nos produits
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-all duration-300 animate-bounce" aria-hidden="true" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
