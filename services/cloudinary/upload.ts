import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const upload = async (
  file: File,
  ressourceType: "image" | "video" | "raw" | "auto" = "image"
) => {
  // Convert to Buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  var mime = file.type;
  var encoding = "base64";
  var base64Data = buffer.toString("base64");
  var fileUri = "data:" + mime + ";" + encoding + "," + base64Data;

  return new Promise((resolve, reject) => {
    const res = cloudinary.uploader
      .upload(fileUri, {
        resource_type: ressourceType,
        folder: process.env.CLOUDINARY_PROJECT_FOLDER,
        invalidate: true,
      })
      .then((res) => {
        resolve({ success: true, result: res });
      })
      .catch((e) => {
        reject({ success: false, error: e });
      });
  });
};
