import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: "Token not found" });
    }

    // Verify the token
    const token_decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Check if the decoded token contains admin email
    if (token_decoded.email !== process.env.ADMIN_EMAIL) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized access" });
    }

    // Proceed to next middleware if the token is valid
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export default adminAuth;
