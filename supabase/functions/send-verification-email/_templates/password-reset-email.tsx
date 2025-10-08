import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'
import * as React from 'npm:react@18.3.1'

interface PasswordResetEmailProps {
  resetLink: string
}

export const PasswordResetEmail = ({
  resetLink,
}: PasswordResetEmailProps) => (
  <Html>
    <Head />
    <Preview>Reset your password</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Password Reset Request</Heading>
        <Text style={text}>
          We received a request to reset your password. Click the button below to create a new password:
        </Text>
        <Section style={buttonContainer}>
          <Button style={button} href={resetLink}>
            Reset Password
          </Button>
        </Section>
        <Text style={text}>
          This link will expire in 1 hour for security reasons.
        </Text>
        <Text style={footerText}>
          If you didn't request a password reset, you can safely ignore this email.
          Your password will remain unchanged.
        </Text>
        <Text style={footer}>
          Best regards,
          <br />
          The Team
        </Text>
      </Container>
    </Body>
  </Html>
)

export default PasswordResetEmail

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  maxWidth: '600px',
}

const h1 = {
  color: '#333',
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '40px 0 20px',
  padding: '0 40px',
}

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '16px 0',
  padding: '0 40px',
}

const buttonContainer = {
  margin: '32px 40px',
  textAlign: 'center' as const,
}

const button = {
  backgroundColor: '#5469d4',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 32px',
}

const footerText = {
  color: '#8898aa',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '32px 0 16px',
  padding: '0 40px',
}

const footer = {
  color: '#333',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '16px 0',
  padding: '0 40px',
}
