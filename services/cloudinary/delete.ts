import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const deleteFile = async (id: string) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(id, (error, result) => {
      if (error) {
        console.error("Error deleting file:", error);
        reject({ success: false, message: "Internal server error" });
      } else {
        if (result.result === "ok") {
          resolve({ success: true, message: "file deleted successfully" });
        } else {
          console.error(`Failed to delete file with public ID ${id}`);
          reject({ success: false, message: "Failed to delete file" });
        }
      }
    });
  });
};
