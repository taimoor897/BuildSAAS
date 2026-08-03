import { useRef, useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

import ClientInvoice from "./ClientInvoice";

export default function InvoiceModal({
  project,
  open,
  onClose,
}) {

  const invoiceRef = useRef(null);
  const [attachments, setAttachments] = useState([]);

  const [items, setItems] = useState([
    {
      description: "",
      quantity: 1,
      unitCost: 0,
    },
  ]);


  if (!open || !project) return null;


  const addItem = () => {
    setItems([
      ...items,
      {
        description: "",
        quantity: 1,
        unitCost: 0,
      },
    ]);
  };


  const updateItem = (index, field, value) => {
    const updated = [...items];

    updated[index][field] = value;

    setItems(updated);
  };


  const removeItem = (index) => {
    setItems(
      items.filter((_, i) => i !== index)
    );
  };


  const grandTotal = items.reduce(
    (sum, item) =>
      sum +
      Number(item.quantity || 0) *
        Number(item.unitCost || 0),
    0
  );


  const generateInvoice = async () => {

    try {

      if (!invoiceRef.current) {
        alert("Invoice element not found");
        return;
      }


      const canvas = await html2canvas(
        invoiceRef.current,
        {
          scale: 2,
          useCORS: true,
          backgroundColor: "#ffffff",
          logging: false,
        }
      );


      const imgData =
        canvas.toDataURL("image/png");


      const pdf = new jsPDF(
        "p",
        "mm",
        "a4"
      );


      const pageWidth =
        pdf.internal.pageSize.getWidth();


      const imgWidth =
        pageWidth - 20;


      const imgHeight =
        (canvas.height * imgWidth) /
        canvas.width;


      pdf.addImage(
        imgData,
        "PNG",
        10,
        10,
        imgWidth,
        imgHeight
      );


      pdf.save(
        `${project.client}-Invoice.pdf`
      );


    } catch (err) {

      console.error(
        "PDF ERROR:",
        err
      );

      alert(
        "Failed to generate invoice"
      );

    }

  };


  return (

    <>

      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5">

        <div className="max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-3xl bg-white p-8">


          <h2 className="mb-8 text-3xl font-bold">
            Client Invoice
          </h2>



          <label className="font-medium">
            Client Name
          </label>

          <input
            value={project.client}
            disabled
            className="mt-2 mb-5 w-full rounded-xl border bg-slate-100 p-3"
          />



          <label className="font-medium">
            Site
          </label>

          <input
            value={project.location}
            disabled
            className="mt-2 mb-8 w-full rounded-xl border bg-slate-100 p-3"
          />



          <table className="w-full border">

            <thead className="bg-slate-100">

              <tr>

                <th className="p-3 text-left">
                  Description
                </th>

                <th className="p-3">
                  Qty
                </th>

                <th className="p-3">
                  Unit Cost
                </th>

                <th className="p-3">
                  Total
                </th>

                <th className="p-3">
                </th>

              </tr>

            </thead>


            <tbody>

              {items.map((item,index)=>(

                <tr key={index}>

                  <td className="p-2">

                    <input
                      value={item.description}
                      onChange={(e)=>
                        updateItem(
                          index,
                          "description",
                          e.target.value
                        )
                      }
                      className="w-full rounded border p-2"
                    />

                  </td>


                  <td className="p-2">

                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e)=>
                        updateItem(
                          index,
                          "quantity",
                          e.target.value
                        )
                      }
                      className="w-20 rounded border p-2"
                    />

                  </td>


                  <td className="p-2">

                    <input
                      type="number"
                      value={item.unitCost}
                      onChange={(e)=>
                        updateItem(
                          index,
                          "unitCost",
                          e.target.value
                        )
                      }
                      className="w-32 rounded border p-2"
                    />

                  </td>


                  <td className="font-bold">
                    Rs.{" "}
                    {
                      (
                        Number(item.quantity) *
                        Number(item.unitCost)
                      ).toLocaleString()
                    }
                  </td>


                  <td>

                    <button
                      onClick={() =>
                        removeItem(index)
                      }
                      className="text-red-600"
                    >
                      ✕
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>



          <button
            onClick={addItem}
            className="mt-6 rounded-xl bg-blue-600 px-5 py-3 text-white"
          >
            + Add Item
          </button>



          <div className="mt-8 rounded-2xl bg-green-50 p-6">

            <h2 className="text-3xl font-bold text-green-700">
              Grand Total
            </h2>

            <p className="text-4xl font-bold">
              Rs. {grandTotal.toLocaleString()}
            </p>

          </div>



          <div className="mt-8 flex justify-end gap-4">

            <button
              onClick={onClose}
              className="rounded-xl bg-gray-300 px-6 py-3"
            >
              Cancel
            </button>

            <div className="mt-8">

<label className="font-semibold">
  Attach Files
</label>

<input
  type="file"
  multiple
  accept="image/*,.pdf"
  onChange={(e)=>{

    setAttachments(
      Array.from(e.target.files)
    );

  }}
  className="mt-2 w-full rounded-xl border p-3"
/>


</div>


            <button
              onClick={generateInvoice}
              className="rounded-xl bg-green-600 px-6 py-3 text-white"
            >
              Generate Invoice
            </button>

          </div>


        </div>

      </div>



      {/* Hidden Invoice For PDF */}

      <div
        style={{
          position:"fixed",
          top:0,
          left:0,
          opacity:0,
          pointerEvents:"none",
        }}
      >

        <div ref={invoiceRef}>

          <ClientInvoice
            project={project}
            items={items}
            grandTotal={grandTotal}
          />

        </div>

      </div>


    </>
  );
}