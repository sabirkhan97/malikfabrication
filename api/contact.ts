import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const { fullName, phone, email, service, details } = req.body;

    if (!fullName || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name and phone are required",
      });
    }

    const formattedTime = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "long",
    });

    const { error } = await resend.emails.send({
      from: "Malik Fabrication <onboarding@resend.dev>",
      to: process.env.RECEIVE_EMAIL as string,
      subject: "New Lead - Malik Fabrication",
      html: `
        <h2>New Lead Received</h2>

        <p><b>Date & Time:</b> ${formattedTime}</p>
        <p><b>Name:</b> ${fullName}</p>
        <p><b>Phone:</b> <a href="tel:${phone}">${phone}</a></p>

        ${email ? `<p><b>Email:</b> ${email}</p>` : ""}
        ${service ? `<p><b>Service:</b> ${service}</p>` : ""}
        ${details ? `<p><b>Details:</b> ${details}</p>` : ""}

        <hr />
        <p style="color: gray; font-size: 12px;">
          Sent from Malik Fabrication Website
        </p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to send email",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("Email error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
}