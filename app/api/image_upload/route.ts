import {v2 as cloudinary} from 'cloudinary';
import { NextResponse } from 'next/server';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET
});

export async function POST(request: Request) {
  const data = await request.formData();
  const image = data.get("image") as File;
  const bytes = await image.arrayBuffer();
  const buffer = await Buffer.from(bytes);
  const response: any = await new Promise((resolve, reject) => {
    cloudinary.uploader.
      upload_stream({}, (err, result) =>{
        if(err) {
          reject(err)
        }
        resolve(result)
      })
      .end(buffer)
    });
  return NextResponse.json({
    url: response.secure_url
  })
}