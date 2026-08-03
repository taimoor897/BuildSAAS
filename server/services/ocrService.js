import Tesseract from "tesseract.js";


export const extractText = async(imageUrl)=>{

    const result = await Tesseract.recognize(
        imageUrl,
        "eng",
        {
            logger:m=>console.log(m)
        }
    );


    return result.data.text;

};