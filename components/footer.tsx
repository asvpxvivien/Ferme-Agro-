import Link from "next/link"
import { Leaf, Facebook, Instagram, Clock } from "lucide-react"

// Icône TikTok personnalisée en SVG
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 text-gray-800">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {/* Logo et Description */}
          <div className="space-y-3 md:space-y-4 flex flex-col items-center text-center">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-primary to-green-600 rounded-xl p-2 shadow-md">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold">
                <span className="text-gray-800">ASS</span><span className="text-primary">IKO</span>
              </span>
            </div>
            <p className="text-gray-700 leading-relaxed text-sm hidden md:block">
              Ferme AgroEcologique ASSIKO - Une agriculture authentique,<br /> naturelle avec des produits de qualités.
            </p>
            <p className="text-gray-700 leading-relaxed text-sm md:hidden">
              Agriculture naturelle, écologique et 100% bio.
            </p>
            <div className="flex gap-3 justify-center">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white shadow-sm hover:shadow-md hover:bg-primary hover:text-white hover:scale-110 flex items-center justify-center transition-all duration-200"
                aria-label="Suivez-nous sur Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white shadow-sm hover:shadow-md hover:bg-primary hover:text-white hover:scale-110 flex items-center justify-center transition-all duration-200"
                aria-label="Suivez-nous sur Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white shadow-sm hover:shadow-md hover:bg-primary hover:text-white hover:scale-110 flex items-center justify-center transition-all duration-200"
                aria-label="Suivez-nous sur TikTok"
              >
                <TikTokIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Horaires */}
          <div className="flex flex-col items-center text-center">
            <h3 className="font-bold text-base md:text-lg mb-3 md:mb-4 text-gray-900">Horaires</h3>
            {/* Desktop version - vertical */}
            <div className="hidden md:flex items-start gap-2">
              <Clock className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
              <div className="text-gray-700 text-sm">
                <p className="font-semibold text-gray-900">Lun - Sam</p>
                <p className="mb-2">8h00 - 19h00</p>
                <p className="font-semibold text-gray-900">Dimanche</p>
                <p>9h00 - 13h00</p>
              </div>
            </div>
            {/* Mobile version - single line */}
            <div className="flex md:hidden items-center justify-center gap-2 text-gray-700 text-sm flex-wrap">
              <span className="font-semibold text-gray-900">Lun-Sam 8h-19h</span>
              <span>•</span>
              <span className="font-semibold text-gray-900">Dim 9h-13h</span>
            </div>
          </div>
        </div>

        <div className="border-t border-amber-200 mt-6 md:mt-10 pt-4 md:pt-6">
          <div className="text-center text-gray-600 text-xs md:text-sm">
            <p>© 2025 Ferme AgroEcologique ASSIKO. Tous droits réservés.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
