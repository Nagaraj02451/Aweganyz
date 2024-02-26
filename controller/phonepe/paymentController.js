const formdata = require("../../Scheema/formdata");

const nodemailer = require("nodemailer");

const newPayment = async (req, res) => {

    try {

        const {Name  ,Email , Phone ,Message , Service} =
        req.body;
      const newOrderCon = formdata({
        Name : Name,
        Email : Email,
        Phone:Phone,
        Message:Message,
        Service:Service
        
      });
  
     const condata =  await newOrderCon.save();
      res.send({
        msg: condata
        
      });
  
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });
    const mailOptions = {
        from: process.env.EMAIL,
        to: Email ,  
        subject: "Conformation from Aweganyz",
        html: `
        <div style="height: auto; width:100% ;backgroud-color:white; padding:30px">
        <img width="180px" height="30px" src="https://i.postimg.cc/kGttq4hf/Aweganyz.png" alt="Nttl">
        <br >
        <br >
    
    <p style="padding:1px">  Name : ${ Name}  ,</p>
    <p style="padding:2px">Email : ${Email} , </p>
    <p  style="padding:2px">PhoneNumber : ${Phone} ,</p>
    <p  style="padding:2px">Message : ${Message}</p>
    <p  style="padding:2px">Service : ${Service}</p>
     
     </div>
          
    
      `
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Error" + error)
        } else {
            console.log("Email sent:" + info.response);
            res.status(201).json({status:201,info})
        }
  
    })
    const mailOptionsB = {
        from: process.env.EMAIL,
        to: "nagaraj022000@gmail.com" ,  
        subject: "Enquiry Details",
        html: `
        <div style="height: auto; width:100% ;backgroud-color:white; padding:30px">
        <img width="180px" height="30px" src="https://i.postimg.cc/kGttq4hf/Aweganyz.png" alt="Nttl">
        <br >
        <br >
    
    <p style="padding:1px">  Name : ${ Name}  ,</p>
    <p style="padding:2px">Email : ${Email} , </p>
    <p  style="padding:2px">PhoneNumber : ${Phone} ,</p>
    <p  style="padding:2px">Message : ${Message}</p>
    <p  style="padding:2px">Service : ${Service}</p>
     
     </div>
          
          
    
      `
    };
  
    transporter.sendMail(mailOptionsB, (error, info) => {
        if (error) {
            console.log("Error" + error)
        } else {
            console.log("Email sent:" + info.response);
            res.status(201).json({status:201,info})
        }
  
    })
  
  
   
       
    } catch (error) {
        res.status(500).send({
            message: error.message,
            success: false
        })
    }
}



module.exports = {
    newPayment,

}
