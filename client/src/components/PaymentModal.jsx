import { useState, useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import WorkerInvoice from "./WorkerInvoice";

export default function PaymentModal({
    worker,
    open,
    onClose,
  }) {
    
    const [salary, setSalary] = useState("");
    const [bonus, setBonus] = useState(0);
    const [deduction, setDeduction] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [notes, setNotes] = useState("");
  const invoiceRef = useRef(null);
  if (!open || !worker) return null;

  const total =
  Number(salary || 0) +
  Number(bonus || 0) -
  Number(deduction || 0);






  const generateInvoice = async () => {
    try {
      if (!invoiceRef.current) {
        alert("Invoice not ready");
        return;
      }
  
      const canvas = await html2canvas(invoiceRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });
  
      const imgData = canvas.toDataURL("image/png");
  
      const pdf = new jsPDF("p", "mm", "a4");
  
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
  
      const imgWidth = pageWidth - 20; // 10mm margin each side
      const imgHeight =
        (canvas.height * imgWidth) / canvas.width;
  
      let heightLeft = imgHeight;
      let position = 10;
  
      pdf.addImage(
        imgData,
        "PNG",
        10,
        position,
        imgWidth,
        imgHeight
      );
  
      heightLeft -= pageHeight;
  
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
  
        pdf.addPage();
  
        pdf.addImage(
          imgData,
          "PNG",
          10,
          position,
          imgWidth,
          imgHeight
        );
  
        heightLeft -= pageHeight;
      }
  
      pdf.save(`${worker.name}-Payment-Invoice.pdf`);
  
    } catch (err) {
      console.error("Invoice Error:", err);
      alert(err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

  <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">

        <h2 className="mb-6 text-2xl font-bold">
          Pay Worker
        </h2>

        {/* Worker Name */}
        <label className="font-medium">Worker Name</label>
        <input
          value={worker.name}
          disabled
          className="mt-2 mb-4 w-full rounded-lg border p-3 bg-slate-100"
        />

        {/* Role */}
        <label className="font-medium">Role</label>
        <input
          value={worker.role}
          disabled
          className="mt-2 mb-4 w-full rounded-lg border p-3 bg-slate-100"
        />

        {/* Date */}
        <label className="font-medium">Date</label>
        <input
          value={new Date().toLocaleDateString()}
          disabled
          className="mt-2 mb-4 w-full rounded-lg border p-3 bg-slate-100"
        />

        {/* Salary */}
        <label className="font-medium">Salary</label>
        <input
  type="number"
  value={salary}
  onChange={(e) => setSalary(e.target.value)}
  placeholder="Enter payment amount"
  className="mt-2 mb-4 w-full rounded-lg border p-3"
/>

      

        {/* Payment Method */}
        <label className="font-medium">Payment Method</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="mt-2 mb-4 w-full rounded-lg border p-3"
        >
          <option>Cash</option>
          <option>Bank Transfer</option>
          <option>JazzCash</option>
          <option>EasyPaisa</option>
        </select>

        {/* Notes */}
        <label className="font-medium">Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="mt-2 mb-4 w-full rounded-lg border p-3"
          rows={3}
        />

        {/* Total */}
        <div className="mb-6 rounded-xl bg-green-50 p-4">
          <h3 className="text-xl font-bold text-green-700">
            Total: Rs. {total.toLocaleString()}
          </h3>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg bg-gray-300 px-5 py-2"
          >
            Cancel
          </button>

          <button
  onClick={generateInvoice}
  className="rounded-lg bg-green-600 px-5 py-2 text-white"
>
  Generate Invoice
</button>
        </div>

      </div>

      <div
  style={{
    position: "fixed",
    left: "-10000px",
    top: 0,
    background: "#ffffff",
    width: "800px",
    padding: "40px",
  }}
>
  <div
    ref={invoiceRef}
    style={{
      background: "#ffffff",
      color: "#111827",
    }}
  >
    <WorkerInvoice
      worker={worker}
      salary={salary}
      bonus={bonus}
      deduction={deduction}
      total={total}
      paymentMethod={paymentMethod}
      notes={notes}
    />
  </div>
</div>
    </div>
  );
}