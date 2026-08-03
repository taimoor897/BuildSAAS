import express from "express";

import {
  getWhatsAppStatus,
  resetWhatsApp
} from "../utils/whatsapp.js";


const router = express.Router();



router.get("/status",(req,res)=>{

  res.json({

    success:true,

    ...getWhatsAppStatus()

  });

});



router.post("/reset",async(req,res)=>{

  await resetWhatsApp();


  res.json({

    success:true,

    message:"Scan new WhatsApp QR"

  });

});



export default router;