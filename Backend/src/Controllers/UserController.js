import UserModel from "../model/UserModel.js";
import jws from "jsonwebtoken";
import bcrypt from "bcrypt";
import Validator from "validator";

const CreateToken = (user) => {
  return jws.sign({ id: User._id }, process.env.SECRET_KEY, {
    expiresIn: "30d",
  });
};

const RegisterUser = async (req, res) => {
  try {
    const { name, email, password } = res.body;

    const existUser = await UserModel.findOne({ email });
    if (existUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exist" });
    }

    if (!Validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid Email" });
    }

    if (password.lenght < 8) {
      return res
        .status(400)
        .json({ success: false, message: "Password must be at least 8" });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    const NewUser = await UserModel{
      name: name,
      email: email,
      password: hashPassword,
    }

    await NewUser.save();
    
  } catch (error) {}
};
const loginUser = async (req, res) => {};
const AdminLogin = async (req, res) => {};

export { loginUser, RegisterUser, AdminLogin };
