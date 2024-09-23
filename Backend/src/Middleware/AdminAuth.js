import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    // Correct token extraction
    const { token } = req.headers;

    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: "Token not found" });
    }

    // Correct token verification
    const token_decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Correct admin check
    if (
      token_decoded !==
      process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD
    ) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized access" });
    }

    // Proceed to next middleware
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export default adminAuth;
