import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { getInvoices } from "../services/invoiceService";
import { updatePayment } from "../services/invoiceService";
import InvoiceViewerModal from "../../components/InvoiceViewerModal";
export default function Invoices() {

  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
const [viewerOpen, setViewerOpen] = useState(false);
const [search, setSearch] = useState("");


  const loadInvoices = async () => {
    try {

      const data = await getInvoices();

      setInvoices(data.invoices || []);

    } catch(error) {

      console.error(
        "Invoice loading error:",
        error
      );

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {
    loadInvoices();
  }, []);


  const markPaymentDone = async (invoice) => {

    try {
  
      const data = await updatePayment(
        invoice._id,
        invoice.amount
      );
  
  
      setInvoices((prev) =>
        prev.map((item) =>
          item._id === invoice._id
            ? data.invoice
            : item
        )
      );
      window.dispatchEvent(
        new Event("notificationsUpdated")
      );
  
  
    } catch(error) {
  
      console.log(
        "Payment update error:",
        error
      );
  
      alert("Payment update failed");
  
    }
  

  };

  const openInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setViewerOpen(true);
  };

  const filteredInvoices = invoices.filter((invoice) =>
  invoice.clientName
    ?.toLowerCase()
    .includes(search.toLowerCase())
);



  return (
    <DashboardLayout>


      <div className="mb-8">

        <h1 className="text-4xl font-bold">
          Invoices
        </h1>

        <p className="mt-2 text-slate-500">
          Manage client invoices and payments.
        </p>

        <div className="mb-6">
  <input
    type="text"
    placeholder="Search by client name..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full max-w-md rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-600 focus:outline-none"
  />
</div>

      </div>



      {loading ? (

        <div className="rounded-2xl bg-white p-10 shadow">
          Loading invoices...
        </div>


      ) : invoices.length === 0 ? (

        <div className="rounded-2xl bg-white p-10 text-center shadow">

          <h2 className="text-2xl font-bold">
            No Invoices Found
          </h2>

          <p className="mt-2 text-slate-500">
            Generate an invoice from a project first.
          </p>

        </div>


      ) : (


        <div className="overflow-x-auto rounded-2xl bg-white shadow">


<table className="w-full">

<thead className="border-b bg-slate-100">

<tr>

<th className="p-4 text-left">
  Invoice
</th>

<th className="p-4 text-left">
  Client
</th>

<th className="p-4 text-left">
  Amount
</th>

<th className="p-4 text-left">
  Due Date
</th>

<th className="p-4 text-left">
  Status
</th>

<th className="p-4 text-left">
  Action
</th>

</tr>

</thead>


<tbody>

{filteredInvoices.map((invoice) => (

<tr
key={invoice._id}
className="border-b"
>


<td className="p-4 font-semibold">
{invoice.invoiceNumber}
</td>


<td className="p-4">
{invoice.clientName}
</td>


<td className="p-4">
Rs. {invoice.amount.toLocaleString()}
</td>


<td className="p-4">

{new Date(
invoice.dueDate
).toLocaleDateString()}

</td>


<td className="p-4">


<span
className={`
rounded-full
px-4
py-2
text-sm
font-semibold

${
invoice.status === "Paid"
?
"bg-green-100 text-green-700"
:
invoice.status === "Overdue"
?
"bg-red-100 text-red-700"
:
"bg-yellow-100 text-yellow-700"
}

`}
>

{invoice.status}

</span>


</td>



<td className="p-4">

  <div className="flex flex-wrap gap-2">

    <button
      onClick={() => openInvoice(invoice)}
      className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
    >
      View PDF
    </button>

    {invoice.status !== "Paid" ? (
      <button
        onClick={() => markPaymentDone(invoice)}
        className="rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
      >
        Payment Done
      </button>
    ) : (
      <span className="self-center text-sm font-semibold text-green-600">
        Completed ✓
      </span>
    )}

  </div>

</td>


</tr>


))}


</tbody>


</table>


        </div>


      )}


<InvoiceViewerModal
  open={viewerOpen}
  invoice={selectedInvoice}
  onClose={() => {
    setViewerOpen(false);
    setSelectedInvoice(null);
  }}
/>


    </DashboardLayout>
  );
}