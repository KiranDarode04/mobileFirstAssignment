const express = require("express");
const ObjectId = require("mongodb").ObjectId;
const jwt = require("jsonwebtoken");
const { UserModel, ImageModel } = require("../Model/model");
const {
    validateToken,
    checkTokenExpirationGuest,
    checkTokenExpirationAdmin,
  } = require("../UserValidition/validiton");

  const secretKey ="c9499f8d393a43ee5c24e2c04409310bcffdc909191d52ce02cb5aba01a532a4";

const router=express.Router();


router.post(`/login`, async (req, res) => {
    try {
      const { UserName, Password } = req.body;
      if (!(UserName && Password)) {
        return res.send("please fill the all fild");
      }
  
      const findUser = await UserModel.findOne({
        UserName: UserName,
        Password: Password,
      });
  
      if (findUser) {
        const payload = {
          UserName: findUser.UserName,
          id: findUser._id,
          Role: findUser.Role,
        };
  
        const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
        return res.json({ Id: findUser._id, Role: findUser.Role, token: token });
      }
      return res.send({ users });
    } catch (error) {
      return res.send(error.toString());
    }
  });
  
  router.post("/signUp", async (req, res) => {
    try {
      const { UserName, Password, Qualification, City, Phone, Role } = req.body;
      console.info(Password);
      if (!(UserName && Password && Qualification && City && Phone && Role)) {
        return res.send("please fill the all fild");
      }
  
      const findUser = await UserModel.findOne({ UserName });
      if (findUser) {
        return res.send("username is alrady exits");
      }
      const saveData = await UserModel.create({
        UserName,
        Password,
        Qualification,
        City,
        Phone,
        Role,
      });
  
      res.send({ user: saveData, msg: "user successfully Registerd" });
    } catch (error) {
      res.send(error.toString());
    }
  });

  router.get(`/profile`, validateToken, async (req, res) => {
    try {
      const findUser = await UserModel.findOne({ _id: req.user.id });
  
      const { _id, UserName, Qualification, City, Phone, Role } = findUser;
  
      return res.send({ 
        User: { id: _id, UserName, Qualification, City, Phone, Role },
      });
    } catch (error) {
      return res.send(error).toString();
    }
  });

  module.exports=router;