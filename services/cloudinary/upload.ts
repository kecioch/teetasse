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
  const arrayBuffer = await file.arrayBuffer();
  // Convert to Buffer
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: ressourceType,
          folder: process.env.CLOUDINARY_PROJECT_FOLDER,
        },
        onDone
      )
      .end(buffer);

    function onDone(error: any, result: any) {
      if (error) {
        return reject({ success: false, error });
      }
      return resolve({ success: true, result });
    }
  });
};
