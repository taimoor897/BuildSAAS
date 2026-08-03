
import html2pdf from "html2pdf.js";
import { useEffect, useMemo, useRef, useState } from "react";

import ClientInvoice from "./ClientInvoice";
import InvoiceAttachments from "./InvoiceAttachments";
import { createInvoice } from "../pages/services/invoiceService";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";


export default function ClientInvoiceModal({
  open,
  project,
  onClose,
}) {

  const invoiceRef = useRef(null);
  const { user } = useAuth();

  const [items, setItems] = useState([
    {
      description: "",
      quantity: 1,
      unitCost: 0,
    },
  ]);

  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(0);
  const [notes, setNotes] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [dueDate, setDueDate] = useState("");
  useEffect(() => {
    if (open) {
      setItems([
        {
          description: "",
          quantity: 1,
          unitCost: 0,
        },
      ]);
      setDueDate("");
  
      setDiscount(0);
      setTax(0);
      setNotes("");
      setAttachments([]);
    }
  }, [open, project]);




  const invoiceNumber = "INV-" + Date.now();


  const updateItem = (index, field, value) => {
    const copy = [...items];

    copy[index][field] = value;

    setItems(copy);
  };


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


  const removeItem = (index) => {
    setItems(
      items.filter((_, i) => i !== index)
    );
  };


  const subtotal = useMemo(() => {

    return items.reduce(
      (sum, item) =>
        sum +
        Number(item.quantity || 0) *
          Number(item.unitCost || 0),
      0
    );

  }, [items]);


  const grandTotal =
    subtotal -
    Number(discount || 0) +
    Number(tax || 0);

    if (!open || !project) return null;



    const generateInvoice = async () => {
        try {
      
          if (!invoiceRef.current) {
            alert("Invoice not ready");
            return;
          }
      
      
          if (!dueDate) {
            alert("Please select invoice due date");
            return;
          }
      
      
          const invoiceData = {
      
            invoiceNumber,
      
            project: project._id,
      
            clientName: project.client,
      
            clientEmail: project.email || "",
      
            amount: grandTotal,
      
            dueDate: dueDate,
            createdBy: user._id,
      
      
            items: items.map((item)=>({
              description: item.description,
              quantity: Number(item.quantity),
              price: Number(item.unitCost),
            })),
      
      
            notes,
      
          };
      
      
          // SAVE IN DATABASE
          await createInvoice(invoiceData);
      
      
      
          // GENERATE PDF
      
          const options = {
      
            margin: 10,
      
            filename: `${project.client}-Invoice.pdf`,
      
            image:{
              type:"jpeg",
              quality:0.98,
            },
      
      
            html2canvas:{
              scale:2,
              useCORS:true,
              backgroundColor:"#ffffff",
            },
      
      
            jsPDF:{
              unit:"mm",
              format:"a4",
              orientation:"portrait",
            },
      
      
            pagebreak:{
              mode:["css"],
              before:".attachment-page",
            },
      
          };
      
      
      
          await html2pdf()
            .set(options)
            .from(invoiceRef.current)
            .save();
      
      
      
          Swal.fire({
  icon: "success",
  title: "Invoice Created!",
  text: "The invoice has been downloaded successfully.",
  timer: 1800,
  showConfirmButton: false,
});
      
      
        } catch(error){
      
          console.error(
            "Invoice Error:",
            error
          );
      
      
          alert(
            "Failed to create invoice"
          );
      
        }
      };
 



  return (

    <>

<div className="fixed inset-0 z-50 bg-black/50">

<div
className="
absolute
inset-x-0
bottom-0
max-h-[95vh]
overflow-y-auto
rounded-t-3xl
bg-white
p-3
sm:relative
sm:mx-auto
sm:mt-10
sm:max-w-5xl
sm:rounded-3xl
sm:p-8
"
>


          <div className="mb-8 flex justify-between">

            <h2 className="text-3xl font-bold">
              Client Invoice
            </h2>


            <button
              onClick={onClose}
              className="rounded-xl bg-red-500 px-5 py-2 text-white"
            >
              Close
            </button>

          </div>



          <div className="grid gap-3 md:grid-cols-2 md:gap-6">


            <div>

            <label className="text-sm font-semibold sm:text-base">
                Client Name
              </label>

              <input
                disabled
                value={project.client}
                className="mt-2 w-full rounded-xl border bg-slate-100 p-2 text-sm sm:p-3"
              />

            </div>



            <div>

            <label className="text-sm font-semibold sm:text-base">
                Site
              </label>

              <input
                disabled
                value={project.location}
                className="mt-2 w-full rounded-xl border bg-slate-100 p-2 text-sm sm:p-3"
              />

            </div>



            <div>

            <label className="text-sm font-semibold sm:text-base">
                Invoice Number
              </label>

              <input
                disabled
                value={invoiceNumber}
                className="mt-2 w-full rounded-xl border bg-slate-100 p-2 text-sm sm:p-3"
              />

            </div>



            <div>

            <label className="text-sm font-semibold sm:text-base">
                Date
              </label>

              <input
                disabled
                value={new Date().toLocaleDateString()}
                className="mt-2 w-full rounded-xl border bg-slate-100 p-2 text-sm sm:p-3"
              />

            </div>
            <div>

<label className="text-sm font-semibold sm:text-base">
  Due Date
</label>

<input
  type="date"
  value={dueDate}
  onChange={(e)=>setDueDate(e.target.value)}
  className="mt-2 w-full rounded-xl border bg-white p-2 text-sm sm:p-3"
/>

</div>


          </div>



          <div className="mt-10 overflow-x-auto">

<table className="min-w-[700px] w-full border">


              <thead className="bg-blue-600 text-white">

                <tr>

                  <th className="p-3">
                    Item
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
                        className="w-full rounded border p-1.5 text-sm sm:p-2"
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
                        className="w-16 rounded border p-1 text-sm sm:w-20 sm:p-2"
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
                        className="w-24 rounded border p-1 text-sm sm:w-32 sm:p-2"
                      />

                    </td>



                    <td className="p-2 font-bold">

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
                        X
                      </button>

                    </td>


                  </tr>

                ))}


              </tbody>


            </table>



            <button
              onClick={addItem}
              className="mt-5 rounded-xl bg-blue-600 px-5 py-3 text-white"
            >
              + Add Item
            </button>


          </div>




          <div className="mt-10 grid gap-6 md:grid-cols-2">


            <div>

              <label className="font-semibold">
                Notes
              </label>

              <textarea
                rows={5}
                value={notes}
                onChange={(e)=>
                  setNotes(e.target.value)
                }
                className="mt-2 w-full rounded-xl border p-3"
              />

            </div>



            <div className="rounded-2xl bg-slate-50 p-6">


              <label>
                Discount
              </label>

              <input
                type="number"
                value={discount}
                onChange={(e)=>
                  setDiscount(e.target.value)
                }
                className="mb-4 mt-2 w-full rounded border p-2"
              />



              <label>
                Tax
              </label>

              <input
                type="number"
                value={tax}
                onChange={(e)=>
                  setTax(e.target.value)
                }
                className="mb-6 mt-2 w-full rounded border p-2"
              />



              <div className="text-lg">


                <div className="flex justify-between">
                  <span>
                    Subtotal
                  </span>

                  <span>
                    Rs. {subtotal.toLocaleString()}
                  </span>

                </div>



                <div className="flex justify-between">

                  <span>
                    Discount
                  </span>

                  <span>
                    Rs. {Number(discount).toLocaleString()}
                  </span>

                </div>



                <div className="flex justify-between">

                  <span>
                    Tax
                  </span>

                  <span>
                    Rs. {Number(tax).toLocaleString()}
                  </span>

                </div>



                <hr className="my-3"/>



                <div className="flex justify-between text-2xl font-bold text-green-700">

                  <span>
                    Grand Total
                  </span>

                  <span>
                    Rs. {grandTotal.toLocaleString()}
                  </span>

                </div>


              </div>


            </div>


          </div>




          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-end">


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




      {/* Hidden invoice for PDF */}

      
      <div
  style={{
    position: "absolute",
    top: "0",
    left: "0",
    width: "760px",
    background: "#ffffff",
    visibility: "hidden",
  }}
>
<div ref={invoiceRef}>

<ClientInvoice
 project={project}
 items={items}
 grandTotal={grandTotal}
/>

<div
  className="attachment-page"
  style={{
    pageBreakBefore: "always",
    breakBefore: "page",
  }}
>
  <InvoiceAttachments
    attachments={attachments}
  />
</div>


</div>

      </div>


    </>

  );
}