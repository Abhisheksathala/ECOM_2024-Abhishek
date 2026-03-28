import UserModel from "../model/UserModel.js";
import jws from "jsonwebtoken";
import bcrypt from "bcrypt";
import Validator from "validator";

const CreateToken = (payload) => {
  return jws.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "30d",
  });
};

const RegisterUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existUser = await UserModel.findOne({ email });
    if (existUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exist" });
    }

    if (!Validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid Email" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ success: false, message: "Password must be at least 8" });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    const NewUser = new UserModel({
      name: name,
      email: email,
      password: hashPassword,
    });
    const user = await NewUser.save();

    const token = CreateToken({ id: user._id });

    res.status(200).json({
      success: true,
      user: user,
      token: token,
      message: "User created successfully",
    });
  } catch (error) {
    console.error("Error in RegisterUser:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const checkPassword = bcrypt.compareSync(password, user.password);
    if (!checkPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });
    }

    const token = CreateToken({ id: user._id });
    res.status(200).json({
      success: true,
      user: user,
      token: token,
      message: "Login successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// const google = async (req, res) => {
//   try {
//     const { email, name, photo } = req.body;
//     const user = await UserModel.findOne({ email });

//     if (user) {
//       const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//         expiresIn: "1h",
//       });
//       const { password, ...rest } = user._doc;
//       res.cookie("access_token", token, { httpOnly: true }).status(200).json({
//         message: "Login successful",
//         success: true,
//         user: rest,
//         token: token,
//       });
//     } else {
//       const generatePassword =
//         Math.random().toString(36).slice(-8) +
//         Math.random().toString(36).slice(-8);
//       const hashedPassword = await bcrypt.hash(generatePassword, 10);
//       const newUser = new UserModel({
//         name:
//           name.split(" ").join(" ").toLowerCase() +
//           Math.random().toString(36).slice(-4),
//         email,
//         password: hashedPassword,
//         profile_img: photo,
//       });
//       await newUser.save();
//       const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
//         expiresIn: "1h",
//       });
//       const { password, ...rest } = newUser._doc;
//       res.cookie("access_token", token, { httpOnly: true }).status(200).json({
//         message: "Login successful",
//         success: true,
//         user: rest,
//         token: token,
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       message: "Invalid credentials or failed login through Google",
//       success: false,
//     });
//   }
// };

const google = async (req, res) => {
  try {
    const { email, name, photo } = req.body;

    const user = await UserModel.findOne({ email });

    if (user) {
      const token = CreateToken({ id: user._id });

      const { password, ...rest } = user._doc;

      return res.status(200).json({
        success: true,
        user: rest,
        token,
        message: "Login successful",
      });
    }

    const randomPassword =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).slice(-8);

    const hashedPassword = await bcrypt.hash(randomPassword, 10);

    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      profile_img: photo,
    });

    await newUser.save();

    const token = CreateToken({ id: newUser._id });

    const { password, ...rest } = newUser._doc;

    res.status(200).json({
      success: true,
      user: rest,
      token,
      message: "User created with Google",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Google login failed",
    });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      // Use jws.sign() instead of jwt.sign()
      const token = jws.sign(email + password, process.env.SECRET_KEY);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const userId = req.body.userId;
    const user = await UserModel.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { loginUser, RegisterUser, adminLogin, getUserProfile, google };
