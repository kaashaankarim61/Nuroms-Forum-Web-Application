const User = require('../Models/userModel');
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "muhammad.anique4008@gmail.com",
        pass: "vldavaqylviezape"
    }
});


exports.getUserByEmail = async (req, res) => {
  const Email = req.body.Email;
  const PasswordBody = req.body.Password;

  // Find the user by email
  User.findOne({ Email})
    .then(user => {
      if (!user) {
        // User not found
        res.status(404).send({Error: 'Account Does Not Exist'});
      } else {
        
        if(user.Password==PasswordBody)
        {

          if(user.Status != 'active')
          res.status(400).send({ Error : 'Not Verified'});
          else
          res.status(200).send(user);
        }
        
        else
        res.status(400).send({ Error : 'Incorrect Password'});

      }
    })
    .catch(error => {
      // Handle errors
      console.error('Error:', error);
      res.status(500).send({ Error : 'Error getting user data'});
    });
};


exports.getInstructors = async (req, res) => {
  User.find({ UserType : 'Instructor' })
    .then(user => {
         res.status(200).send(user);
    })
    .catch(error => {
      console.error('Error:', error);
      res.status(500).send({ Error : 'Error getting user data'});
    });
};



exports.getUserByRoll = async (req, res) => {
  const RollNo = req.params.roll;
  User.findOne({ RollNo })
    .then(user => {
      if (!user) {
        res.status(404).send({Error: 'Account Does Not Exist'});
      } else {
        res.status(200).send(user);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      res.status(500).send({ Error : 'Error getting user data'});
    });
};


exports.getUserById = async (req, res) => {
  const _id = req.params.id;
  User.findOne({_id})
    .then(user => {
      if (!user) {
        res.status(404).send({Error: 'Account Does Not Exist'});
      } else {
        res.status(200).send(user);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      res.status(500).send({ Error : 'Error getting user data'});
    });
};



exports.addUser = async (req,res)=>{

    try {
        let user = new User();
        user.Name =req.body.Name;
        user.Email =req.body.Email;
        user.Degree=req.body.Degree;
        user.Status = 'active';
        user.RollNo =req.body.RollNo;
        user.OTP  =req.body.OTP;
        user.Phone  =req.body.Phone;
        user.Password = req.body.Password;
        user.AccountType = "User";
        user.UserType = req.body.UserType;
        const doc =  await user.save();
        console.log(doc);
        res.status(201).json(user);


        // let mailOptions = {
        //     from: "Nuroms <muhammad.anique4008@gmail.com>",
        //     to: `${user.Email}`,
        //     subject: "OTP Verification",
        //     html:`<div style="background-color: #f0f0f0; padding: 120px 320px;"><div style="background-color: #3354cc; color: #ffffff; border-radius: 5px; text-align: center;"><div style="font-size: 34px; padding: 10px; margin-left: 15px; text-align: left; font-weight: 700;">Nuroms</div><div style="display: table;vertical-align: top; margin-top: 10px; justify-content: center; align-items: center; flex-direction: column; width:100%; height:100%; background-color: #ffffff; border-radius: 0px 0px 5px 5px; padding: 40px;"><p style="font-size: 16px; color: black; margin-top: 20px;">Your One Time Password (OTP) is:</p><span style="font-size: 56px; font-weight: 700; color: #333; padding: 10px 20px; margin-top: 30px; border-radius: 5px; border: 1px solid #ccc;">${user.OTP}</span><br /><p style="font-size: 13px; margin: 20px 0 0; color: black;">This OTP is valid and verified minutes only.</p><p style="font-size: 13px; margin: 20px 0 0; color: black;">If you did not request this OTP, please ignore this email.</p><p style="font-size: 13px; margin: 20px 0 0; margin-bottom: 20px; color: black;">All rights reserved &copy; Nuroms 2023</p></div></div></div>`,
        // };
        
        
        // transporter.sendMail(mailOptions, function(error, info) {
        //     if (error) {
        //         console.log(error);
        //     } else {
        //         console.log("Email sent: " + info.response);
        //     }
        // });
      }
      
      catch (err) {
        res.status(400).json({ error: err.message });
      }
   
    // res.json(doc);
};


exports.updateUserStatus = async (req,res)=>{
  const Email = req.body.Email;
  const OTP_b = req.body.otp;
  // Find the user by email
  User.findOne({ Email })
    .then(user => {
      if (!user) {
        // User not found
        res.status(404).send({Error: 'Account Does Not Exist'});
      } else {
        
        if(user.OTP==OTP_b)
        {
            User.updateOne({Email  : Email},
              { Status : 'active' }
            ).then(user1 =>{
              if (!user1) {
                // User not found
                res.status(404).send({Error: 'Account Does Not Exist'});
              }else{
                res.status(201).json(user1);

              }
            })
            // console.log(doc2);
            
        }
        else{
          res.status(200).send({"OTP" : "Wrong"});
        }

      }
    })
    .catch(error => {
     
      console.error('Error:', error);
      res.status(500).send({ Error : 'Error getting user data'});
    });
  
};



exports.updateUserWallet = async (req,res)=>{
  const Email = req.body.Email;
  const Wallet =req.body.Wallet;
  // Find the user by email
  User.findOne({ Email })
    .then(user => {
      if (!user) {
        // User not found
        res.status(404).send({Error: 'Account Does Not Exist'});
      } else {
          
        User.updateOne({Email  : Email},
          { Wallet: Wallet }
        ).then(user1 =>{
          if (!user1) {
            // User not found
            res.status(404).send({Error: 'Account Does Not Exist'});
          }else{
            res.status(201).json(user1);

          }
        })          

      }
    })
    .catch(error => {
     
      console.error('Error:', error);
      res.status(500).send({ Error : 'Error getting user data'});
    });
  
};