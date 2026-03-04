'use server'

import { z } from 'zod'

const contactSchema = z.object({
  email: z.string().email('Email non valida'),
  azienda: z.string().min(2, 'Nome impresa obbligatorio'),
  cantieri: z.enum(['1-5', '6-15', '15+'], { message: 'Seleziona numero cantieri' }),
  ruolo: z.enum(['titolare', 'tecnico', 'impiegato'], { message: 'Seleziona un ruolo' }),
})

export type ContactFormData = z.infer<typeof contactSchema>

export async function submitContactForm(data: unknown) {
  try {
    // Validate input
    const validated = contactSchema.parse(data)

    // Prevent spam: check if email submitted recently (in production, use Redis)
    // TODO: Implement rate limiting with Redis or database
    // const submissionKey = `contact_${validated.email}`

    // Send to your backend service (replace with your endpoint)
    const formspreeUrl = process.env.NEXT_PUBLIC_FORMSPREE_ID
    if (!formspreeUrl) {
      throw new Error('Form service not configured')
    }

    const response = await fetch(`https://formspree.io/f/${formspreeUrl}`, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: JSON.stringify(validated),
    })

    if (!response.ok) {
      throw new Error('Errore durante l\'invio del modulo')
    }

    return {
      success: true,
      message: 'Richiesta inviata! Ti risponderemo entro 24 ore.',
    }
  } catch (error) {
    console.error('Form submission error:', error)

    if (error instanceof z.ZodError) {
      const firstError = error.issues[0]?.message || 'Errore di validazione'
      return {
        success: false,
        error: firstError,
      }
    }

    return {
      success: false,
      error: 'Errore durante l\'invio. Riprova più tardi.',
    }
  }
}
