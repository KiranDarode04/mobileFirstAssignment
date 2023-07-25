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



router.get("/getImage", checkTokenExpirationGuest, async (req, res) => {
    try {
      const findImage = await ImageModel.find();
      return res.send(findImage);
    } catch (error) {
      return res.send(error.toString());
    }
  });


module.exports=router;