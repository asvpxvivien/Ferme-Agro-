import Link from "next/link"
import { Leaf, Mail, Phone, MapPin, Facebook, Instagram, Clock } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 text-gray-800">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo et Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-primary to-green-600 rounded-xl p-2 shadow-md">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">
                <span className="text-gray-900">Agro</span>
                <span className="text-primary">Fresh</span>
              </span>
            </div>
            <p className="text-gray-700 leading-relaxed text-sm">
              Une ferme familiale engagée dans une agriculture authentique, naturelle et respectueuse de l'environnement.
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white shadow-sm hover:shadow-md hover:bg-primary hover:text-white flex items-center justify-center transition-all"
                aria-label="Suivez-nous sur Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white shadow-sm hover:shadow-md hover:bg-primary hover:text-white flex items-center justify-center transition-all"
                aria-label="Suivez-nous sur Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-gray-900">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-700 hover:text-primary transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-0 h-0.5 bg-primary group-hover:w-3 transition-all rounded-full"></span>
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/#about" className="text-gray-700 hover:text-primary transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-0 h-0.5 bg-primary group-hover:w-3 transition-all rounded-full"></span>
                  Notre Ferme
                </Link>
              </li>
              <li>
                <Link href="/catalogue" className="text-gray-700 hover:text-primary transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-0 h-0.5 bg-primary group-hover:w-3 transition-all rounded-full"></span>
                  Catalogue
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-700 hover:text-primary transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-0 h-0.5 bg-primary group-hover:w-3 transition-all rounded-full"></span>
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/panier" className="text-gray-700 hover:text-primary transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-0 h-0.5 bg-primary group-hover:w-3 transition-all rounded-full"></span>
                  Panier
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-gray-900">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-gray-700">
                <Phone className="w-4 h-4 mt-0.5 text-primary" />
                <div>
                  <a href="tel:+229XXXXXXXX" className="hover:text-primary transition-colors text-sm">
                    +229 XX XX XX XX
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2 text-gray-700">
                <Mail className="w-4 h-4 mt-0.5 text-primary" />
                <div>
                  <a href="mailto:contact@agrofresh.bj" className="hover:text-primary transition-colors text-sm">
                    contact@agrofresh.bj
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2 text-gray-700">
                <MapPin className="w-4 h-4 mt-0.5 text-primary" />
                <div>
                  <span className="text-sm">
                    Cotonou, Bénin
                  </span>
                </div>
              </li>
            </ul>
          </div>

          {/* Horaires */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-gray-900">Horaires</h3>
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 mt-0.5 text-primary" />
              <div className="text-gray-700 text-sm">
                <p className="font-semibold text-gray-900">Lun - Sam</p>
                <p className="mb-2">8h00 - 19h00</p>
                <p className="font-semibold text-gray-900">Dimanche</p>
                <p>9h00 - 13h00</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-amber-200 mt-10 pt-6">
          <div className="text-center text-gray-600 text-sm">
            <p>© 2025 AgroFresh. Tous droits réservés.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
