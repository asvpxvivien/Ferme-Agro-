import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import OrderNotificationEmail from "@/emails/order-notification"
import OrderConfirmationEmail from "@/emails/order-confirmation"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validation des données
    if (!body.customerInfo || !body.items || body.items.length === 0) {
      return NextResponse.json(
        { error: "Données de commande invalides" },
        { status: 400 }
      )
    }

    const {
      customerInfo,
      deliveryMethod,
      items,
      subtotal,
      deliveryFee,
      total,
    } = body

    // Générer un ID de commande unique
    const orderId = `CMD${Date.now().toString().slice(-8)}`
    const orderDate = new Date().toLocaleString("fr-FR", {
      dateStyle: "full",
      timeStyle: "short",
    })

    // Préparer les données pour les emails
    const emailData = {
      orderId,
      orderDate,
      customerName: customerInfo.name,
      customerPhone: customerInfo.phone,
      customerEmail: customerInfo.email || "",
      customerAddress: customerInfo.address,
      customerCity: customerInfo.city || "",
      deliveryMethod,
      deliveryFee,
      items,
      subtotal,
      total,
      notes: customerInfo.additionalNotes || "",
    }

    console.log("📧 Envoi des emails pour la commande:", orderId)

    // Envoi de l'email à l'admin (ASSIKO)
    const adminEmailResult = await resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to: process.env.ADMIN_EMAIL!,
      subject: `🛒 Nouvelle commande #${orderId} - ${customerInfo.name}`,
      react: OrderNotificationEmail(emailData),
    })

    console.log("✅ Email admin envoyé:", adminEmailResult)

    // Envoi de l'email de confirmation au client (si email fourni)
    if (customerInfo.email) {
      const customerEmailResult = await resend.emails.send({
        from: process.env.FROM_EMAIL!,
        to: customerInfo.email,
        subject: `✅ Commande confirmée #${orderId} - Ferme ASSIKO`,
        react: OrderConfirmationEmail(emailData),
      })

      console.log("✅ Email client envoyé:", customerEmailResult)
    }

    // Réponse de succès
    return NextResponse.json(
      {
        success: true,
        orderId,
        message: "Commande enregistrée avec succès",
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("❌ Erreur lors du traitement de la commande:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Une erreur est survenue lors du traitement de votre commande",
        details: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 }
    )
  }
}
