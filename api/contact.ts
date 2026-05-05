import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false });
  }

  try {
    const { fullName, phone, email, service, details } = req.body;

    if (!fullName || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name and phone required",
      });
    }

    // ✅ CHECK ENV
    if (!process.env.GOOGLE_SCRIPT_URL) {
      throw new Error("Google Script URL not set");
    }

    // ✅ SAVE TO GOOGLE SHEET (MAIN SYSTEM)
    const sheetRes = await fetch(process.env.GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName,
        phone,
        email,
        service,
        details,
      }),
    });

    const text = await sheetRes.text();
    console.log("Sheet raw response:", text);

    let sheetData;

    try {
      sheetData = JSON.parse(text);
    } catch {
      throw new Error("Invalid response from Google Script");
    }
    
    if (!sheetData.success) {
      throw new Error("Failed to save lead in sheet");
    }

    console.log("✅ Saved to sheet");

    // ⚠️ OPTIONAL EMAIL (DON'T TRUST THIS)
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      });

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

      console.log("📩 Email sent");
    } catch (mailError) {
      console.error("⚠️ Email failed (lead still saved):", mailError);
    }

    return res.status(200).json({
      success: true,
      message: "Lead saved successfully",
    });

  } catch (error: any) {
    console.error("❌ FULL ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}