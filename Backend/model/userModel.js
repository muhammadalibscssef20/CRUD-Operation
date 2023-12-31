import mongoose from "mongoose";

var UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    location: String,
    image: {
      fieldname: String,
      originalname: String,
      encoding: String,
      mimetype: String,
      destination: String,
      filename: String,
      path: String,
      size: Number
    }
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
