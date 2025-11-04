"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Minus, Plus, X, ShoppingCart as CartIcon } from "lucide-react"
import { ProductCard } from "@/components/product-card"
import { products } from "@/lib/products-data"
import Link from "next/link"

export default function PanierPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart()

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  // Produits recommandés (4 premiers produits qui ne sont pas dans le panier)
  const recommendedProducts = products
    .filter(product => !cart.some(item => item.id === product.id))
    .slice(0, 4)

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pt-20 pb-8">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl md:text-4xl text-center font-bold text-foreground mb-8">
            Votre <span className="text-primary">Panier</span>
          </h1>

          {cart.length === 0 ? (
            <div className="text-center py-16">
              <CartIcon className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-foreground mb-4">Votre panier est vide</h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Vous n'avez pas encore ajouté de produits à votre panier. Découvrez nos délicieux produits frais !
              </p>
              <Link href="/catalogue">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Découvrir nos produits
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-background rounded-xl border border-border shadow-sm">
                  <div className="p-6 border-b border-border">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-bold text-foreground">
                        Articles ({cart.reduce((total, item) => total + item.quantity, 0)})
                      </h2>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={clearCart}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Vider le panier
                      </Button>
                    </div>
                  </div>

                  <div className="divide-y divide-border">
                    {cart.map((item, index) => (
                      <div key={`${item.id}-${item.purchaseType || 'detail'}-${index}`} className="p-4 flex flex-col sm:flex-row gap-4">
                        <div className="relative w-full sm:w-20 h-20 rounded-lg overflow-hidden bg-secondary/10 flex-shrink-0">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="object-cover w-full h-full"
                          />
                        </div>

                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                            <div className="flex-1">
                              <h3 className="font-bold text-foreground mb-1">{item.name}</h3>
                              <p className="text-sm text-muted-foreground mb-2">{item.category}</p>
                              <div className="flex flex-col gap-2">
                                <p className="text-primary font-bold">{item.price.toLocaleString('fr-FR')} FCFA / unité</p>
                                {/* Bouton supprimer sur mobile - sous le prix */}
                                <div className="sm:hidden">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-destructive border-destructive/30 hover:bg-destructive hover:text-white h-8 px-3"
                                  >
                                    <X className="w-3.5 h-3.5 mr-1.5" />
                                    <span className="text-xs font-medium">Supprimer</span>
                                  </Button>
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-row sm:flex-col items-center sm:items-end gap-4">
                              {/* Corbeille sur desktop - en haut à droite */}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFromCart(item.id)}
                                className="hidden sm:block text-muted-foreground hover:text-destructive p-0 h-auto"
                              >
                                <X className="w-4 h-4" />
                              </Button>

                              <div className="flex items-center gap-3">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                                  className="h-8 w-8"
                                >
                                  <Minus className="w-4 h-4" />
                                </Button>

                                <span className="font-medium w-8 text-center">{item.quantity}</span>

                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="h-8 w-8"
                                >
                                  <Plus className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>

                          <div className="mt-4 pt-4 border-t border-border">
                            <p className="font-bold text-foreground">
                              Total: {(item.price * item.quantity).toLocaleString('fr-FR')} FCFA
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-background rounded-xl border border-border shadow-sm p-6 lg:sticky lg:top-24 lg:self-start mb-8">
                  <h2 className="text-xl font-bold text-foreground mb-6">Récapitulatif</h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sous-total</span>
                      <span className="font-medium">{getTotalPrice().toLocaleString('fr-FR')} FCFA</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Livraison</span>
                      <span className="font-medium text-sm text-primary">À calculer</span>
                    </div>
                    <div className="flex justify-between pt-4 border-t border-border">
                      <span className="text-lg font-bold text-foreground">Total</span>
                      <span className="text-lg font-bold text-primary">{getTotalPrice().toLocaleString('fr-FR')} FCFA</span>
                    </div>
                  </div>

                  <Link href="/checkout">
                    <Button className="w-full bg-primary hover:bg-primary/90 mb-4">
                      Passer la commande
                    </Button>
                  </Link>

                  <Link href="/catalogue">
                    <Button variant="outline" className="w-full">
                      Continuer les achats
                    </Button>
                  </Link>
                </div>

                {recommendedProducts.length > 0 && (
                  <div className="relative">
                    <h3 className="font-bold text-foreground mb-4 text-center text-xl">
                      Vous aimerez <span className="text-primary">aussi</span>
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      {recommendedProducts.slice(0, 2).map((product, index) => (
                        <ProductCard key={product.id} product={product} index={index} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}