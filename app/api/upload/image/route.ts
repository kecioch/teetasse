import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dmha29xqb",
  api_key: "959427274653521",
  api_secret: "QRFTYsGamQdKfT4BO5OMLQRJoPo",
});

const upload = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer); //  <-- convert to Buffer

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ resource_type: "image", folder: "teetasse" }, onDone)
      .end(buffer);

    function onDone(error: any, result: any) {
      if (error) {
        return reject({ success: false, error });
      }
      return resolve({ success: true, result });
    }
  });
};

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    console.log(file);

    if (!file) {
      return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
    }

    // Upload the file to Cloudinary
    // const result = await cloudinary.uploader.upload(file.stream());
    const result = await upload(file);
    console.log(result);

    // You can now use 'result.url' to access the Cloudinary URL of the uploaded image
    return NextResponse.json({ result }, { status: 200 });
    // return NextResponse.json({ message: "IT WORKS", path: "/upload/image" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
