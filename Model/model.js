const mongoose = require("mongoose");

const User = mongoose.Schema({
  UserName:{ type: String, required: true, unique: true },
  Password: String,
  Qualification: String,
  City: String,
  Phone: String,
  Role: String,
});

const Image= mongoose.Schema({
   ImageUrl:{ type: String, required: true},

  });

const UserModel = mongoose.model(`user`, User);
const ImageModel = mongoose.model(`image`, Image);

module.exports = {
  UserModel,ImageModel
};
