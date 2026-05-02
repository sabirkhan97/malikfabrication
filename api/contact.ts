import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false });
  }

  try {
    console.log("Incoming:", req.body);

    const { fullName, phone, email, service, details } = req.body;

    if (!fullName || !phone) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // 🔥 IMPORTANT
    await transporter.verify();
    console.log("SMTP ready");

    await transporter.sendMail({
      from: `"Malik Fabrication" <${process.env.MAIL_USER}>`,
      to: process.env.RECEIVE_EMAIL,
      subject: `New Lead - ${fullName}`,
      text: `
Name: ${fullName}
Phone: ${phone}
Email: ${email || "-"}
Service: ${service || "-"}
Details: ${details || "-"}
      `,
    });

    console.log("MAIL SENT");

    return res.status(200).json({ success: true });

  } catch (error: any) {
    console.error("FULL ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}