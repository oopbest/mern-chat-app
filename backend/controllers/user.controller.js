import User from "../models/user.model.js";
export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    // ใช้ .select("-password") เพื่อลบฟิลด์ password ออกจากข้อมูลที่ส่งกลับ
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error getting users for sidebar", error);
    res.status(500).json({ error: error.message });
  }
};
