import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

export const uploadOnCloudinary = async (filepath) => {
  try {
    if (!filepath) {
      throw new Error("No file provided");
    }

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const uploadResult = await cloudinary.uploader.upload(filepath, {
      resource_type: "raw",
      format: "glb",
      access_mode: "public",
      use_filename: true,
    });

    // Delete the local file after successful upload
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    return uploadResult.secure_url;
  } catch (error) {
    // Clean up the local file if it exists
    if (filepath && fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }
    throw new Error(`Error uploading to Cloudinary: ${error.message}`);
  }
};
