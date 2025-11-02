import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-foreground mb-4">Produit introuvable</h2>
        <p className="text-muted-foreground mb-8">Le produit que vous recherchez n'existe pas ou a été supprimé.</p>
        <Link href="/catalogue">
          <Button size="lg">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour au catalogue
          </Button>
        </Link>
      </div>
    </div>
  )
}
