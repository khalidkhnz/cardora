import "server-only";
import nodemailer from "nodemailer";
import { env } from "@/env";
import { platform, emailFrom } from "@/lib/platform";

function createTransporter() {
  return nodemailer.createTransport({
    host: env.SMTP_HOST ?? "smtp.gmail.com",
    port: env.SMTP_PORT ?? 587,
    secure: env.SMTP_SECURE ?? false,
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASS,
    },
  });
}

function isEmailConfigured(): boolean {
  return !!(env.SMTP_USER && env.SMTP_PASS);
}

export async function sendPasswordResetEmail(
  email: string,
  resetToken: string,
  origin: string,
) {
  const frontendUrl = origin;
  const resetUrl = `${frontendUrl}/reset-password?token=${resetToken}`;

  if (!isEmailConfigured()) {
    console.log("[Email] SMTP not configured. Reset link:", resetUrl);
    return { success: false, emailConfigured: false, resetUrl };
  }

  try {
    const transporter = createTransporter();
    await transporter.verify();

    await transporter.sendMail({
      from: emailFrom(env.SMTP_USER!),
      to: email,
      subject: `Password Reset Request - ${platform.name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: ${platform.brand.gradient}; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">${platform.name}</h1>
          </div>
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #333; margin-top: 0;">Password Reset Request</h2>
            <p>Hello,</p>
            <p>We received a request to reset your password for your ${platform.name} account.</p>
            <p>Click the button below to reset your password:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" style="background: ${platform.brand.gradient}; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">Reset Password</a>
            </div>
            <p>Or copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: ${platform.brand.primaryColor};">${resetUrl}</p>
            <p style="color: #666; font-size: 14px; margin-top: 30px;">
              <strong>Note:</strong> This link will expire in 1 hour. If you didn't request this password reset, please ignore this email.
            </p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
            <p style="color: #999; font-size: 12px; text-align: center;">
              This is an automated message. Please do not reply to this email.
            </p>
          </div>
        </body>
        </html>
      `,
      text: `Password Reset Request - ${platform.name}\n\nClick the following link to reset your password:\n${resetUrl}\n\nThis link will expire in 1 hour.`,
    });

    return { success: true };
  } catch (error) {
    console.error("[Email] Failed to send password reset email:", error);
    return { success: false, error: String(error), resetUrl };
  }
}

