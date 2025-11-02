import Link from "next/link"
import { Leaf, Mail, Phone, MapPin, Facebook, Instagram, Clock } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo et Description */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-primary to-green-600 rounded-xl p-2.5 shadow-lg">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">
                <span className="text-white">Agro</span>
                <span className="text-primary">Fresh</span>
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Une ferme familiale engagée dans une agriculture authentique, naturelle et respectueuse de
              l'environnement.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-primary flex items-center justify-center transition-all hover:scale-110"
                aria-label="Suivez-nous sur Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-primary flex items-center justify-center transition-all hover:scale-110"
                aria-label="Suivez-nous sur Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-bold text-xl mb-6 text-white">Navigation</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group">
                  <span className="w-0 h-0.5 bg-primary group-hover:w-4 transition-all rounded-full"></span>
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/#about" className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group">
                  <span className="w-0 h-0.5 bg-primary group-hover:w-4 transition-all rounded-full"></span>
                  Notre Ferme
                </Link>
              </li>
              <li>
                <Link href="/catalogue" className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group">
                  <span className="w-0 h-0.5 bg-primary group-hover:w-4 transition-all rounded-full"></span>
                  Catalogue
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group">
                  <span className="w-0 h-0.5 bg-primary group-hover:w-4 transition-all rounded-full"></span>
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/panier" className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group">
                  <span className="w-0 h-0.5 bg-primary group-hover:w-4 transition-all rounded-full"></span>
                  Panier
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-xl mb-6 text-white">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400 group">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Téléphone</p>
                  <a href="tel:+229XXXXXXXX" className="hover:text-primary transition-colors">
                    +229 XX XX XX XX
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 text-gray-400 group">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Email</p>
                  <a href="mailto:contact@agrofresh.bj" className="hover:text-primary transition-colors">
                    contact@agrofresh.bj
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 text-gray-400 group">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Adresse</p>
                  <span className="text-sm">
                    Ferme Familiale AgroFresh
                    <br />
                    Cotonou, Bénin
                  </span>
                </div>
              </li>
            </ul>
          </div>

          {/* Horaires */}
          <div>
            <h3 className="font-bold text-xl mb-6 text-white">Horaires</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-green-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div className="text-gray-400">
                  <p className="text-xs text-gray-500 mb-2">Nos heures d'ouverture</p>
                  <p className="text-sm leading-relaxed">
                    <span className="text-white font-semibold">Lun - Sam</span>
                    <br />
                    8h00 - 19h00
                  </p>
                  <p className="text-sm leading-relaxed mt-2">
                    <span className="text-white font-semibold">Dimanche</span>
                    <br />
                    9h00 - 13h00
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
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
