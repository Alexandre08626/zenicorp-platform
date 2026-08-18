import nodemailer from 'nodemailer';

let _transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter {
  if (!_transporter) {
    _transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER || '',
        pass: process.env.SMTP_PASS || '',
      },
      pool: true,
      maxConnections: 1,
    });
  }
  return _transporter;
}

export type SendEmailOptions = {
  to: string | string[];
  subject: string;
  html: string;
  fromName?: string;
};

export async function sendEmail(opts: SendEmailOptions): Promise<boolean> {
  try {
    const fromName = opts.fromName || 'ZeniCorp';
    const from = process.env.SMTP_FROM || 'zenipay@zeniva.ca';
    await getTransporter().sendMail({
      from: `"${fromName}" <${from}>`,
      to: Array.isArray(opts.to) ? opts.to.join(', ') : opts.to,
      subject: opts.subject,
      html: opts.html,
    });
    return true;
  } catch {
    return false;
  }
}