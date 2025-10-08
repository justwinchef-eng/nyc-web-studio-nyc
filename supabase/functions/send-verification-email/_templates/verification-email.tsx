import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'
import * as React from 'npm:react@18.3.1'

interface VerificationEmailProps {
  token: string
  email: string
}

export const VerificationEmail = ({
  token,
  email,
}: VerificationEmailProps) => (
  <Html>
    <Head />
    <Preview>Verify your email address</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Welcome! 👋</Heading>
        <Text style={text}>
          Thanks for signing up! We're excited to have you on board.
        </Text>
        <Text style={text}>
          To complete your registration, please enter this verification code in the app:
        </Text>
        <Section style={codeContainer}>
          <code style={code}>{token}</code>
        </Section>
        <Text style={text}>
          This code will expire in 24 hours for security reasons.
        </Text>
        <Text style={footerText}>
          If you didn't create an account, you can safely ignore this email.
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

export default VerificationEmail

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

const codeContainer = {
  background: '#f4f4f4',
  borderRadius: '8px',
  margin: '32px 40px',
  padding: '24px',
  textAlign: 'center' as const,
}

const code = {
  color: '#000',
  display: 'inline-block',
  fontSize: '32px',
  fontWeight: 'bold',
  letterSpacing: '6px',
  lineHeight: '40px',
  fontFamily: 'monospace',
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
