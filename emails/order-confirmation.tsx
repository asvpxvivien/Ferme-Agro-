import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components"

interface OrderItem {
  id: string
  name: string
  quantity: number
  price: number
  unit: string
  purchaseType?: string
}

interface OrderConfirmationEmailProps {
  customerName: string
  orderId: string
  deliveryMethod: "farm" | "home"
  deliveryFee: number
  items: OrderItem[]
  subtotal: number
  total: number
  customerAddress: string
  customerCity?: string
}

export const OrderConfirmationEmail = ({
  customerName = "Client",
  orderId = "CMD001",
  deliveryMethod = "farm",
  deliveryFee = 0,
  items = [],
  subtotal = 0,
  total = 0,
  customerAddress = "",
  customerCity = "",
}: OrderConfirmationEmailProps) => (
  <Html>
    <Head />
    <Preview>Votre commande #{orderId} a été confirmée</Preview>
    <Body style={main}>
      <Container style={container}>
        {/* Header */}
        <Section style={header}>
          <Heading style={h1}>🌿 Ferme AgroEcologique ASSIKO</Heading>
          <Text style={headerSubtitle}>COMMANDE CONFIRMÉE</Text>
        </Section>

        {/* Greeting */}
        <Section style={section}>
          <Text style={greeting}>Bonjour <strong>{customerName}</strong>,</Text>
          <Text style={paragraph}>
            Merci pour votre confiance ! 🌿
          </Text>
          <Text style={paragraph}>
            Votre commande a bien été enregistrée et sera traitée dans les plus brefs délais.
          </Text>
        </Section>

        <Hr style={hr} />

        {/* Order Summary */}
        <Section style={section}>
          <Heading style={h2}>📋 RÉCAPITULATIF DE VOTRE COMMANDE</Heading>
          <Text style={orderIdText}>Commande <strong>#{orderId}</strong></Text>
        </Section>

        {/* Delivery Info */}
        <Section style={section}>
          <Text style={infoLabel}>Mode de livraison:</Text>
          <Text style={infoValue}>
            {deliveryMethod === "farm" ? "🏡 Retrait à la ferme" : "🚚 Livraison à domicile"}
          </Text>
          <Text style={infoDetail}>
            Délai: {deliveryMethod === "farm" ? "24 heures" : "1-2 jours"}
          </Text>
          {deliveryMethod === "home" && (
            <Text style={infoDetail}>
              Adresse: {customerAddress}{customerCity ? `, ${customerCity}` : ""}
            </Text>
          )}
        </Section>

        <Hr style={hr} />

        {/* Products */}
        <Section style={section}>
          <Heading style={h2}>🛒 VOS PRODUITS</Heading>
          {items.map((item, index) => {
            const itemPrice = item.purchaseType === "gros" ? item.price * 0.85 : item.price
            const itemTotal = itemPrice * item.quantity

            return (
              <div key={index} style={productItem}>
                <Text style={productName}>
                  <strong>{item.name}</strong> × {item.quantity}
                </Text>
                <Text style={productDetails}>
                  {itemPrice.toLocaleString("fr-FR")} FCFA / {item.unit}
                  {item.purchaseType === "gros" && " ✨ En gros (-15%)"}
                </Text>
                <Text style={productTotal}>
                  {itemTotal.toLocaleString("fr-FR")} FCFA
                </Text>
              </div>
            )
          })}
        </Section>

        <Hr style={hr} />

        {/* Total */}
        <Section style={section}>
          <div style={summaryBox}>
            <Text style={summaryRow}>
              <span>Sous-total:</span>
              <span style={summaryValue}>{subtotal.toLocaleString("fr-FR")} FCFA</span>
            </Text>
            <Text style={summaryRow}>
              <span>Livraison:</span>
              <span style={summaryValue}>{deliveryFee === 0 ? "GRATUIT" : `${deliveryFee.toLocaleString("fr-FR")} FCFA`}</span>
            </Text>
            <Hr style={summaryHr} />
            <Text style={totalRow}>
              <span>TOTAL:</span>
              <span style={totalValue}>{total.toLocaleString("fr-FR")} FCFA</span>
            </Text>
          </div>
        </Section>

        <Hr style={hr} />

        {/* Contact */}
        <Section style={section}>
          <Heading style={h2}>📞 BESOIN D'AIDE ?</Heading>
          <Text style={paragraph}>
            Notre équipe est à votre disposition :
          </Text>
          <Text style={contactItem}>📱 Téléphone : +229 97 44 62 30</Text>
          <Text style={contactItem}>💬 WhatsApp : +229 97 44 62 30</Text>
          <Text style={contactItem}>✉️ Email : fermeassiko@gmail.com</Text>
        </Section>

        <Hr style={hr} />

        {/* Footer Message */}
        <Section style={section}>
          <Text style={footerMessage}>
            Merci de soutenir l'agriculture locale et écologique !
          </Text>
          <Text style={signature}>
            L'équipe Ferme AgroEcologique ASSIKO<br />
            Calavi, Bénin 🇧🇯
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export default OrderConfirmationEmail

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  maxWidth: "600px",
}

