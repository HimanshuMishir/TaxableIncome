import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  bas: Number,
  lta: Number,
  hra: Number,
  fa: Number,
  inv: Number,
  rent: Number,
  city: String,
  med: Number,
});

export default mongoose.model("User", userSchema);
