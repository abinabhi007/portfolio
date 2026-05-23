function escapeHtml(value) {
  if (!value) return '';
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export function buildLeadNotificationEmail({ lead, brandName }) {
  const html = `
    <div style="background:#f7f5f0; padding:32px 16px; font-family:'DM Sans', Arial, sans-serif; color:#1a1814;">
      <div style="max-width:600px; margin:0 auto; background:#ffffff; border-radius:12px; padding:36px; border:1px solid #e4e0d8; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
        <p style="margin:0 0 10px; font-size:12px; letter-spacing:0.15em; text-transform:uppercase; color:#d4622a; font-weight:600;">New Message</p>
        <h1 style="margin:0 0 24px; font-size:24px; color:#1a1814; font-family:'DM Serif Display', Georgia, serif; font-weight:normal;">New Portfolio Inquiry</h1>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse; font-size:15px; line-height:1.6;">
          <tr>
            <td style="padding:12px 0; border-bottom:1px solid #e4e0d8; font-weight:600; width:150px; color:#6b6760;">Name</td>
            <td style="padding:12px 0; border-bottom:1px solid #e4e0d8; color:#1a1814;">${escapeHtml(lead.name)}</td>
          </tr>
          <tr>
            <td style="padding:12px 0; border-bottom:1px solid #e4e0d8; font-weight:600; color:#6b6760;">Email</td>
            <td style="padding:12px 0; border-bottom:1px solid #e4e0d8; color:#1a1814;"><a href="mailto:${escapeHtml(lead.email)}" style="color:#d4622a; text-decoration:none;">${escapeHtml(lead.email)}</a></td>
          </tr>
          <tr>
            <td style="padding:12px 0; border-bottom:1px solid #e4e0d8; font-weight:600; color:#6b6760;">Project Type</td>
            <td style="padding:12px 0; border-bottom:1px solid #e4e0d8; color:#1a1814;">${escapeHtml(lead.service)}</td>
          </tr>
          <tr>
            <td style="padding:16px 0 0; font-weight:600; color:#6b6760; vertical-align:top;">Message</td>
            <td style="padding:16px 0 0; color:#1a1814; white-space:pre-wrap;">${escapeHtml(lead.message?.trim() || 'No message details provided.')}</td>
          </tr>
        </table>
      </div>
    </div>
  `;

  const text = [
    `New Portfolio Message for ${brandName}`,
    '',
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    `Interest/Project: ${lead.service}`,
    `Message: ${lead.message?.trim() || 'No message details provided.'}`,
  ].join('\n');

  return { html, text };
}

export function buildLeadConfirmationEmail({
  lead,
  brandName,
  contactEmail,
  websiteUrl,
}) {
  const subject = `Thanks for reaching out! | ${brandName}`;
  const safeName = escapeHtml(lead.name);
  const safeBrandName = escapeHtml(brandName);
  const safeEmail = escapeHtml(contactEmail);
  const safeWebsiteUrl = escapeHtml(websiteUrl);

  const html = `
    <div style="background:#f7f5f0; padding:40px 16px; font-family:'DM Sans', Arial, sans-serif; color:#1a1814;">
      <div style="max-width:600px; margin:0 auto; background:#ffffff; border-radius:16px; padding:40px 32px; box-shadow: 0 10px 30px rgba(212, 98, 42, 0.05); border: 1px solid #e4e0d8;">
        <div style="text-align:center;">
          <div style="font-size:24px; letter-spacing:0.05em; font-family:'DM Serif Display', Georgia, serif; font-weight:normal; color:#1a1814; margin-bottom:24px; text-transform:uppercase;">
            ${safeBrandName}
          </div>
          <h1 style="margin:0 0 16px; font-size:28px; line-height:1.2; color:#1a1814; font-family:'DM Serif Display', Georgia, serif; font-weight:normal;">Message Received</h1>
          <p style="margin:0 0 16px; font-size:16px; color:#1a1814; font-weight:500;">Hi ${safeName},</p>
          <p style="margin:0 auto 20px; max-width:480px; font-size:15px; line-height:1.6; color:#6b6760;">
            Thank you for reaching out! I've received your message regarding a <strong>${escapeHtml(lead.service)}</strong> and will review it as soon as possible.
          </p>
          <p style="margin:0 auto 30px; max-width:480px; font-size:15px; line-height:1.6; color:#6b6760;">
            I usually reply within 24–48 hours. If you want to connect immediately, you can also reach out to me directly at
            <a href="mailto:${safeEmail}" style="color:#d4622a; font-weight:600; text-decoration:none;">${safeEmail}</a>.
          </p>
          <a
            href="${safeWebsiteUrl}"
            style="display:inline-block; background:#d4622a; color:#ffffff; text-decoration:none; padding:12px 28px; border-radius:30px; font-size:14px; font-weight:600; letter-spacing:0.02em; box-shadow: 0 4px 15px rgba(212, 98, 42, 0.2);"
          >
            Visit My Portfolio
          </a>
          <p style="margin:32px auto 8px; font-size:15px; color:#6b6760;">
            Looking forward to speaking with you!
          </p>
          <p style="margin:0; font-size:15px; color:#1a1814;">
            Best regards,<br />
            <strong>${safeBrandName}</strong>
          </p>
        </div>
        <p style="margin:40px 0 0; text-align:center; font-size:12px; color:#6b6760; border-top:1px solid #e4e0d8; padding-top:20px;">
          &copy; ${new Date().getFullYear()} ${safeBrandName}. All rights reserved.
        </p>
      </div>
    </div>
  `;

  const text = [
    `Thanks for reaching out to ${brandName}`,
    '',
    `Hi ${lead.name},`,
    '',
    `Thank you for reaching out! I've received your message regarding a ${lead.service} and will review it as soon as possible.`,
    `I usually reply within 24–48 hours. If you want to connect immediately, you can reach out directly to ${contactEmail}.`,
    '',
    `Visit my portfolio: ${websiteUrl}`,
    '',
    `Looking forward to speaking with you!`,
    `Best regards,`,
    `${brandName}`,
  ].join('\n');

  return { subject, html, text };
}
