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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/10">
      <Header />
      <main className="flex-1 pt-16">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
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
                    {cart.map((item) => (
                      <div key={item.id} className="p-6 flex flex-col sm:flex-row gap-6">
                        <div className="relative w-full sm:w-24 h-24 rounded-lg overflow-hidden bg-secondary/10 flex-shrink-0">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                            <div>
                              <h3 className="font-bold text-foreground mb-1">{item.name}</h3>
                              <p className="text-sm text-muted-foreground mb-2">{item.category}</p>
                              <p className="text-primary font-bold">{item.price.toLocaleString('fr-FR')} FCFA</p>
                            </div>
                            
                            <div className="flex flex-col sm:items-end gap-4">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFromCart(item.id)}
                                className="text-muted-foreground hover:text-destructive p-0 h-auto"
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
                <div className="bg-background rounded-xl border border-border shadow-sm p-6 sticky top-24">
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

                  <Link href="/commander">
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
                  <div className="mt-8">
                    <h3 className="font-bold text-foreground mb-4">Vous aimerez aussi</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {recommendedProducts.map((product, index) => (
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