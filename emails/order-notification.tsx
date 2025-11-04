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
          <Heading style={h1}>🌿 Ferme AgroEcologique ASSIKO</Heading>
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
          <div style={productsContainer}>
            {items.map((item, index) => {
              const itemPrice = item.purchaseType === "gros" ? item.price * 0.85 : item.price
              const itemTotal = itemPrice * item.quantity

              return (
                <div key={index} style={productItem}>
                  <div style={productHeader}>
                    <Text style={productName}>
                      <strong>{item.name}</strong>
                    </Text>
                    {item.purchaseType === "gros" && (
                      <span style={grossBadge}>EN GROS -15%</span>
                    )}
                  </div>

                  <div style={productPriceRow}>
                    <Text style={productDetails}>
                      {itemPrice.toLocaleString("fr-FR", { minimumFractionDigits: 0 })} FCFA / {item.unit}
                    </Text>
                    <Text style={productQuantity}>
                      × {item.quantity}
                    </Text>
                  </div>

                  <div style={productTotalRow}>
                    <Text style={productTotal}>
                      TOTAL: <strong>{itemTotal.toLocaleString("fr-FR", { minimumFractionDigits: 0 })} FCFA</strong>
                    </Text>
                  </div>
                </div>
              )
            })}
          </div>
        </Section>

        <Hr style={hr} />

        {/* Summary */}
        <Section style={section}>
          <Heading style={h2}>💰 RÉSUMÉ</Heading>
          <div style={summaryContainer}>
            <div style={summaryRow}>
              <Text style={summaryLabel}>Sous-total:</Text>
              <Text style={summaryValue}>{subtotal.toLocaleString("fr-FR", { minimumFractionDigits: 0 })} FCFA</Text>
            </div>
            <div style={summaryRow}>
              <Text style={summaryLabel}>Livraison:</Text>
              <Text style={summaryValue}>
                {deliveryFee === 0 ? "GRATUIT" : `${deliveryFee.toLocaleString("fr-FR", { minimumFractionDigits: 0 })} FCFA`}
              </Text>
            </div>
            <Hr style={summaryDivider} />
            <div style={summaryRow}>
              <Text style={totalLabel}>TOTAL À PAYER:</Text>
              <Text style={totalValue}>{total.toLocaleString("fr-FR", { minimumFractionDigits: 0 })} FCFA</Text>
            </div>
          </div>
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
        <Section style={section}>
          <Text style={footer}>
            Email automatique - Ferme AgroEcologique ASSIKO
          </Text>
          <Text style={footerContact}>
            📞 +229 97 44 62 30 | ✉️ fermeassiko@gmail.com
          </Text>
        </Section>
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

const productsContainer = {
  marginTop: "12px",
}

const productItem = {
  backgroundColor: "#ffffff",
  padding: "20px",
  marginBottom: "16px",
  borderRadius: "12px",
  border: "2px solid #e5e7eb",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
}

const productHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "12px",
}

const productName = {
  fontSize: "16px",
  margin: "0",
  color: "#111827",
}

const grossBadge = {
  backgroundColor: "#fbbf24",
  color: "#78350f",
  fontSize: "11px",
  fontWeight: "700",
  padding: "4px 10px",
  borderRadius: "12px",
  letterSpacing: "0.5px",
}

const productPriceRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "12px",
  paddingBottom: "12px",
  borderBottom: "1px solid #f3f4f6",
}

const productDetails = {
  fontSize: "14px",
  margin: "0",
  color: "#6b7280",
}

const productQuantity = {
  fontSize: "15px",
  margin: "0",
  color: "#374151",
  fontWeight: "600",
}

const productTotalRow = {
  marginTop: "8px",
}

const productTotal = {
  fontSize: "16px",
  margin: "0",
  color: "#16a34a",
  fontWeight: "700",
  textAlign: "right" as const,
}

const summaryContainer = {
  backgroundColor: "#f9fafb",
  padding: "24px",
  borderRadius: "12px",
  marginTop: "12px",
}

const summaryRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "12px",
}

const summaryLabel = {
  fontSize: "15px",
  margin: "0",
  color: "#4b5563",
}

const summaryValue = {
  fontSize: "15px",
  margin: "0",
  color: "#111827",
  fontWeight: "600",
}

const summaryDivider = {
  borderColor: "#d1d5db",
  margin: "16px 0",
}

const totalLabel = {
  fontSize: "18px",
  margin: "0",
  color: "#111827",
  fontWeight: "bold",
}

const totalValue = {
  fontSize: "22px",
  margin: "0",
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
  marginTop: "8px",
  marginBottom: "8px",
}

const footerContact = {
  color: "#16a34a",
  fontSize: "13px",
  lineHeight: "18px",
  textAlign: "center" as const,
  fontWeight: "600",
  marginTop: "8px",
}
