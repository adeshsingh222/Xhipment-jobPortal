const express = require('express');
const router = express.Router();
const awsWork = require('../controller/awsController');
const {createJob,getJobs}= require("../controller/jobController");
const {jobValidation,validUser}= require("../validation/valid");
const {createUser,userLogin}= require("../controller/userApplyController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/job-post", jobValidation, createJob);

router.post("/register/user", validUser, createUser);
router.post("/user/login", userLogin);
router.get("/user/getAllJobs",getJobs)

router.all("/*", function (req, res) {
    res.status(400).send({
        status: false, message: "Make Sure Your Endpoint is Correct !!!"
    });
});
module.exports = router;