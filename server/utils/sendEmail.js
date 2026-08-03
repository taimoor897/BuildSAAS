import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});


export const sendEmail = async ({
    to,
    subject,
    html,
  }) => {
  
    console.log("Sending email to:", to);
  
    await transporter.sendMail({
  
        from: `"BuildPilot AI" <taimoorshahid788@gmail.com>`,
      to,
      subject,
      html,
  
    });
  
    console.log("Email sent successfully");
  
  };