import { Webhook } from 'https://esm.sh/standardwebhooks@1.0.0'
import { Resend } from 'https://esm.sh/resend@2.0.0'

const resend = new Resend(Deno.env.get('RESEND_API_KEY') as string)
const hookSecret = Deno.env.get('SEND_EMAIL_HOOK_SECRET') as string

Deno.serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('not allowed', { status: 400 })
  }

  const payload = await req.text()
  const headers = Object.fromEntries(req.headers)
  const wh = new Webhook(hookSecret)
  
  try {
    const {
      user,
      email_data: { token, token_hash, redirect_to, email_action_type },
    } = wh.verify(payload, headers) as {
      user: {
        email: string
      }
      email_data: {
        token: string
        token_hash: string
        redirect_to: string
        email_action_type: string
        site_url: string
      }
    }

    let html: string
    let subject: string

    if (email_action_type === 'signup') {
      // Verification email
      html = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif; background-color: #f6f9fc;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px 0 48px;">
              <h1 style="color: #333; font-size: 28px; font-weight: bold; margin: 40px 0 20px; padding: 0 40px;">Welcome! 👋</h1>
              <p style="color: #333; font-size: 16px; line-height: 26px; margin: 16px 0; padding: 0 40px;">
                Thanks for signing up! We're excited to have you on board.
              </p>
              <p style="color: #333; font-size: 16px; line-height: 26px; margin: 16px 0; padding: 0 40px;">
                To complete your registration, please enter this verification code in the app:
              </p>
              <div style="background: #f4f4f4; border-radius: 8px; margin: 32px 40px; padding: 24px; text-align: center;">
                <span style="color: #000; font-size: 32px; font-weight: bold; letter-spacing: 6px; font-family: monospace;">${token}</span>
              </div>
              <p style="color: #333; font-size: 16px; line-height: 26px; margin: 16px 0; padding: 0 40px;">
                This code will expire in 24 hours for security reasons.
              </p>
              <p style="color: #8898aa; font-size: 14px; line-height: 24px; margin: 32px 0 16px; padding: 0 40px;">
                If you didn't create an account, you can safely ignore this email.
              </p>
              <p style="color: #333; font-size: 14px; line-height: 24px; margin: 16px 0; padding: 0 40px;">
                Best regards,<br>The Team
              </p>
            </div>
          </body>
        </html>
      `
      subject = 'Verify Your Email Address'
    } else if (email_action_type === 'recovery') {
      // Password reset email
      const siteUrl = Deno.env.get('SUPABASE_URL')?.replace('https://edfvubzzeulcitedfjka.supabase.co', 'https://edfvubzzeulcitedfjka.lovableproject.com') || redirect_to
      const resetLink = `${Deno.env.get('SUPABASE_URL')}/auth/v1/verify?token=${token_hash}&type=${email_action_type}&redirect_to=${siteUrl}/auth`
      html = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif; background-color: #f6f9fc;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px 0 48px;">
              <h1 style="color: #333; font-size: 28px; font-weight: bold; margin: 40px 0 20px; padding: 0 40px;">🔐 Reset Your Password</h1>
              <p style="color: #333; font-size: 16px; line-height: 26px; margin: 16px 0; padding: 0 40px;">
                Hi there! We received a request to reset your password. No worries - it happens to the best of us!
              </p>
              <p style="color: #333; font-size: 16px; line-height: 26px; margin: 16px 0; padding: 0 40px;">
                Click the button below to create a new password and get back into your account:
              </p>
              <div style="margin: 32px 40px; text-align: center;">
                <a href="${resetLink}" style="background-color: #5469d4; border-radius: 8px; color: #fff; font-size: 16px; font-weight: bold; text-decoration: none; display: inline-block; padding: 14px 36px; box-shadow: 0 2px 8px rgba(84, 105, 212, 0.3);">Reset My Password</a>
              </div>
              <p style="color: #666; font-size: 14px; line-height: 24px; margin: 16px 0; padding: 0 40px; text-align: center;">
                This link will expire in 1 hour for your security.
              </p>
              <p style="color: #8898aa; font-size: 14px; line-height: 24px; margin: 32px 0 16px; padding: 0 40px;">
                If you didn't request this password reset, please ignore this email. Your password will remain unchanged and your account is secure.
              </p>
              <p style="color: #333; font-size: 14px; line-height: 24px; margin: 16px 0; padding: 0 40px;">
                Best regards,<br>Your Website Team
              </p>
            </div>
          </body>
        </html>
      `
      subject = 'Reset Your Password'
    } else {
      throw new Error(`Unsupported email action type: ${email_action_type}`)
    }

    const { error } = await resend.emails.send({
      from: 'Your Website <onboarding@resend.dev>',
      to: [user.email],
      subject,
      html,
    })

    if (error) {
      throw error
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error: any) {
    console.error('Error sending email:', error)
    return new Response(
      JSON.stringify({
        error: {
          http_code: error?.code || 500,
          message: error?.message || 'Unknown error occurred',
        },
      }),
      {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
})
