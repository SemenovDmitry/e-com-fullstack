import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport(
	process.env.NODE_ENV === 'development'
		? {
				host: process.env.MAILHOG_HOST || 'mailhog',
				port: parseInt(process.env.MAILHOG_PORT || '1025'),
			}
		: {
				service: 'gmail',
				auth: {
					user: process.env.GMAIL_USER || '',
					pass: process.env.GMAIL_APP_PASSWORD || '',
				},
			}
)

type SendEmailOptions = {
	to: string
	subject: string
	html: string
	text?: string
}

export const sendEmail = async (options: SendEmailOptions): Promise<void> => {
	try {
		const from = process.env.NODE_ENV === 'development' ? 'dev@example.com' : process.env.GMAIL_USER || ''

		await transporter.sendMail({
			from,
			...options,
		})
		console.log(`📧 Email sent to ${options.to}`)
	} catch (error) {
		console.error('Error sending email:', error)
		throw new Error('Failed to send email')
	}
}

export const sendMagicLinkEmail = async (email: string, token: string, baseUrl: string): Promise<void> => {
	const magicLink = `${baseUrl}/auth/verify?token=${token}`

	const htmlContent = `
    <h1>Welcome to E-Commerce!</h1>
    <p>Click the link below to verify your email and log in:</p>
    <a href="${magicLink}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">
      Verify Email &amp; Login
    </a>
    <p>Or copy this link: <a href="${magicLink}">${magicLink}</a></p>
    <p><small>This link expires in 30 minutes.</small></p>
  `

	const textContent = `
    Welcome to E-Commerce!
    Click the link below to verify your email and log in:
    ${magicLink}
    This link expires in 30 minutes.
  `

	await sendEmail({
		to: email,
		subject: 'Verify your email - Magic Link Login',
		html: htmlContent,
		text: textContent,
	})
}

export const verifyTransporter = async (): Promise<boolean> => {
	try {
		await transporter.verify()
		console.log('Email service is ready')
		return true
	} catch (error) {
		console.error('Email service verification failed:', error)
		return false
	}
}
