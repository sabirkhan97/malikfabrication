import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

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

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS, // app password
      },
    });

    const formattedTime = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "long",
    });

    await transporter.sendMail({
      from: `"Malik Fabrication" <${process.env.MAIL_USER}>`,
      to: process.env.RECEIVE_EMAIL,
      replyTo: email || process.env.MAIL_USER,
      subject: "New Lead - Malik Fabrication",
      html: `
        <h2>New Lead</h2>
        <p><b>Date:</b> ${formattedTime}</p>
        <p><b>Name:</b> ${fullName}</p>
        <p><b>Phone:</b> ${phone}</p>
        ${email ? `<p><b>Email:</b> ${email}</p>` : ""}
        ${service ? `<p><b>Service:</b> ${service}</p>` : ""}
        ${details ? `<p><b>Details:</b> ${details}</p>` : ""}
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error: any) {
    console.error("Email error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to send message",
    });
  }
}