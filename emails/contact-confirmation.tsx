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

interface ContactConfirmationEmailProps {
  name: string
}

export const ContactConfirmationEmail = ({
  name = "Client",
}: ContactConfirmationEmailProps) => (
  <Html>
    <Head />
    <Preview>Votre message a bien été reçu - Ferme ASSIKO</Preview>
    <Body style={main}>
      <Container style={container}>
        {/* Header */}
        <Section style={header}>
          <Heading style={h1}>🌿 Ferme AgroEcologique ASSIKO</Heading>
          <Text style={headerSubtitle}>MESSAGE REÇU</Text>
        </Section>

        {/* Greeting */}
        <Section style={section}>
          <Text style={greeting}>Bonjour <strong>{name}</strong>,</Text>
          <Text style={paragraph}>
            Merci de nous avoir contactés ! 🌿
          </Text>
          <Text style={paragraph}>
            Votre message a bien été reçu et notre équipe vous répondra dans les plus brefs délais.
          </Text>
        </Section>

        <Hr style={hr} />

        {/* Response Time */}
        <Section style={section}>
          <div style={infoBox}>
            <Text style={infoBoxTitle}>⏱️ DÉLAI DE RÉPONSE</Text>
            <Text style={infoBoxText}>
              Nous nous efforçons de répondre à tous les messages dans un délai de <strong>24 à 48 heures</strong>.
            </Text>
          </div>
        </Section>

        <Hr style={hr} />

        {/* Contact Info */}
        <Section style={section}>
          <Heading style={h2}>📞 BESOIN D'UNE RÉPONSE RAPIDE ?</Heading>
          <Text style={paragraph}>
            Vous pouvez également nous contacter directement :
          </Text>
          <Text style={contactItem}>📱 Téléphone : +229 97 44 62 30</Text>
          <Text style={contactItem}>💬 WhatsApp : +229 97 44 62 30</Text>
          <Text style={contactItem}>📍 Adresse : Calavi, Bénin</Text>
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

export default ContactConfirmationEmail

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

const infoBox = {
  backgroundColor: "#f0fdf4",
  border: "2px solid #16a34a",
  borderRadius: "8px",
  padding: "16px",
  margin: "8px 0",
}

const infoBoxTitle = {
  fontSize: "14px",
  fontWeight: "bold",
  color: "#16a34a",
  margin: "0 0 8px",
}

const infoBoxText = {
  fontSize: "14px",
  lineHeight: "22px",
  color: "#333333",
  margin: "0",
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
