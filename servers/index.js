import express from "express";
import mongoose from "mongoose";
import User from "./User.js";
import jwt from "jsonwebtoken";
import cors from "cors";
import dotenv from "dotenv";
//import bcrypt from "bcrypt";

dotenv.config();

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(cors());

const DB =process.env.MONGO_URL;

mongoose
  .connect(DB)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.post("/signup", async (req, res) => {
  // Parameters needed  ..... UserName,password,Browser(optional)
  const userData = req.body;
  console.log(userData.username);
  //const salt = await bcrypt.genSalt(10);
  //userData.password = await bcrypt.hash(userData.password, salt);
  const userr = await User.findOne({ username: userData.username });
  if (userr) {
    return res.status(403).json({ messsage: "Username already exists" });
  }
  //  const userData = new user(req.body.username, req.body.password);
  if (!(userData.username && userData.password)) {
    return res.status(400).json({ message: "invalid user ID or Password" });
  }
  const user = await User.create({
    username: userData.username,
    password: userData.password,
  });

  const accessToken = jwt.sign(
    { username: userData.username },
    process.env.ACCESS_SECRET
  );
  const message = "Sign Up successful!";
  console.log(user);
  res.json({ accessToken, message });
});

app.post("/login", async (req, res) => {
  const userData = req.body;
  console.log(`Login -> ${userData.username}`);
  const user = await User.findOne({ username: userData.username });
  console.log(`User -> ${user}`);
  if (!user) {
    console.log("Error ");
    return res.status(403).json({ message: "User does not exists!" });
  }

  if (!(userData.password === user.password)) {
    return res.status(403).json({ message: "invalid user ID or Password" });
  }

  const accessToken = jwt.sign(
    { username: userData.username },
    process.env.ACCESS_SECRET
  );
  let message = "Logged Inn Successfully";
  console.log("User-> ", user);
  res.status(200).json({ accessToken, message });
});

app.post("/details", authToken, async (req, res) => {
  const userData = req.body;
  const { username } = req.username;
  //const username = "sabir9202";
  console.log(`Username-> ${username}`);

  const user = await User.findOne({ username: username });
  user.bas = userData.bas;
  user.lta = userData.lta;
  user.hra = userData.hra;
  user.fa = userData.fa;
  user.inv = userData.inv;
  user.rent = userData.rent;
  user.city = userData.city;
  user.med = userData.med;

  await user.save();
  console.log("Data Added");
  res.status(200).json({ message: "Data Added Successfully!!!" });
});

app.get("/userdata", authToken, async (req, res) => {
  const { username } = req.username;
  const user = await User.findOne({ username: username });
  console.log(`Userd-> ${user}`);
  const data = {
    bas: user.bas,
    lta: user.lta,
    hra: user.hra,
    fa: user.inv,
    inv: user.rent,
    rent: user.rent,
    city: user.city,
    med: user.med,
  };
  res.status(200).json(data);
});

function authToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null)
    return res.status(401).json({ message: "Not a valid token" });

  jwt.verify(token, process.env.ACCESS_SECRET, (err, tempUser) => {
    if (err) return res.status(403).json({ message: "Not a valid request" });

    req.username = tempUser;
    req.token = token;
    next();
  });
}
app.listen(3001, () => {
  console.log("App is up and running at server 3001");
});
