import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { FeaturedProducts } from "@/components/featured-products"
import { ContactSection } from "@/components/contact-section"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div>
        <HeroSection />
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <AboutSection />
        </div>
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <FeaturedProducts />
        </div>
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <ContactSection />
        </div>
      </div>
      <Footer />
    </main>
  )
}
