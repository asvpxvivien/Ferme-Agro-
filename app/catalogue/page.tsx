"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { products } from "@/lib/products-data"
import { ProductCard } from "@/components/product-card"
import { categories } from "@/lib/products-data"
import { useState } from "react"

export default function CataloguePage() {
  const [selectedCategory, setSelectedCategory] = useState("Tous")

  const filteredProducts = selectedCategory === "Tous"
    ? products
    : products.filter(product => product.category === selectedCategory)

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 pt-20">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Notre <span className="text-primary">Catalogue</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Découvrez l'ensemble de nos produits frais et naturels, cultivés avec soins et disponible rien que pour vous.
            </p>
          </div>

          {/* Filtres par catégorie */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === category
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-secondary text-foreground hover:bg-secondary/80"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Liste des produits */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Aucun produit trouvé dans cette catégorie.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}