export async function sendPaymentSuccessEmail(
  toEmail: string,
  userName: string,
  payment: {
    id: string;
    amount: number;
    currency: string;
    purpose: string;
    createdAt: Date;
  },
  origin: string,
) {
  if (!isEmailConfigured()) {
    console.log("[Email] SMTP not configured. Payment success for:", toEmail);
    return { success: false, emailConfigured: false };
  }

  const frontendUrl = origin;
  const currencySymbol =
    payment.currency === "INR" ? "\u20B9" : payment.currency === "CAD" ? "C$" : "$";
  const paymentDate = payment.createdAt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  try {
    const transporter = createTransporter();

    await transporter.sendMail({
      from: emailFrom(env.SMTP_USER!),
      to: toEmail,
      subject: `Payment Successful - ${platform.name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: ${platform.brand.gradient}; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">${platform.name}</h1>
          </div>
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #333; margin-top: 0;">Payment Successful!</h2>
            <p>Hello ${userName},</p>
            <p>Your payment has been processed successfully.</p>
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #ddd;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; color: #666;"><strong>Transaction ID:</strong></td><td style="padding: 8px 0; text-align: right;">${payment.id}</td></tr>
                <tr><td style="padding: 8px 0; color: #666;"><strong>Date:</strong></td><td style="padding: 8px 0; text-align: right;">${paymentDate}</td></tr>
                <tr><td style="padding: 8px 0; color: #666;"><strong>Amount:</strong></td><td style="padding: 8px 0; text-align: right; font-size: 20px; font-weight: bold; color: #4caf50;">${currencySymbol}${(payment.amount / 100).toFixed(2)} ${payment.currency}</td></tr>
                <tr><td style="padding: 8px 0; color: #666;"><strong>Purpose:</strong></td><td style="padding: 8px 0; text-align: right;">${payment.purpose}</td></tr>
              </table>
            </div>
            <div style="text-align: center; margin-top: 20px;">
              <a href="${frontendUrl}/dashboard" style="background: ${platform.brand.gradient}; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">Go to Dashboard</a>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `Payment Successful - ${platform.name}\n\nHello ${userName},\n\nAmount: ${currencySymbol}${(payment.amount / 100).toFixed(2)} ${payment.currency}\nPurpose: ${payment.purpose}\nDate: ${paymentDate}`,
    });

    return { success: true };
  } catch (error) {
    console.error("[Email] Failed to send payment success email:", error);
    return { success: false, error: String(error) };
  }
}

export async function sendRSVPNotificationEmail(
  ownerEmail: string,
  guest: {
    name: string;
    email?: string;
    attending: string;
    numberOfGuests: number;
    dietaryRestrictions?: string;
    message?: string;
    phone?: string;
  },
  coupleName: string,
  origin: string,
) {
  if (!isEmailConfigured()) {
    console.log("[Email] SMTP not configured. RSVP notification for:", ownerEmail);
    return { success: false, emailConfigured: false };
  }

  const frontendUrl = origin;

  try {
    const transporter = createTransporter();

    await transporter.sendMail({
      from: emailFrom(env.SMTP_USER!),
      to: ownerEmail,
      subject: `New RSVP from ${guest.name} - ${platform.name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: ${platform.brand.gradient}; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">New RSVP!</h1>
          </div>
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="margin-top: 0;">Hi ${coupleName},</h2>
            <p>You have a new RSVP for your wedding invitation!</p>
            <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #ddd;">
              <p><strong>Guest:</strong> ${guest.name}</p>
              <p><strong>Attending:</strong> ${guest.attending === "yes" ? "Yes" : guest.attending === "no" ? "No" : "Maybe"}</p>
              <p><strong>Number of Guests:</strong> ${guest.numberOfGuests}</p>
              ${guest.dietaryRestrictions ? `<p><strong>Dietary Restrictions:</strong> ${guest.dietaryRestrictions}</p>` : ""}
              ${guest.message ? `<p><strong>Message:</strong> ${guest.message}</p>` : ""}
              ${guest.phone ? `<p><strong>Phone:</strong> ${guest.phone}</p>` : ""}
              ${guest.email ? `<p><strong>Email:</strong> ${guest.email}</p>` : ""}
            </div>
            <div style="text-align: center; margin-top: 20px;">
              <a href="${frontendUrl}/dashboard/rsvps" style="background: ${platform.brand.gradient}; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">View All RSVPs</a>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `New RSVP from ${guest.name}\n\nAttending: ${guest.attending}\nGuests: ${guest.numberOfGuests}`,
    });

    return { success: true };
  } catch (error) {
    console.error("[Email] Failed to send RSVP notification:", error);
    return { success: false, error: String(error) };
  }
}

export async function sendRSVPConfirmationEmail(
  guestEmail: string,
  guest: {
    name: string;
    numberOfGuests: number;
  },
  wedding: {
    coupleName: string;
    date?: string | null;
    venue?: string | null;
    slug: string;
  },
  origin: string,
) {
  if (!isEmailConfigured()) {
    console.log("[Email] SMTP not configured. RSVP confirmation for:", guestEmail);
    return { success: false, emailConfigured: false };
  }

  const frontendUrl = origin;
  const inviteUrl = `${frontendUrl}/wedding/${wedding.slug}`;
  const weddingDate = wedding.date
    ? new Date(wedding.date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  try {
    const transporter = createTransporter();

    await transporter.sendMail({
      from: emailFrom(env.SMTP_USER!),
      to: guestEmail,
      subject: `RSVP Confirmed — ${wedding.coupleName}'s Wedding`,
      html: `
        <!DOCTYPE html>
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: ${platform.brand.gradient}; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">You're In!</h1>
          </div>
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="margin-top: 0;">Hi ${guest.name},</h2>
            <p>Thank you for confirming your attendance at <strong>${wedding.coupleName}'s</strong> wedding! We're so excited to celebrate with you.</p>
            <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #ddd; margin: 20px 0;">
              <p style="margin: 8px 0;"><strong>Guests:</strong> ${guest.numberOfGuests}</p>
              ${weddingDate ? `<p style="margin: 8px 0;"><strong>Date:</strong> ${weddingDate}</p>` : ""}
              ${wedding.venue ? `<p style="margin: 8px 0;"><strong>Venue:</strong> ${wedding.venue}</p>` : ""}
            </div>
            <div style="text-align: center; margin-top: 20px;">
              <a href="${inviteUrl}" style="background: ${platform.brand.gradient}; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">View Invitation</a>
            </div>
            <p style="color: #999; font-size: 12px; text-align: center; margin-top: 30px;">
              ${platform.poweredByText}
            </p>
          </div>
        </body>
        </html>
      `,
      text: `Hi ${guest.name},\n\nThank you for confirming your attendance at ${wedding.coupleName}'s wedding!\n\nGuests: ${guest.numberOfGuests}${weddingDate ? `\nDate: ${weddingDate}` : ""}${wedding.venue ? `\nVenue: ${wedding.venue}` : ""}\n\nView invitation: ${inviteUrl}`,
    });

    return { success: true };
  } catch (error) {
    console.error("[Email] Failed to send RSVP confirmation:", error);
    return { success: false, error: String(error) };
  }
}
