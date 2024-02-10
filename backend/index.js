const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("../backend/model/User");

mongoose
  .connect("mongodb://localhost:27017/Crud")
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

const app = express();

app.use(cors());
app.use(express.json());

app.post("/createUser", async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const user = await UserModel.create({ name, email, age });
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/", async (req, res) => {
  try {
    const user = await UserModel.find({});
    res.json(user);
  } catch (error) {
    res.json({ error: error.message });
  }
});

app.get("/getUser/:id", async (req, res) => {
  const id = req.params.id;
  await UserModel.findById({ _id: id })
    .then((user) => res.json(user))
    .catch((err) => console.log(err));
});

app.put("/updateUser/:id", async (req, res) => {
  const { name, email, age } = req.body;
  const id = req.params.id;
  await UserModel.findByIdAndUpdate({ _id: id }, { name, email, age })
    .then((user) => res.json(user))
    .catch((err) => res.json(err.message));
});

app.delete("/deleteUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndDelete({ _id: id })
    .then((result) => {
      if (result) {
        res.json({ message: "User deleted successfully" });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.message });
    });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
