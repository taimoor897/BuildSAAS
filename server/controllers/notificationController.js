import Notification from "../models/Notification.js";


// Get all notifications
export const getNotifications = async (req, res) => {

  try {

    const notifications = await Notification.find()
      .sort({
        createdAt: -1,
      });


    res.json({
      success:true,
      notifications,
    });


  } catch(error) {

    res.status(500).json({
      success:false,
      message:error.message,
    });

  }

};



// Mark notification as read
export const markNotificationRead = async(req,res)=>{

  try {

    const notification = await Notification.findById(
      req.params.id
    );


    if(!notification){
      return res.status(404).json({
        message:"Notification not found",
      });
    }


    notification.read = true;

    await notification.save();


    res.json({
      success:true,
      notification,
    });


  } catch(error){

    res.status(500).json({
      success:false,
      message:error.message,
    });

  }

};


// Payment completed from notification
export const completeInvoicePayment = async(req,res)=>{

    try {
  
      const notification = await Notification.findById(
        req.params.id
      );
  
  
      if(!notification){
        return res.status(404).json({
          message:"Notification not found"
        });
      }
  
  
      // Extract invoice number from message
      const invoiceNumber =
        notification.message.match(/INV-\d+/)?.[0];
  
  
      const invoice = await Invoice.findOne({
        invoiceNumber
      });
  
  
      if(invoice){
  
        invoice.status = "Paid";
        invoice.paidAmount = invoice.amount;
  
        await invoice.save();
  
      }
  
  
      // remove notification
      await Notification.findByIdAndDelete(
        req.params.id
      );
  
  
      res.json({
        success:true,
        message:"Payment completed"
      });
  
  
    }catch(error){
  
      res.status(500).json({
        success:false,
        message:error.message
      });
  
    }
  
  };