import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";


export default function SettingsPage(){

  const [whatsapp,setWhatsapp] = useState(null);


  const loadWhatsApp = async()=>{

    try{

      const res = await fetch(
        "http://localhost:5000/api/whatsapp/status"
      );


      const data = await res.json();

      setWhatsapp(data);


    }catch(error){

      console.log(
        "WhatsApp status error",
        error
      );

    }

  };



  useEffect(()=>{

    loadWhatsApp();


    const interval = setInterval(
      loadWhatsApp,
      5000
    );


    return ()=>clearInterval(interval);


  },[]);


  const changeWhatsApp = async()=>{

    if(!confirm(
      "Change WhatsApp number?"
    )) return;
  
  
    await fetch(
      "http://localhost:5000/api/whatsapp/reset",
      {
        method:"POST"
      }
    );
  
  
    loadWhatsApp();
  
  };



  return (

    <DashboardLayout>


      <div className="mb-8">

        <h1 className="text-4xl font-bold">
          Settings
        </h1>

        <p className="mt-2 text-slate-500">
          Manage your BuildPilot AI settings.
        </p>

      </div>



      <div className="
        max-w-xl
        rounded-2xl
        bg-white
        p-6
        shadow
      ">


        <h2 className="
          mb-6
          text-2xl
          font-bold
        ">
          WhatsApp Integration
        </h2>



        {
          whatsapp?.connected ? (

            <>

            <div className="
              mb-4
              rounded-xl
              bg-green-100
              p-4
              text-green-700
              font-semibold
            ">

              🟢 WhatsApp Connected

            </div>


            <p>
              <strong>
                Number:
              </strong>

              {" "}
              +{whatsapp.number}

            </p>

            <button

onClick={changeWhatsApp}

className="
mt-5
rounded-xl
bg-red-600
px-5
py-3
font-semibold
text-white
hover:bg-red-700
"

>

Change WhatsApp Number

</button>


            </>


          ) : (

            <>

            <div className="
              mb-5
              rounded-xl
              bg-yellow-100
              p-4
              text-yellow-700
              font-semibold
            ">

              🟡 Waiting for WhatsApp connection

            </div>


            {
              whatsapp?.qr && (

                <div>

                  <p className="mb-3 font-semibold">
                    Scan QR Code
                  </p>


                  <img
                    src={whatsapp.qr}
                    className="
                    w-64
                    rounded-xl
                    border
                    "
                  />

                </div>

              )
            }


            </>

          )
        }



      </div>


    </DashboardLayout>

  );

}