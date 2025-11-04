import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import ContactNotificationEmail from "@/emails/contact-notification"
import ContactConfirmationEmail from "@/emails/contact-confirmation"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validation des données
    if (!body.name || !body.email || !body.phone || !body.subject || !body.message) {
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 }
      )
    }

    const { name, email, phone, subject, message } = body

    const submittedAt = new Date().toLocaleString("fr-FR", {
      dateStyle: "full",
      timeStyle: "short",
    })

    console.log("📧 Envoi des emails pour le message de contact de:", name)

    // Envoi de l'email à l'admin (ASSIKO)
    const adminEmailResult = await resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to: process.env.ADMIN_EMAIL!,
      subject: `📨 Nouveau message de contact - ${subject}`,
      react: ContactNotificationEmail({
        name,
        email,
        phone,
        subject,
        message,
        submittedAt,
      }),
    })

    console.log("✅ Email admin envoyé:", adminEmailResult)

    // Envoi de l'email de confirmation au client
    const customerEmailResult = await resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to: email,
      subject: "✅ Message reçu - Ferme ASSIKO",
      react: ContactConfirmationEmail({ name }),
    })

    console.log("✅ Email client envoyé:", customerEmailResult)

    // Réponse de succès
    return NextResponse.json(
      {
        success: true,
        message: "Message envoyé avec succès",
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("❌ Erreur lors de l'envoi du message:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Une erreur est survenue lors de l'envoi de votre message",
        details: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 }
    )
  }
}
