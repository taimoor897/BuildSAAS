import { useEffect, useState } from "react";
import {
  Bell
} from "lucide-react";

import {
  getNotifications,
  markNotificationRead
} from "../pages/services/notificationService";


export default function NotificationBell(){

  const [notifications,setNotifications] = useState([]);

  const [open,setOpen] = useState(false);



  const loadNotifications = async()=>{

    try{

      const data = await getNotifications();

      setNotifications(
        data.notifications || []
      );


    }catch(error){

      console.log(error);

    }

  };



  useEffect(() => {

    loadNotifications();
  
    const interval = setInterval(
      loadNotifications,
      60000
    );
  
    const refreshNotifications = () => {
      loadNotifications();
    };
  
    window.addEventListener(
      "notificationsUpdated",
      refreshNotifications
    );
  
    return () => {
      clearInterval(interval);
  
      window.removeEventListener(
        "notificationsUpdated",
        refreshNotifications
      );
    };
  
  }, []);



  const unread = notifications.filter(
    n=>!n.read
  ).length;



  return (

    <div className="relative">

      <button
        onClick={()=>setOpen(!open)}
        className="relative rounded-xl p-2 hover:bg-slate-100"
      >

        <Bell size={24}/>


        {unread > 0 && (

          <span
          className="
          absolute
          -right-1
          -top-1
          rounded-full
          bg-red-500
          px-2
          text-xs
          text-white
          "
          >

            {unread}

          </span>

        )}


      </button>



      {open && (

        <div
        className="
        absolute
        right-0
        mt-3
        w-80
        rounded-xl
        border
        bg-white
        shadow-xl
        "
        >

          <div className="border-b p-4 font-bold">
            Notifications
          </div>


          {
          notifications.length === 0 ? (

            <p className="p-4 text-sm text-gray-500">
              No notifications
            </p>

          ):(

            notifications.map((item)=>(

              <div
              key={item._id}
              onClick={async () => {
                await markNotificationRead(item._id);
                loadNotifications();
              }}
              className="
              cursor-pointer
              border-b
              p-4
              hover:bg-slate-50
              "
              >

                <p className="font-semibold">
                  {item.title}
                </p>


                <p className="text-sm text-gray-600">
                  {item.message}
                </p>


              </div>

            ))

          )
          }


        </div>

      )}

    </div>

  );

}