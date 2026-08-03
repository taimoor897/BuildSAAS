import Invoice from "../models/Invoice.js";
import Notification from "../models/Notification.js";


// =========================
// Create Invoice
// =========================

export const createInvoice = async (req, res) => {
  try {

    console.log("INVOICE BODY:", req.body);

    const invoice = await Invoice.create({
        ...req.body,
        createdBy: req.user._id,
      });


    res.status(201).json({
      success: true,
      invoice,
    });


  } catch(error){

    console.log("CREATE INVOICE ERROR:", error);

    res.status(500).json({
      success:false,
      message:error.message,
    });

  }
};



// =========================
// Get All Invoices
// =========================

export const getInvoices = async(req,res)=>{
  try{

    const invoices = await Invoice.find({
        createdBy: req.user._id,
      })
      .populate("project","name client")
      .sort({
        createdAt:-1,
      });


    res.json({
      success:true,
      invoices,
    });


  }catch(error){

    res.status(500).json({
      success:false,
      message:error.message,
    });

  }
};



// =========================
// Get Single Invoice
// =========================

export const getInvoice = async(req,res)=>{
  try{

    const invoice = await Invoice.findOne({
        _id:req.params.id,
        createdBy:req.user._id,
      })
      .populate("project");


    if(!invoice){
      return res.status(404).json({
        message:"Invoice not found",
      });
    }


    res.json({
      success:true,
      invoice,
    });


  }catch(error){

    res.status(500).json({
      success:false,
      message:error.message,
    });

  }
};



// =========================
// Record Payment
// =========================

export const updatePayment = async(req,res)=>{
  try{

    const invoice = await Invoice.findOne({
        _id:req.params.id,
        createdBy:req.user._id,
      });


    if(!invoice){
      return res.status(404).json({
        message:"Invoice not found",
      });
    }


    invoice.paidAmount = req.body.paidAmount;


    if(invoice.paidAmount >= invoice.amount){

      invoice.status = "Paid";

    }
    else if(invoice.paidAmount > 0){

      invoice.status = "Partially Paid";

    }
    else{

      invoice.status = "Unpaid";

    }


    await invoice.save();
    // Remove overdue notification when payment is completed
if (invoice.status === "Paid") {

    await Notification.deleteMany({
      type: "invoice",
      message: {
        $regex: invoice.invoiceNumber,
        $options: "i",
      },
    });
  
  }


    res.json({
      success:true,
      invoice,
    });


  }catch(error){

    res.status(500).json({
      success:false,
      message:error.message,
    });

  }
};



// =========================
// Delete Invoice
// =========================

export const deleteInvoice = async(req,res)=>{
  try{

    const invoice = await Invoice.findOneAndDelete({
        _id:req.params.id,
        createdBy:req.user._id,
      });


    if(!invoice){
      return res.status(404).json({
        message:"Invoice not found",
      });
    }


    res.json({
      success:true,
      message:"Invoice deleted",
    });


  }catch(error){

    res.status(500).json({
      success:false,
      message:error.message,
    });

  }
};