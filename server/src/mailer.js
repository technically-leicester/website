import nodemailer from 'nodemailer'

const {SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS} = process.env

const mailer = async (message) => {
  try {
    const transporter = nodemailer.createTransport({
      port: SMTP_PORT,
      host: SMTP_HOST,
      secure: false,
      requireTLS: true,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false
      }
    })
    await transporter.sendMail(message)
  } catch (e) {
    console.info(`Could not send email: ${e.message}`)
    console.info(`Email content: ${JSON.stringify(message)}`)
  }
}

export default mailer
