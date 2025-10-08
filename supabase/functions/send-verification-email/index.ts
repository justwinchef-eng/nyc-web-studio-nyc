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
      // Password reset email - properly encode the redirect URL
      const encodedRedirect = encodeURIComponent(redirect_to)
      const resetLink = `${Deno.env.get('SUPABASE_URL')}/auth/v1/verify?token=${token_hash}&type=${email_action_type}&redirect_to=${encodedRedirect}`
      
      html = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif; background-color: #f6f9fc;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px 0;">
              <!-- Logo placeholder -->
              <div style="text-align: center; padding: 0 40px 20px;">
                <div style="width: 80px; height: 80px; margin: 0 auto; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 16px; display: flex; align-items: center; justify-content: center;">
                  <span style="color: #fff; font-size: 36px; font-weight: bold;">🔐</span>
                </div>
              </div>
              
              <h1 style="color: #1a1a1a; font-size: 32px; font-weight: 700; margin: 0 0 16px; padding: 0 40px; text-align: center;">Reset Your Password</h1>
              
              <p style="color: #4a5568; font-size: 16px; line-height: 24px; margin: 0 0 24px; padding: 0 40px; text-align: center;">
                No worries! It happens to everyone. Let's get you back into your account.
              </p>
              
              <div style="background: #f7fafc; border-left: 4px solid #667eea; margin: 24px 40px; padding: 20px;">
                <p style="color: #2d3748; font-size: 15px; line-height: 22px; margin: 0;">
                  We received a request to reset your password. Click the button below to choose a new password.
                </p>
              </div>
              
              <div style="margin: 32px 40px; text-align: center;">
                <a href="${resetLink}" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; color: #ffffff; font-size: 16px; font-weight: 600; text-decoration: none; display: inline-block; padding: 16px 48px; box-shadow: 0 4px 14px rgba(102, 126, 234, 0.4); transition: all 0.3s ease;">Reset My Password →</a>
              </div>
              
              <p style="color: #718096; font-size: 14px; line-height: 20px; margin: 24px 0; padding: 0 40px; text-align: center; background: #fff9e6; border-radius: 8px; padding: 16px 40px;">
                ⏱️ This secure link will expire in <strong>1 hour</strong> to protect your account.
              </p>
              
              <div style="border-top: 1px solid #e2e8f0; margin: 32px 40px; padding-top: 24px;">
                <p style="color: #a0aec0; font-size: 13px; line-height: 20px; margin: 0 0 8px;">
                  <strong>Didn't request this?</strong>
                </p>
                <p style="color: #a0aec0; font-size: 13px; line-height: 20px; margin: 0;">
                  If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged and your account is completely secure.
                </p>
              </div>
              
              <div style="margin: 32px 40px 0; padding-top: 24px; border-top: 1px solid #e2e8f0; text-align: center;">
                <p style="color: #2d3748; font-size: 14px; line-height: 20px; margin: 0 0 8px;">
                  Best regards,
                </p>
                <p style="color: #667eea; font-size: 16px; font-weight: 600; margin: 0;">
                  Your Company Team 💜
                </p>
              </div>
            </div>
          </body>
        </html>
      `
      subject = 'Reset Your Password - Your Company'
    } else {
      throw new Error(`Unsupported email action type: ${email_action_type}`)
    }

    const { error } = await resend.emails.send({
      from: 'Your Company <onboarding@resend.dev>',
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
