import express from "express";
import upload from "../middleware/upload.js";
import { v2 as cloudinary } from "cloudinary";

const router = express.Router();


router.post(
  "/project-image",
  upload.single("image"),
  async (req, res) => {

    try {

      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });


      console.log("Cloudinary upload check:");
      console.log(process.env.CLOUDINARY_CLOUD_NAME);
      console.log(process.env.CLOUDINARY_API_KEY);


      res.json({
        message: "Image uploaded successfully",
        url: req.file.path,
      });


    } catch(err){

      console.error(err);

      res.status(500).json({
        message:"Upload failed",
        error:err.message
      });

    }

  }
);


export default router;