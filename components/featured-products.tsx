"use client"

import { motion } from "framer-motion"
import { ProductCard } from "./product-card"
import { products } from "@/lib/products-data"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function FeaturedProducts() {
  const featuredProducts = products.slice(0, 6)

  return (
    <section id="products" className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Nos Produits <span className="text-primary">Vedettes</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez une sélection de nos meilleurs produits, cultivés et élevés avec soin dans notre ferme.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Link href="/catalogue">
            <Button size="lg" className="group bg-gradient-to-r from-primary to-green-600 hover:from-primary/90 hover:to-green-600/90 shadow-2xl rounded-xl text-sm sm:text-xl px-12 py-9">
              Voir tout le catalogue
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-all duration-300" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}