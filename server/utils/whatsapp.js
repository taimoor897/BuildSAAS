import makeWASocket, {
    useMultiFileAuthState,
    DisconnectReason,
  } from "@whiskeysockets/baileys";
  
  import { Boom } from "@hapi/boom";
  import qrcode from "qrcode";
  import fs from "fs";
  
  let sock;
  let isConnected = false;
  let qrCode = null;
let connectedNumber = null;
  
  export async function connectWhatsApp() {
    const { state, saveCreds } =
      await useMultiFileAuthState("whatsapp-session");
  
    sock = makeWASocket({
      auth: state,
      printQRInTerminal: false,
      browser: ["BuildPilot AI", "Chrome", "1.0.0"],
    });
  
    sock.ev.on("creds.update", saveCreds);
  
    sock.ev.on("connection.update", async (update) => {
      const { connection, qr, lastDisconnect } = update;
  
      if (qr) {

        qrCode = await qrcode.toDataURL(qr);
      
        console.log(
          "📱 WhatsApp QR Generated"
        );
      
      }
      if (connection === "open") {

        isConnected = true;
      
        qrCode = null;
      
        connectedNumber =
          sock.user?.id
          ?.split(":")[0]
          || null;
      
      
        console.log(
          "✅ WhatsApp Connected",
          connectedNumber
        );
      
      }
  
      if (connection === "close") {
        isConnected = false;
  
        const shouldReconnect =
          (lastDisconnect?.error instanceof Boom
            ? lastDisconnect.error.output.statusCode
            : 0) !== DisconnectReason.loggedOut;
  
        console.log("❌ WhatsApp disconnected");
  
        if (shouldReconnect) {
          console.log("🔄 Reconnecting...");
          setTimeout(() => {
            connectWhatsApp();
          }, 5000);
        } else {
          console.log(
            "⚠️ Logged out. Delete whatsapp-session and scan again."
          );
        }
      }
    });
  }
  
  export async function sendWhatsApp(number, message) {
    if (!sock || !isConnected) {
      throw new Error("WhatsApp not connected");
    }
  
    const jid =
      number.replace(/\D/g, "") + "@s.whatsapp.net";
  
    await sock.sendMessage(jid, {
      text: message,
    });
  }


  export function getWhatsAppStatus(){

    return {
  
      connected: isConnected,
  
      number: connectedNumber,
  
      qr: qrCode
  
    };
  
  }


  export async function resetWhatsApp(){

    try{
  
      if(sock){
  
        await sock.logout();
  
      }
  
  
      sock = null;
  
      isConnected = false;
  
      connectedNumber = null;
  
      qrCode = null;
  
  
  
      if(fs.existsSync("whatsapp-session")){
  
        fs.rmSync(
          "whatsapp-session",
          {
            recursive:true,
            force:true
          }
        );
  
      }
  
  
  
      console.log(
        "WhatsApp session cleared"
      );
  
  
      setTimeout(()=>{
  
        connectWhatsApp();
  
      },1000);
  
  
  
      return true;
  
  
    }catch(error){
  
      console.log(
        "WhatsApp reset error",
        error
      );
  
      return false;
  
    }
  
  }