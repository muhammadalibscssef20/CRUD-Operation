import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { connectDb } from "./config/database.js";
import { User } from "./model/userModel.js";
import { upload } from "./middlewares/upload.js";
import path from "path";
import { deleteOldImage } from "./utils/deleteOldImage.js";
// import { fileURLToPath } from "url";
// import { dirname } from "path";
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

const app = express();

connectDb();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// testing server
app.get("/", (req, res) => {
  res.json("Working");
});

// creating users
app.post("/users", upload.single("image"), (req, res) => {
  const body = req.body;
  const image = req.file;

  if (image) {
    body.image = image;
  }

  User.create(body)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.json(err);
    });
});

// get all users and sending to frontend
app.get("/users", (req, res) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.json(err);
    });
});

// getting specific user and sending to frontend
app.get("/users/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.json(err);
    });
});

// updating the user
app.put("/users/:id", upload.single("image"), async (req, res) => {
  console.log("here is reqeust");
  // get the user
  const id = req.params.id;
  const body = req.body;
  const user = await User.findById(id);

  // if user doens't exist
  if (!user) {
    return res.status(404).json("User doesnot exisit");
  }

  console.log("");
  let image = req.file;
  if (image) {
    console.log("image: ", image);
    body.image = image;
    if (user.image) {
      deleteOldImage(user.image);
    }
  }

  // update the user
  User.findByIdAndUpdate(id, body, { new: true })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.delete("/users/:id", async (req, res) => {
  const id = req.params.id;

  const user = await User.findById(id);

  // if user doens't exist
  if (!user) {
    return res.status(404).json("User doesnot exisit");
  }

  if (user?.image?.path !== undefined) {
    deleteOldImage(user.image);
  }

  // delete the user
  User.findByIdAndDelete(id)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.json(err);
    });
});
app.listen(4000, () => {
  console.log("Server is Running");
});
