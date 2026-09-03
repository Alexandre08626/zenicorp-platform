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

/**
 * Échappe une valeur fournie par l'utilisateur avant interpolation dans un email HTML.
 * Sans ça, un champ de formulaire peut injecter du balisage arbitraire dans le courriel
 * reçu par l'équipe (phishing interne, liens masqués).
 */
export function escapeHtml(value: unknown): string {
  if (value === null || value === undefined) return '';
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Échappe puis convertit les sauts de ligne en <br/> pour un bloc de texte libre. */
export function escapeHtmlMultiline(value: unknown): string {
  return escapeHtml(value).replace(/\r?\n/g, '<br/>');
}

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