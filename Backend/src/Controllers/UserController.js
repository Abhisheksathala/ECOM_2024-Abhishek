import UserModel from '../model/UserModel.js';
import jws from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Validator from 'validator';

const CreateToken = (payload) => {
  return jws.sign(payload, process.env.SECRET_KEY, {
    expiresIn: '30d',
  });
};

const RegisterUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existUser = await UserModel.findOne({ email });
    if (existUser) {
      return res
        .status(400)
        .json({ success: false, message: 'User already exist' });
    }

    if (!Validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: 'Invalid Email' });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ success: false, message: 'Password must be at least 8' });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    const NewUser = new UserModel({
      name: name,
      email: email,
      password: hashPassword,
    });
    const user = await NewUser.save();

    const token = CreateToken({ id: user._id }); // Correct structure

    res.status(200).json({
      success: true,
      token: token,
      message: 'User created successfully',
    });
  } catch (error) {
    console.error('Error in RegisterUser:', error);
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
        .json({ success: false, message: 'User not found' });
    }

    const checkPassword = bcrypt.compareSync(password, user.password);
    if (!checkPassword) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid password' });
    }

    const token = CreateToken({ id: user._id });
    res.status(200).json({
      success: true,
      token: token,
      message: 'Login successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
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
      res.json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { loginUser, RegisterUser, adminLogin };
