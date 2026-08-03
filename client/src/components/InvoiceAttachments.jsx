export default function InvoiceAttachments({ attachments }) {

    return (
      <div
        style={{
          width: "760px",
          minHeight: "980px",
          padding: "40px",
          background: "#fff",
          fontFamily: "Arial",
          boxSizing: "border-box",
        }}
      >
  
        <h2>
          Attachments
        </h2>
  
  
        {attachments.map((file,index)=>(
          <div
            key={index}
            style={{
              marginBottom:"30px",
              pageBreakInside:"avoid",
              breakInside:"avoid",
            }}
          >
  
            <p>
              📎 {file.name}
            </p>
  
  
            {file.type.startsWith("image/") && (
              <img
                src={URL.createObjectURL(file)}
                alt="attachment"
                style={{
                  width:"500px",
                  height:"500px",
                  objectFit:"contain",
                }}
              />
            )}
  
          </div>
        ))}
  
      </div>
    );
  }