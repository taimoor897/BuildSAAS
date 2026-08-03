import { useRef } from "react";
import html2pdf from "html2pdf.js";

import ClientInvoice from "./ClientInvoice";

export default function InvoiceViewerModal({
  open,
  invoice,
  onClose,
}) {
  const invoiceRef = useRef(null);

  if (!open || !invoice) return null;

  const items = invoice.items.map((item) => ({
    description: item.description,
    quantity: item.quantity,
    unitCost: item.price,
  }));

  const downloadPDF = async () => {

    if (!invoiceRef.current) {
      alert("Invoice not ready");
      return;
    }
  
  
    try {
  
      const options = {
        margin: 0,
        filename: `${invoice.clientName}-Invoice.pdf`,
        image: {
          type: "jpeg",
          quality: 0.98,
        },
        html2canvas: {
          scale: 2,
          useCORS: true,
          width: 800,
        },
        jsPDF: {
          unit: "px",
          format: [850, 1100],
          orientation: "portrait",
        },
      };
  
  
      await html2pdf()
        .set(options)
        .from(invoiceRef.current)
        .save();
  
  
    } catch(error){
  
      console.error("PDF ERROR:", error);
      alert("PDF generation failed");
  
    }
  
  };

  const printInvoice = () => {
    const printContents = invoiceRef.current.innerHTML;

    const win = window.open("", "", "width=900,height=700");

    win.document.write(`
      <html>
      <head>
        <title>Invoice</title>
      </head>
      <body>
        ${printContents}
      </body>
      </html>
    `);

    win.document.close();
    win.focus();
    win.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6">
      <div className="max-h-[95vh] w-full max-w-6xl overflow-auto rounded-3xl bg-white shadow-2xl">

        <div className="flex items-center justify-between border-b p-6">

          <h2 className="text-2xl font-bold">
            Invoice Preview
          </h2>

          <div className="flex gap-3">

            <button
              onClick={downloadPDF}
              className="rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white"
            >
              Download PDF
            </button>

            <button
              onClick={printInvoice}
              className="rounded-xl bg-slate-700 px-4 py-2 font-semibold text-white"
            >
              Print
            </button>

            <button
              onClick={onClose}
              className="rounded-xl bg-red-600 px-4 py-2 font-semibold text-white"
            >
              Close
            </button>

          </div>

        </div>

        <div
  ref={invoiceRef}
  style={{
    background:"#fff",
    padding:"20px",
  }}
>
          <ClientInvoice
            project={invoice.project}
            items={items}
            grandTotal={invoice.amount}
            invoiceDate={invoice.createdAt}
          />
        </div>

      </div>
    </div>
  );
}