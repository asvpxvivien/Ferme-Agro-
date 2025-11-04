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

interface ContactNotificationEmailProps {
  name: string
  email: string
  phone: string
  subject: string
  message: string
  submittedAt: string
}

export const ContactNotificationEmail = ({
  name = "Client",
  email = "client@example.com",
  phone = "+229 XX XX XX XX",
  subject = "Demande d'information",
  message = "Message du client",
  submittedAt = new Date().toLocaleString("fr-FR"),
}: ContactNotificationEmailProps) => (
  <Html>
    <Head />
    <Preview>Nouveau message de {name} - {subject}</Preview>
    <Body style={main}>
      <Container style={container}>
        {/* Header */}
        <Section style={header}>
          <Heading style={h1}>🌿 Ferme AgroEcologique ASSIKO</Heading>
          <Text style={headerSubtitle}>NOUVEAU MESSAGE DE CONTACT</Text>
        </Section>

        {/* Date */}
        <Section style={section}>
          <Text style={dateText}>Reçu le {submittedAt}</Text>
        </Section>

        <Hr style={hr} />

        {/* Contact Info */}
        <Section style={section}>
          <Heading style={h2}>👤 INFORMATIONS DE CONTACT</Heading>
          <Text style={infoText}><strong>Nom:</strong> {name}</Text>
          <Text style={infoText}><strong>Email:</strong> {email}</Text>
          <Text style={infoText}><strong>Téléphone:</strong> {phone}</Text>
        </Section>

        <Hr style={hr} />

        {/* Subject */}
        <Section style={section}>
          <Heading style={h2}>📋 SUJET</Heading>
          <Text style={subjectText}>{subject}</Text>
        </Section>

        <Hr style={hr} />

        {/* Message */}
        <Section style={section}>
          <Heading style={h2}>💬 MESSAGE</Heading>
          <div style={messageBox}>
            <Text style={messageText}>{message}</Text>
          </div>
        </Section>

        {/* Quick Actions */}
        <Hr style={hr} />
        <Section style={section}>
          <Heading style={h2}>⚡ ACTIONS RAPIDES</Heading>
          <Text style={actionText}>
            <strong>Répondre par email:</strong> <a href={`mailto:${email}`} style={link}>{email}</a>
          </Text>
          <Text style={actionText}>
            <strong>Appeler:</strong> {phone}
          </Text>
        </Section>

        {/* Footer */}
        <Hr style={hr} />
        <Text style={footer}>
          Email automatique - Ferme AgroEcologique ASSIKO
        </Text>
      </Container>
    </Body>
  </Html>
)

export default ContactNotificationEmail

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

const dateText = {
  fontSize: "14px",
  color: "#666666",
  margin: "0",
}

const infoText = {
  fontSize: "14px",
  lineHeight: "24px",
  color: "#333333",
  margin: "4px 0",
}

const subjectText = {
  fontSize: "16px",
  fontWeight: "600",
  color: "#16a34a",
  backgroundColor: "#f0fdf4",
  padding: "12px",
  borderRadius: "6px",
  margin: "0",
}

const messageBox = {
  backgroundColor: "#f9fafb",
  padding: "16px",
  borderRadius: "8px",
  borderLeft: "4px solid #16a34a",
  margin: "8px 0",
}

const messageText = {
  fontSize: "14px",
  lineHeight: "22px",
  color: "#333333",
  whiteSpace: "pre-wrap" as const,
  margin: "0",
}

const actionText = {
  fontSize: "14px",
  lineHeight: "24px",
  color: "#333333",
  margin: "8px 0",
}

const link = {
  color: "#16a34a",
  textDecoration: "underline",
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
