import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const uploadOnCloudinary = async (filePath) => {
  // Log the Cloudinary config to ensure the env variables are loaded correctly
  console.log("Cloudinary Config:", {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

  // Configure Cloudinary with the loaded environment variables
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

  try {
    if (!filePath) {
      console.error("No file path provided!");
      return null;
    }

    if (!fs.existsSync(filePath)) {
      console.error("File not found at:", filePath);
      return null;
    }

    // Upload the image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(filePath);
    console.log("Upload successful:", uploadResult.secure_url);

    // Clean up the file after upload
    fs.unlinkSync(filePath);

    // Return the URL of the uploaded image
    return uploadResult.secure_url;

  } catch (error) {
    console.error("Cloudinary upload error:", error);

    // Clean up the file even if upload fails
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return null;
  }
};

export default uploadOnCloudinary;
