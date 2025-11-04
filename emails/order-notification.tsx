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

interface OrderNotificationEmailProps {
  orderId: string
  customerName: string
  customerPhone: string
  customerEmail?: string
  customerAddress: string
  customerCity?: string
  deliveryMethod: "farm" | "home"
  deliveryFee: number
  items: OrderItem[]
  subtotal: number
  total: number
  notes?: string
  orderDate: string
}

export const OrderNotificationEmail = ({
  orderId = "CMD001",
  customerName = "John Doe",
  customerPhone = "+229 XX XX XX XX",
  customerEmail = "client@example.com",
  customerAddress = "123 Rue Example",
  customerCity = "Cotonou",
  deliveryMethod = "farm",
  deliveryFee = 0,
  items = [],
  subtotal = 0,
  total = 0,
  notes = "",
  orderDate = new Date().toLocaleString("fr-FR"),
}: OrderNotificationEmailProps) => (
  <Html>
    <Head />
    <Preview>Nouvelle commande #{orderId} de {customerName}</Preview>
    <Body style={main}>
      <Container style={container}>
        {/* Header */}
        <Section style={header}>
          <Heading style={h1}>🌾 Ferme AgroEcologique ASSIKO</Heading>
          <Text style={headerSubtitle}>NOUVELLE COMMANDE</Text>
        </Section>

        {/* Order ID and Date */}
        <Section style={section}>
          <Text style={orderInfo}>
            Commande <strong>#{orderId}</strong>
          </Text>
          <Text style={dateInfo}>Date: {orderDate}</Text>
        </Section>

        <Hr style={hr} />

        {/* Customer Information */}
        <Section style={section}>
          <Heading style={h2}>👤 INFORMATIONS CLIENT</Heading>
          <Text style={infoText}><strong>Nom:</strong> {customerName}</Text>
          <Text style={infoText}><strong>Téléphone:</strong> {customerPhone}</Text>
          {customerEmail && <Text style={infoText}><strong>Email:</strong> {customerEmail}</Text>}
          <Text style={infoText}><strong>Adresse:</strong> {customerAddress}</Text>
          {customerCity && <Text style={infoText}><strong>Ville:</strong> {customerCity}</Text>}
        </Section>

        <Hr style={hr} />

        {/* Delivery Information */}
        <Section style={section}>
          <Heading style={h2}>📦 MODE DE LIVRAISON</Heading>
          <Text style={infoText}>
            <strong>Type:</strong> {deliveryMethod === "farm" ? "Retrait à la ferme" : "Livraison à domicile"}
          </Text>
          <Text style={infoText}>
            <strong>Délai:</strong> {deliveryMethod === "farm" ? "24 heures" : "1-2 jours"}
          </Text>
          <Text style={infoText}>
            <strong>Frais:</strong> {deliveryFee === 0 ? "GRATUIT" : `${deliveryFee.toLocaleString("fr-FR")} FCFA`}
          </Text>
        </Section>

        <Hr style={hr} />

        {/* Order Items */}
        <Section style={section}>
          <Heading style={h2}>🛒 PRODUITS COMMANDÉS</Heading>
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
                  {item.purchaseType === "gros" && " (En gros -15%)"}
                </Text>
                <Text style={productTotal}>
                  = <strong>{itemTotal.toLocaleString("fr-FR")} FCFA</strong>
                </Text>
              </div>
            )
          })}
        </Section>

        <Hr style={hr} />

        {/* Summary */}
        <Section style={section}>
          <Heading style={h2}>💰 RÉSUMÉ</Heading>
          <Text style={summaryText}>
            <strong>Sous-total:</strong> {subtotal.toLocaleString("fr-FR")} FCFA
          </Text>
          <Text style={summaryText}>
            <strong>Livraison:</strong> {deliveryFee.toLocaleString("fr-FR")} FCFA
          </Text>
          <Text style={totalText}>
            <strong>TOTAL:</strong> {total.toLocaleString("fr-FR")} FCFA
          </Text>
        </Section>

        {/* Notes */}
        {notes && (
          <>
            <Hr style={hr} />
            <Section style={section}>
              <Heading style={h2}>📝 NOTES CLIENT</Heading>
              <Text style={notesText}>{notes}</Text>
            </Section>
          </>
        )}

        {/* Footer */}
        <Hr style={hr} />
        <Text style={footer}>
          Email automatique - Ferme AgroEcologique ASSIKO
        </Text>
      </Container>
    </Body>
  </Html>
)

export default OrderNotificationEmail

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

const orderInfo = {
  fontSize: "20px",
  fontWeight: "bold",
  color: "#16a34a",
  margin: "0",
}

const dateInfo = {
  fontSize: "14px",
  color: "#666666",
  margin: "4px 0 0",
}

const infoText = {
  fontSize: "14px",
  lineHeight: "24px",
  color: "#333333",
  margin: "4px 0",
}

const productItem = {
  backgroundColor: "#f9fafb",
  padding: "12px",
  marginBottom: "8px",
  borderRadius: "6px",
  borderLeft: "4px solid #16a34a",
}

const productName = {
  fontSize: "15px",
  margin: "0 0 4px",
  color: "#333333",
}

const productDetails = {
  fontSize: "13px",
  margin: "0 0 4px",
  color: "#666666",
}

const productTotal = {
  fontSize: "14px",
  margin: "4px 0 0",
  color: "#16a34a",
  fontWeight: "600",
}

const summaryText = {
  fontSize: "15px",
  lineHeight: "24px",
  margin: "4px 0",
  color: "#333333",
}

const totalText = {
  fontSize: "18px",
  lineHeight: "28px",
  margin: "12px 0 0",
  color: "#16a34a",
  fontWeight: "bold",
}

const notesText = {
  fontSize: "14px",
  lineHeight: "22px",
  color: "#666666",
  backgroundColor: "#fef3c7",
  padding: "12px",
  borderRadius: "6px",
  margin: "8px 0",
}

const hr = {
  borderColor: "#e5e7eb",
  margin: "24px 0",
}

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
  textAlign: "center" as const,
  marginTop: "32px",
}