const header = {
  backgroundColor: "#16a34a",
  padding: "24px",
  textAlign: "center" as const,
}

const h1 = {
  color: "#ffffff",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "0 0 8px",
  padding: "0",
}

const headerSubtitle = {
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: "600",
  letterSpacing: "2px",
  margin: "0",
}

const section = {
  padding: "0 24px",
  marginTop: "24px",
}

const h2 = {
  color: "#333333",
  fontSize: "18px",
  fontWeight: "bold",
  margin: "0 0 12px",
}

const greeting = {
  fontSize: "16px",
  color: "#333333",
  margin: "0 0 12px",
}

const paragraph = {
  fontSize: "14px",
  lineHeight: "24px",
  color: "#666666",
  margin: "8px 0",
}

const orderIdText = {
  fontSize: "18px",
  fontWeight: "bold",
  color: "#16a34a",
  margin: "8px 0",
}

const infoLabel = {
  fontSize: "13px",
  color: "#666666",
  fontWeight: "600",
  margin: "8px 0 4px",
}

const infoValue = {
  fontSize: "15px",
  color: "#333333",
  fontWeight: "bold",
  margin: "0 0 4px",
}

const infoDetail = {
  fontSize: "13px",
  color: "#666666",
  margin: "2px 0",
}

const productItem = {
  backgroundColor: "#f9fafb",
  padding: "12px",
  marginBottom: "8px",
  borderRadius: "6px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}

const productName = {
  fontSize: "15px",
  margin: "0 0 4px",
  color: "#333333",
}

const productDetails = {
  fontSize: "13px",
  margin: "0",
  color: "#666666",
}

const productTotal = {
  fontSize: "15px",
  margin: "0",
  color: "#16a34a",
  fontWeight: "600",
}

const summaryBox = {
  backgroundColor: "#f9fafb",
  padding: "16px",
  borderRadius: "8px",
  border: "2px solid #e5e7eb",
}

const summaryRow = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: "14px",
  color: "#333333",
  margin: "4px 0",
}

const summaryValue = {
  fontWeight: "600",
}

const summaryHr = {
  borderColor: "#d1d5db",
  margin: "12px 0",
}

const totalRow = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: "18px",
  color: "#16a34a",
  fontWeight: "bold",
  margin: "8px 0 0",
}

const totalValue = {
  fontSize: "20px",
}

const contactItem = {
  fontSize: "14px",
  color: "#333333",
  margin: "6px 0",
}

const footerMessage = {
  fontSize: "14px",
  color: "#16a34a",
  fontWeight: "600",
  textAlign: "center" as const,
  margin: "16px 0",
}

const signature = {
  fontSize: "14px",
  color: "#666666",
  textAlign: "center" as const,
  margin: "8px 0",
  lineHeight: "22px",
}

const hr = {
  borderColor: "#e5e7eb",
  margin: "24px 0",
}
