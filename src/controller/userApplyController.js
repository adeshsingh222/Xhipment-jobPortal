const userApplyModel = require("../model/userApplyModel");
const jwt = require("jsonwebtoken");
// const { uploadFile } = require("../controller/aws");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { uploadFile } = require("../controller/awsController");

const createUser = async function (req, res) {
    try {
      let comingData = req.body;
      let resume = req.files;
      console.log(resume);

      // const uploadedImage = await uploadFile(resume[0]);
      // comingData.resume = uploadedImage;
  
      let savedData = await userApplyModel.create(comingData);
      return res.status(201).send({ status: true, data: savedData });
    } catch (err) {
      return res.status(500).send({ status: false, msg: err.message });
    }
  };

  const userLogin = async function (req, res) {
    const emailregex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    const passwordregex = /^(?!.\s)[A-Za-z\d@$#!%?&]{8,15}$/;
    try {
      let data = req.body;
      let { email, password } = data;
  
      if (Object.keys(data).length === 0)
        return res
          .status(400)
          .send({ status: false, message: "Data is required to login" });
  
      if (!email)
        return res
          .status(400)
          .send({ status: false, message: "email is required" });
  
      if (!emailregex.test(email))
        return res
          .status(400)
          .send({ status: false, message: "email must be in valid format" });
  
      let user = await userApplyModel.findOne({ email: email });
      if (!user) {
        return res
          .status(401)
          .send({ status: false, message: "Invalid Email Id" });
      }
      if (!password)
        return res
          .status(400)
          .send({ status: false, message: "user password is required" });
  
      if (!passwordregex.test(password))
        return res
          .status(400)
          .send({ status: false, message: "Password should be in valid format" });
  
      let token = jwt.sign(
        {
          userId: user._id,
          iat: new Date().getTime(),
          exp: Math.floor(Date.now() / 1000) + 10 * 60 * 60,
        },
        "Xhipment"
      );
  
      return res.status(200).send({
        status: true,
        message: "user login successfully",
        data: { userId: user._id, token: token },
      });
    } catch (err) {
      res
        .status(500)
        .send({ status: false, message: "server error", error: err });
    }
  };

  const getUserById = async function (req, res) {
    try {
      let userId = req.params.userId;
  
      const isValidUserId = function (title) {
        return mongoose.isValidObjectId(title);
      };
  
      // userId validation.
      if (!isValidUserId(userId)) {
        return res
          .status(400)
          .send({ status: false, message: `userId ${userId} is invalid` });
      }
  
      // checking if user exists.
      let getSpecificUser = await userModel.findOne({
        _id: userId,
      });
  
      if (!getSpecificUser) {
        return res.status(404).send({ status: false, data: "No user  found" });
      }
      return res
        .status(200)
        .send({ status: true, message: "success", data: getSpecificUser });
    } catch (error) {
      res.status(500).send({ status: false, err: error.message });
    }
  };

  const getProducts = async function (req, res) {
    try {
      let product = [{ isDeleted: false }];
      if (req.query.size) {
        product.push({ availableSizes: req.query.size });
      }
      if (req.query.name) {
        product.push({ title: req.query.name });
      }
      if (req.query.price) {
        product.push({ price: { $eq: req.query.price } });
      }
      if (req.query.priceGreaterThan) {
        product.push(
          { price: { $gt: req.query.priceGreaterThan } },
          { $sort: { price: 1 } }
        );
      }
      if (req.query.priceLessThan) {
        product.push(
          { price: { $lt: req.query.priceLessThan } },
          { $sort: { price: -1 } }
        );
      }
  
      let findProducts = await productModel.find({ $and: product });
  
      //if no data Found in DB
      if (findProducts.length == 0) {
        return res.status(404).send({ status:false, message: "product not found" });
      }
      return res.status(200).send({ status: true,message:"Success", data: findProducts });
    } catch (err) {
      return res
        .status(500)
        .send({ status: false, msg: "Server Error!!", err: err.message });
    }
  };
  

  module.exports = { createUser, userLogin,getUserById};