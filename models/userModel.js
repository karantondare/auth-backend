import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    min: 6,
  },
  password: {
    type: String,
    require: true,
    min: 6,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const UserModel = mongoose.model("UserModel", userSchema);

export default UserModel;
