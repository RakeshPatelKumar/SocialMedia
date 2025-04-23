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
      console.log("Update Profile API called"); // Debugging log
      console.log("Request body:", req.body); // Debugging log
      console.log("Request files:", req.files); // Debugging log
  
      let { firstName, lastName, userName, headline, location, gender } = req.body;
      let skills = req.body.skills ? JSON.parse(req.body.skills) : [];
      let education = req.body.education ? JSON.parse(req.body.education) : [];
      let experience = req.body.experience ? JSON.parse(req.body.experience) : [];
      let profileImage;
      let coverImage;
  
      if (req.files.profileImage) {
        profileImage = await uploadOnCloudinary(req.files.profileImage[0].path);
      }
      if (req.files.coverImage) {
        coverImage = await uploadOnCloudinary(req.files.coverImage[0].path);
      }
  
      let user = await User.findByIdAndUpdate(
        req.userId,
        {
          firstName,
          lastName,
          userName,
          headline,
          location,
          gender,
          skills,
          education,
          experience,
          profileImage,
          coverImage,
        },
        { new: true }
      ).select("-password");
  
      console.log("Updated user:", user); // Debugging log
      return res.status(200).json(user);
    } catch (error) {
      console.error("Error updating profile:", error); // Log the error
      return res.status(500).json({ message: `Update profile error: ${error.message}` });
    }
  };