const NOTIFY_URL = 'https://zenitech.dev/api/notify/account-created';

export type NotifyChannel = 'email' | 'sms';

export interface NotifyAccountCreatedOptions {
  name: string;
  email: string;
  phone?: string;
  loginUrl?: string;
  accountLabel?: string;
  channels?: NotifyChannel[];
}

export interface NotifyResult {
  success: boolean;
  skipped?: boolean;
  email?: unknown;
  sms?: unknown;
  errors?: unknown;
}

/**
 * Appelle le service central de notification (zenitech.dev).
 * Ne lance jamais d'exception : retourne { success: false } en cas d'échec.
 */
export async function notifyAccountCreated(opts: NotifyAccountCreatedOptions): Promise<NotifyResult> {
  const key = process.env.NOTIFY_KEY;
  if (!key) return { success: false, skipped: true };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 6000);
  try {
    const res = await fetch(NOTIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-notify-key': key },
      body: JSON.stringify({
        division: 'zenicorp',
        name: opts.name,
        email: opts.email,
        phone: opts.phone,
        loginUrl: opts.loginUrl || 'https://www.zeniva.ca',
        accountLabel: opts.accountLabel,
        channels: opts.channels || ['sms'],
      }),
      signal: controller.signal,
    });
    const data = (await res.json().catch(() => null)) as NotifyResult | null;
    if (!res.ok || !data) {
      console.error('[notify] échec account-created', res.status);
      return { success: false, errors: data?.errors };
    }
    return data;
  } catch (err) {
    console.error('[notify] erreur account-created', err instanceof Error ? err.message : err);
    return { success: false };
  } finally {
    clearTimeout(timer);
  }
}
