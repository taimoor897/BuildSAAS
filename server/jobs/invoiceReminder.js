import cron from "node-cron";
import Invoice from "../models/Invoice.js";
import Notification from "../models/Notification.js";
import { sendWhatsApp } from "../utils/whatsapp.js";
cron.schedule("*/10 * * * * *", async () => {
  try {
    console.log("Checking invoice payments...");

    const today = new Date();

    const invoices = await Invoice.find({
      status: {
        $in: ["Unpaid", "Partially Paid"],
      },
    }).populate("project");

    console.log(`Found ${invoices.length} unpaid invoices`);

    for (const invoice of invoices) {
      console.log(
        `Checking ${invoice.invoiceNumber}`,
        "Due:",
        invoice.dueDate,
        "Now:",
        today
      );

      if (new Date(invoice.dueDate) < today) {
        console.log(`${invoice.invoiceNumber} is overdue`);

        // --------------------------
        // WhatsApp (don't stop if it fails)
        // --------------------------
        if (invoice.project?.clientPhone) {
          try {
            await sendWhatsApp(
              invoice.project.clientPhone,
              `Hello ${invoice.clientName},

Your invoice ${invoice.invoiceNumber}  from 3ACES is overdue.

Amount: Rs ${invoice.amount}

Please complete your payment.

Thank you.`
            );

            console.log("WhatsApp sent");
          } catch (err) {
            console.log("WhatsApp failed:", err.message);
          }
        } else {
          console.log("No client phone found");
        }

        // --------------------------
        // Mark invoice overdue
        // --------------------------
        invoice.status = "Overdue";
        await invoice.save();

        console.log("Invoice status updated");

        // --------------------------
        // Create notification
        // --------------------------
        await Notification.create({
          user: invoice.createdBy,
          title: "Invoice Overdue",
          message: `${invoice.clientName}'s invoice ${invoice.invoiceNumber} is overdue.`,
          type: "invoice",
        });

        console.log("Notification created");
      }
    }
  } catch (error) {
    console.log("Invoice reminder error:", error);
  }
});