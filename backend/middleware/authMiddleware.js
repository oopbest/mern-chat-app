import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ error: "Unauthorized - No token found" });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    if (!decode) {
      return res.status(401).json({ error: "Unauthorized - Invalid token" });
    }

    // ใช้ .select("-password") เพื่อลบฟิลด์ password ออกจากข้อมูลที่ส่งกลับ
    const user = await User.findById(decode.userId).select("-password");

    if (!user) {
      return res.status(401).json({ error: "Unauthorized - User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("Error verifying token", error);
    res.status(500).json({ error: error.message });
  }
};

export default protectRoute;
