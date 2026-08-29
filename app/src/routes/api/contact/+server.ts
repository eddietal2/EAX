import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import nodemailer from 'nodemailer';
import { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL } from '$env/static/private';

// Escape user-supplied text so it can't inject markup into the email body.
function escapeHtml(value: string): string {
	return value
		.replace(/&/g, '&')
		.replace(/</g, '<')
		.replace(/>/g, '>')
		.replace(/"/g, '"');
}

// Branded, responsive HTML email template (inline styles only — email clients
// strip <style> blocks). Highlights the sender's name + email and the message.
function contactEmailHtml(name: string, email: string, message: string): string {
	const safeName = escapeHtml(name);
	const safeEmail = escapeHtml(email);
	const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');
	const sentAt = new Date().toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
	return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;background-color:#ecfdf5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#ecfdf5;padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #d1fae5;">
          <!-- Header -->
          <tr>
            <td style="background-color:#059669;padding:26px 28px;">
              <div style="font-size:22px;font-weight:700;color:#ffffff;">🦁 SimbaFX</div>
              <div style="font-size:12px;color:#a7f3d0;margin-top:2px;">New Contact Message</div>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:28px;">
              <!-- Sender -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;color:#059669;padding-bottom:6px;">From</td>
                </tr>
                <tr>
                  <td style="font-size:17px;font-weight:600;color:#064e3b;padding-bottom:2px;">${safeName}</td>
                </tr>
                <tr>
                  <td style="font-size:14px;color:#059669;padding-bottom:20px;"><a href="mailto:${safeEmail}" style="color:#059669;text-decoration:none;">${safeEmail}</a></td>
                </tr>
              </table>
              <!-- Message -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="border-top:1px solid #e5e7eb;padding-top:18px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;color:#059669;padding-bottom:10px;">Message</td>
                </tr>
                <tr>
                  <td style="font-size:15px;line-height:1.65;color:#1f2937;">${safeMessage}</td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color:#f9fafb;padding:16px 28px;border-top:1px solid #e5e7eb;">
              <div style="font-size:12px;color:#6b7280;">Sent from the SimbaFX extension · East African Exchange</div>
              <div style="font-size:11px;color:#9ca3af;margin-top:2px;">${sentAt}</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export const POST: RequestHandler = async ({ request }) => {
	try {
		const body = await request.json();
		const name = typeof body?.name === 'string' ? body.name.trim() : '';
		const email = typeof body?.email === 'string' ? body.email.trim() : '';
		const message = typeof body?.message === 'string' ? body.message.trim() : '';

		if (!name || !email || !message) {
			return json({ success: false, error: 'Name, email and message are required' }, { status: 400 });
		}
		if (name.length > 60 || email.length > 254 || message.length > 1000) {
			return json({ success: false, error: 'Input exceeds maximum length' }, { status: 400 });
		}
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			return json({ success: false, error: 'Invalid email address' }, { status: 400 });
		}

		if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
			console.error('SMTP not configured. Set SMTP_HOST, SMTP_USER and SMTP_PASS in .env');
			return json({ success: false, error: 'SMTP not configured' }, { status: 500 });
		}

		const transporter = nodemailer.createTransport({
			host: SMTP_HOST,
			port: Number(SMTP_PORT) || 587,
			secure: Number(SMTP_PORT) === 465,
			auth: { user: SMTP_USER, pass: SMTP_PASS }
		});

		await transporter.sendMail({
			from: `"SimbaFX Contact" <${SMTP_USER}>`,
			to: CONTACT_TO_EMAIL || SMTP_USER,
			replyTo: email,
			subject: `SimbaFX contact from ${name}`,
			text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
			html: contactEmailHtml(name, email, message)
		});

		return json({ success: true });
	} catch (error) {
		console.error('Failed to send contact email:', error);
		const message = error instanceof Error ? error.message : 'Failed to send email';
		return json({ success: false, error: message }, { status: 500 });
	}
};
