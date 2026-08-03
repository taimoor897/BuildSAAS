import React from "react";
import logo from "../assets/logo3.jpeg";

export default function WorkerInvoice({
  worker,
  salary,
  bonus, 
  deduction,
  total,
  paymentMethod,
  notes,
}) {
  return (
    <div
      id="invoice"
      style={{
        width: "760px",
        padding: "40px",
        background: "#ffffff",
        color: "#1f2937",
        fontFamily: "Arial, sans-serif",
        boxSizing: "border-box",
      }}
    >

      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "1px solid #e5e7eb",
          paddingBottom: "24px",
        }}
      >

        <div>
        <div className="flex items-center gap-4">
        <img
  src={logo}
  alt="Company Logo"
  style={{
    width: "160px",
    height: "160px",
    objectFit: "contain",
  }}
/>

  
</div>
        </div>


        <div style={{ textAlign: "right" }}>

          <h2
            style={{
              fontSize: "24px",
              fontWeight: "700",
              margin: 0,
            }}
          >
            PAYMENT INVOICE
          </h2>

          <p>
            Invoice # INV-{Date.now()}
          </p>

          <p>
            {new Date().toLocaleDateString()}
          </p>

        </div>

      </div>


      {/* Worker Information */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "40px",
          marginTop: "32px",
        }}
      >

        <div>

          <h3 style={{ fontSize: "20px" }}>
            Worker Information
          </h3>

          <p>
            <strong>Name:</strong> {worker?.name || "N/A"}
          </p>

          <p>
            <strong>Role:</strong> {worker?.role || "N/A"}
          </p>

          <p>
            <strong>Project:</strong> {worker?.assignedProject || "N/A"}
          </p>

          <p>
            <strong>Phone:</strong> {worker?.phone || "N/A"}
          </p>

        </div>


        <div>

          <h3 style={{ fontSize: "20px" }}>
            Payment
          </h3>

          <p>
            <strong>Method:</strong> {paymentMethod}
          </p>


          <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginTop: "12px",
  }}
>
  <strong>Status:</strong>

  <span
    style={{
      display: "inline-block",
      padding: "5px 12px",
      borderRadius: "20px",
      background: "#dcfce7",
      alignItems: "center",
      
      color: "#15803d",
      fontSize: "14px",
      fontWeight: "700",
    }}
  >
    PAID
  </span>
</div>

        </div>

      </div>



      {/* Payment Table */}
      <table
        style={{
          width: "100%",
          marginTop: "40px",
          borderCollapse: "collapse",
        }}
      >

        <thead>

          <tr
            style={{
              background: "#DAC37B",
              color: "#ffffff",
            }}
          >

            <th
              style={{
                padding: "12px",
                textAlign: "left",
              }}
            >
              Description
            </th>


            <th
              style={{
                padding: "12px",
                textAlign: "right",
              }}
            >
              Amount
            </th>

          </tr>

        </thead>


        <tbody>

          <tr>
            <td style={{ padding: "12px", borderBottom:"1px solid #ddd" }}>
              Salary
            </td>

            <td
              style={{
                padding: "12px",
                textAlign: "right",
                borderBottom:"1px solid #ddd",
              }}
            >
              Rs. {salary}
            </td>
          </tr>


          <tr>

            <td style={{ padding: "12px", borderBottom:"1px solid #ddd" }}>
              Bonus
            </td>

            <td
              style={{
                padding:"12px",
                textAlign:"right",
                borderBottom:"1px solid #ddd",
              }}
            >
              Rs. {bonus}
            </td>

          </tr>


          <tr>

            <td style={{ padding:"12px" }}>
              Deduction
            </td>

            <td
              style={{
                padding:"12px",
                textAlign:"right",
              }}
            >
              Rs. {deduction}
            </td>

          </tr>

        </tbody>

      </table>



      {/* Total */}
      <div
        style={{
          marginTop:"40px",
          padding:"24px",
          borderRadius:"16px",
          background:"#f0fdf4",
          textAlign:"center",
        }}
      >

        <p style={{ fontSize:"18px" }}>
          TOTAL PAID
        </p>


        <h1
          style={{
            fontSize:"48px",
            fontWeight:"700",
            color:"#15803d",
            margin:0,
          }}
        >
          Rs. {total}
        </h1>

      </div>



      {/* Notes */}
      <div style={{ marginTop:"32px" }}>

        <h3>
          Notes
        </h3>

        <p style={{ color:"#64748b" }}>
          {notes || "No additional notes"}
        </p>

      </div>



      {/* Footer */}
      <div
        style={{
          marginTop:"80px",
          display:"flex",
          justifyContent:"space-between",
        }}
      >

        <div>
          _______________________
          <p>Employer Signature</p>
        </div>


        <div>
          _______________________
          <p>Worker Signature</p>
        </div>

      </div>


    </div>
  );
}