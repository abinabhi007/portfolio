import nodemailer from 'nodemailer';
import {
  buildLeadConfirmationEmail,
  buildLeadNotificationEmail,
} from '@/lib/contact-email';

export const runtime = 'nodejs';

const BRAND_NAME = 'Abin HN';
const DEFAULT_CONTACT_EMAIL = 'abinhn1@gmail.com';
const DEFAULT_SITE_URL = 'https://abinhn.vercel.app';

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function normalizePayload(body) {
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const service = typeof body.service === 'string' ? body.service.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';

  return { name, email, service, message };
}

function validatePayload(payload) {
  if (!payload.name || payload.name.length < 2) {
    return 'Please enter your name.';
  }

  if (!payload.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    return 'Please enter a valid email address.';
  }

  if (!payload.service) {
    return 'Please select a project/inquiry type.';
  }

  if (!payload.message || payload.message.length < 5) {
    return 'Please write a message with at least 5 characters.';
  }

  if (payload.message.length > 5000) {
    return 'Your message is too long (maximum 5000 characters).';
  }

  return null;
}

function createTransporter() {
  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_SECURE,
    SMTP_SERVICE,
    SMTP_EMAIL,
    SMTP_PASSWORD,
  } = process.env;

  if (!isNonEmptyString(SMTP_EMAIL) || !isNonEmptyString(SMTP_PASSWORD)) {
    throw new Error('Missing SMTP_EMAIL or SMTP_PASSWORD environment variables.');
  }

  if (isNonEmptyString(SMTP_HOST)) {
    return nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT ? Number(SMTP_PORT) : 587,
      secure: SMTP_SECURE === 'true',
      auth: {
        user: SMTP_EMAIL,
        pass: SMTP_PASSWORD,
      },
    });
  }

  return nodemailer.createTransport({
    service: SMTP_SERVICE || 'gmail',
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });
}

async function verifyRecaptcha(token) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!secretKey) {
    console.warn('RECAPTCHA_SECRET_KEY is not defined. Skipping reCAPTCHA validation.');
    return true;
  }

  if (!token) {
    return false;
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${encodeURIComponent(secretKey)}&response=${encodeURIComponent(token)}`,
    });

    const data = await response.json();
    return !!data.success;
  } catch (err) {
    console.error('reCAPTCHA verification failed to reach Google', err);
    return false;
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const payload = normalizePayload(body);
    const validationError = validatePayload(payload);

    if (validationError) {
      return Response.json({ message: validationError }, { status: 400 });
    }

    const isHuman = await verifyRecaptcha(body.recaptchaToken);
    if (!isHuman) {
      return Response.json(
        { message: 'reCAPTCHA verification failed. Please try again.' },
        { status: 400 }
      );
    }

    const transporter = createTransporter();
    const contactEmail = process.env.CONTACT_EMAIL_TO || DEFAULT_CONTACT_EMAIL;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL;
    const fromAddress =
      process.env.SMTP_FROM || `${BRAND_NAME} <${process.env.SMTP_EMAIL}>`;

    const leadNotification = buildLeadNotificationEmail({
      lead: payload,
      brandName: BRAND_NAME,
    });

    const leadConfirmation = buildLeadConfirmationEmail({
      lead: payload,
      brandName: BRAND_NAME,
      contactEmail,
      websiteUrl: siteUrl,
    });

    await Promise.all([
      transporter.sendMail({
        from: fromAddress,
        to: contactEmail,
        replyTo: payload.email,
        subject: `New Portfolio message from ${payload.name} - ${payload.service}`,
        html: leadNotification.html,
        text: leadNotification.text,
      }),
      transporter.sendMail({
        from: fromAddress,
        to: payload.email,
        replyTo: contactEmail,
        subject: leadConfirmation.subject,
        html: leadConfirmation.html,
        text: leadConfirmation.text,
      }),
    ]);

    return Response.json({
      message:
        'Message sent successfully! A confirmation has been sent to your inbox.',
    });
  } catch (error) {
    console.error('Contact form submission failed', error);

    return Response.json(
      {
        message:
          'Could not send your message right now. Please try again or email directly.',
      },
      { status: 500 }
    );
  }
}
