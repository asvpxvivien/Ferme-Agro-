"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Wheat, Sprout, Rabbit, Award } from "lucide-react"

const values = [
  {
    icon: Wheat,
    title: "Passion",
    description: "Une passion sincère pour la nature, le sol et le bien-être animal, au cœur de chaque récolte.",
  },
  {
    icon: Sprout,
    title: "Naturel",
    description: "Des pratiques agricoles respectueuses, sans pesticides ni intrants chimiques, pour des légumes frais et bio.",
  },
  {
    icon: Rabbit,
    title: "Respect",
    description: "Nous cultivons et élevons dans le respect de la nature, en prenant soin de la terre, des plantes et des animaux pour vous offrir des produits sains et authentiques.",
  },
  {
    icon: Award,
    title: "Qualité",
    description: "Des produits sains, authentiques et savoureux, issus d’un mode de production éthique et respectueux de l’environnement.",
  },
]

export function AboutSection() {
  return (
    <section id="about" className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Notre Ferme <span className="text-primary">AgroEcologique</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ici, chaque plante et chaque animal grandit en équilibre avec la nature, donnant des produits pleins de saveur et de vivalité.
          </p>
        </motion.div>

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
                    src="/Photo de la ferme/Poule 1.jpg"
                    alt="Poulet"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="relative h-48 rounded-2xl overflow-hidden">
                  <Image
                    src="/Photo de la ferme/oeufs.jpg"
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
                    src="/Photo de la ferme/Legumes 1.jpg"
                    alt="Légumes"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="relative h-64 rounded-2xl overflow-hidden">
                  <Image
                    src="/Photo de la ferme/Poulailler Vue de Face 1.jpg"
                    alt="Poulailler"
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
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className="absolute -bottom-6 -right-6 bg-green-600 text-white rounded-2xl p-6 shadow-xl flex flex-col items-center"
            >
              <div className="text-4xl font-bold">100%</div>
              <div className="text-sm font-semibold">Bio</div>
            </motion.div>
          </motion.div>

          {/* Contenu */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-center mt-8 md:mt-0">
              Agriculture Naturelle
              <br />
              <span className="text-primary">& Locale</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              A la ferme ASSIKO Chaque culture et chaque élevage est réalisé dans le respect de la nature et du bien-être animal. Les produits sont cultivés et élevés de manière responsable pour conserver toute leur qualité et leur saveur.
            </p>
            <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
              Chaque produit que nous proposons est sain, naturel et authentique, pensé pour vous offrir le meilleur de la ferme directement à votre table. Notre engagement : vous offrir le meilleur de la nature, directement du
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