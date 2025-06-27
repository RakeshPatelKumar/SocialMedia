import uploadOnCloudinary from "../config/cloudinary.js"
import User from "../models/user.model.js"

export const getCurrentUser=async (req,res)=>{
    try {
        let id=req.userId  
        const user=await User.findById(id).select("-password")
        if(!user){
            return res.status(400).json({message:"user does not found"})
        }

        return res.status(200).json(user)
    } catch (error) {
        console.log(error);

        return res.status(400).json({message:"get current user error"})
    }
}


export const updateProfile = async (req, res) => {
  try {
    let { firstName, lastName, userName, headline, location, gender } = req.body;
    let skills = req.body.skills ? JSON.parse(req.body.skills) : [];
    let education = req.body.education ? JSON.parse(req.body.education) : [];
    let experience = req.body.experience ? JSON.parse(req.body.experience) : [];

    // Build update object
    let updateFields = {
      firstName,
      lastName,
      userName,
      headline,
      location,
      gender,
      skills,
      education,
      experience,
    };

    if (req.files && req.files.profileImage) {
      const profileImage = await uploadOnCloudinary(req.files.profileImage[0].path);
      updateFields.profileImage = profileImage;
    }
    if (req.files && req.files.coverImage) {
      const coverImage = await uploadOnCloudinary(req.files.coverImage[0].path);
      updateFields.coverImage = coverImage;
    }

    let user = await User.findByIdAndUpdate(
      req.userId,
      updateFields,
      { new: true }
    ).select("-password");

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({ message: `Update profile error: ${error.message}` });
  }
};