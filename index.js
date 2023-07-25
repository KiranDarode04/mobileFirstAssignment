const express = require("express");
const ObjectId = require("mongodb").ObjectId;
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { UserModel, ImageModel } = require("./Model/model");
const {
  validateToken,
  checkTokenExpirationGuest,
  checkTokenExpirationAdmin,
} = require("./UserValidition/validiton");

const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const PORT = process.env.PORT | 8000;
const url =
  "mongodb+srv://kirandarode04:BXPKjHb98jVWTTdb@cluster0.izvwywv.mongodb.net/assignmentCrud";

const app = express();
app.use(express.json());

const secretKey =
  "c9499f8d393a43ee5c24e2c04409310bcffdc909191d52ce02cb5aba01a532a4";

mongoose
  .connect(`${url}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.info("Successfully connected database");
  })
  .then((err) => {});

cloudinary.config({
  cloud_name: "doldrmemc",
  api_key: "698787937298583",
  api_secret: "Kj5yKVjfSJ3s4jYLFMXQZrsAhaI",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: "uploads", 
  allowedFormats: ["jpg", "png"],
  transformation: [{ width: 500, height: 500, crop: "limit" }],
});

app.use(`/auth`, require(`./Auth/auth`));

app.use(`/Admin`, require(`./Admin/admin`));
app.use(`/Guest`, require(`./GuestUser/GusetUser`));

app.get('/test',(req,res)=>{
 return res.send("App is working");
})

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT} !`);
});
