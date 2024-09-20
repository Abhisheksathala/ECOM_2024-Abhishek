import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    // Extract the token from the Authorization header (assuming Bearer token)
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: "Token not found" });
    }

    // Verify the token with the secret key
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Check if the decoded token contains the correct admin email
    if (decoded.id !== process.env.ADMIN_EMAIL) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized access" });
    }

    // If everything is valid, proceed to the next middleware
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export default adminAuth;
