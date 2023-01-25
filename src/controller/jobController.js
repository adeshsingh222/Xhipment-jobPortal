const jobModel= require("../model/jobModel");
const mongoose= require("mongoose")

const createJob= async function(req,res){
    try{
        let data= req.body;
        let savedData= await jobModel.create(data);
        return res.status(201).send({status:true, msg:"Job post is created", data:savedData})

    }
    catch(err){
      return  res.status(500).send({ status:false, msg: err.message })
    }
}

const getJobs = async function (req, res) {
    try {
     
        let que = req.query
        let userid = que.userId;

        // if user id present then only it will eneter into if block and check the id is not valid otherwise it will not enetr into if block
        // ------------------------handle userid---------------------------------------------------
        if (userid || userid == '') {
            if (!mongoose.Types.ObjectId.isValid(userid)) {
                return res.status(400).send({ status: false, message: "UserId is not valid" })
            }
        }
        // ------------------------------get jobs-------------------------------------------------------- 
        const getAllJobs = await jobModel.find();

        //         // ---------------nothing found----------------------------------------------------------
        if (getAllJobs.length == 0 || getAllJobs == null) return res.status(404).send({ status: false, message: "no jobs found" })  //-------null is use because if i give wrong id with 28 character then it can not read properties of authorid so it gets back null 

        return res.status(200).send({ status: true, message: "jobs list", data: getAllJobs });

    } catch (error) {
      res.status(500).send({ status: false, err: error.message });
    }
  };

  

module.exports= {createJob,getJobs}