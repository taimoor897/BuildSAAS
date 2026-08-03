import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";


const storage = new CloudinaryStorage({
  cloudinary,

  params: async (req, file) => {

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });


    return {
      folder: "buildpilot/projects",
      allowed_formats: [
        "jpg",
        "jpeg",
        "png",
        "webp",
      ],
    };
  },

});


const upload = multer({
  storage,
});


export default upload;