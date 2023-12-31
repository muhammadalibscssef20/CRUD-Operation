import mongoose from "mongoose";

export const connectDb = () => {
  mongoose
    .connect("mongodb+srv://admin:admin@cluster0.htgbnva.mongodb.net/practice", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //   useCreateIndex: true,
    })
    .then(() => {
      console.log("Connected Moogose");
    })
    .catch((err) => {
      console.log(err);
    });
};
