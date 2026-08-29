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

export const POST: RequestHandler = async ({ request }) => {
	try {
		const body = await request.json();
		const name = typeof body?.name === 'string' ? body.name.trim() : '';
		const message = typeof body?.message === 'string' ? body.message.trim() : '';

		if (!name || !message) {
			return json({ success: false, error: 'Name and message are required' }, { status: 400 });
		}
		if (name.length > 60 || message.length > 1000) {
			return json({ success: false, error: 'Input exceeds maximum length' }, { status: 400 });
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
			subject: `SimbaFX contact from ${name}`,
			text: `Name: ${name}\n\n${message}`,
			html: `<p><strong>Name:</strong> ${escapeHtml(name)}</p><p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>`
		});

		return json({ success: true });
	} catch (error) {
		console.error('Failed to send contact email:', error);
		return json({ success: false, error: 'Failed to send email' }, { status: 500 });
	}
};
