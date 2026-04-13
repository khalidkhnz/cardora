import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import nodemailer from "nodemailer";
import { env } from "@/env";
import { platform, emailFrom } from "@/lib/platform";

const contactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  message: z.string().min(1).max(2000),
});

const CONTACT_EMAIL = "info@cardoradigital.ca";

export async function POST(request: NextRequest) {
  const rawBody: unknown = await request.json();
  const parsed = contactSchema.safeParse(rawBody);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { name, email, message } = parsed.data;

  // If SMTP is not configured, log and return success (don't block the user)
  if (!env.SMTP_USER || !env.SMTP_PASS) {
    console.log("[Contact] SMTP not configured. Message from:", name, email, message);
    return NextResponse.json({ success: true });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: env.SMTP_HOST ?? "smtp.gmail.com",
      port: env.SMTP_PORT ?? 587,
      secure: env.SMTP_SECURE ?? false,
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: emailFrom(env.SMTP_USER),
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `New Contact Form Message - ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: ${platform.brand.gradient}; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Message</h1>
          </div>
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
            <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #ddd;">
              <p style="margin: 8px 0;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p style="margin: 8px 0;"><strong>Message:</strong></p>
              <p style="margin: 8px 0; white-space: pre-wrap; color: #555;">${message}</p>
            </div>
            <p style="color: #999; font-size: 12px; text-align: center; margin-top: 20px;">
              Reply directly to this email to respond to ${name}.
            </p>
          </div>
        </body>
        </html>
      `,
      text: `New Contact Message\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Contact] Failed to send email:", error);
    return NextResponse.json({ success: true }); // Don't expose email errors to the user
  }
}
