const jobModel= require('../model/jobModel');
const userApplyModel= require("../model/userApplyModel")
const jobValidation= async function(req,res,next){
    try{
        let data= req.body;
        let {title,discription,email} = data;
   
        if(Object.keys(data)==0) return res.status(400).send({status:false,msg:"fill job credentials"});
         
        if(!title) return res.status(400).send({status:false,msg:"enter your title address"});
        
        if(!discription) return res.status(400).send({status:false,msg:"enter your discription address"});
        
        if(!email) return res.status(400).send({status:false,msg:"enter your email address"});
        
        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email))
      return res.status(400).send({ status: false, message: "Invalid Email Id" });

        // let Email = await jobModel.findOne({email:email});
        // if(Email) return res.status(400).send({status:false,msg:"E-mail already registered"});
        
        next();
    }
    catch(err){
        return res.status(500).send({status:false, msg:err.message})
    }
}

const validUser = async function (req, res, next) {
    try {
      let data = req.body;
    //   let resume = req.files;
      let { name,email,coverLetter,password } = data;
  
      if (Object.keys(data) == 0)
        return res
          .status(400)
          .send({ status: false, message: "please input some data" });
  
      //=========================== name ==================================================================================================================================
  
      if (!name) return res.status(400).send({ status: false, message: "please input name" });
        
      if (!/^[A-Za-z]{3,15}/.test(name))
        return res.status(400).send({
          status: false,
          message: "Please enter valid name",
        })
        if (!email)
      return res
        .status(400)
        .send({ status: false, message: "please input E-mail" });

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email))
      return res
        .status(400)
        .send({ status: false, message: "Invalid Email Id" });

        let emailId = req.body.email;

     let validEmail = await userApplyModel.findOne({ email: emailId });
    if (validEmail)
          return res
          .status(400)
          .send({ status: false, message: "E-mail already taken" });

         if (!/^[A-Za-z]{3,500}/.test(coverLetter))
       return res.status(400).send({
        status: false,
       message: "Please write more to add in cover letter",
       });

       if (!password)
      return res.status(400).send({ status: false, message: "please input password section" });

    //-------------------> REGEX <-----------------------------------------------------------------------------------------------------

    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,15}$/.test(password))
      return res.status(400).send({ status: false, message: "Atleat 1 uppercase, 1 lowercase, 1 numberic value , 1 special character and Length should be between 8 t0 14 for password!!!" });
     
        next();
    }
    catch(err){
        return res.status(500).send({status:false, msg:err.message})
    }
}
module.exports={jobValidation,validUser}