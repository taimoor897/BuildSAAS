import mongoose from "mongoose";


const notificationSchema = new mongoose.Schema(
{
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },


    invoice:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Invoice",
    },


    title:{
        type:String,
        required:true,
    },


    message:{
        type:String,
        required:true,
    },


    type:{
        type:String,
        default:"invoice",
    },


    read:{
        type:Boolean,
        default:false,
    }

},
{
    timestamps:true,
});


export default mongoose.model(
    "Notification",
    notificationSchema
);