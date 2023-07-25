const express = require("express");
const ObjectId = require("mongodb").ObjectId;
const jwt = require("jsonwebtoken");
const { UserModel, ImageModel } = require("../Model/model");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const {
    validateToken,
    checkTokenExpirationGuest,
    checkTokenExpirationAdmin,
  } = require("../UserValidition/validiton");

  const secretKey ="c9499f8d393a43ee5c24e2c04409310bcffdc909191d52ce02cb5aba01a532a4";

const router=express.Router();
cloudinary.config({
    cloud_name: "doldrmemc",
    api_key: "698787937298583",
    api_secret: "Kj5yKVjfSJ3s4jYLFMXQZrsAhaI",
  });
  
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    folder: "uploads", // The name of the folder in your Cloudinary account where the images will be stored
    allowedFormats: ["jpg", "png"],
    transformation: [{ width: 500, height: 500, crop: "limit" }],
  });

  const upload = multer({ storage: storage });

router.post( `/uploadImage`, checkTokenExpirationAdmin, upload.single("file"),
  async (req, res) => {
    const saveImage = await ImageModel.create({ ImageUrl: req.file.path });
    res.json({
      message: "Image uploaded successfully",
      imageUrl: req.file.path,
    });
  }
);


module.exports=router;
