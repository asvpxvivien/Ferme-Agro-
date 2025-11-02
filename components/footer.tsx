import Link from "next/link"
import { Leaf, Mail, Phone, MapPin, Facebook, Instagram, Clock } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 text-gray-800">
      {/* Effet de vague en haut */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none -translate-y-full">
        <svg className="relative block w-full h-24" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                fill="#fef3c7" fillOpacity="1"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                fill="#fde68a" fillOpacity="1"></path>
        </svg>
      </div>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-32">
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
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-600 text-sm">
            <p>© 2025 AgroFresh. Tous droits réservés.</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-primary transition-colors">
                Mentions légales
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                Politique de confidentialité
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
