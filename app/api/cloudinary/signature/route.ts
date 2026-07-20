import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface SignatureRequestBody {
  paramsToSign: Record<string, string | number>;
}

export async function POST(request: NextRequest) {
  try {
    const body: SignatureRequestBody = await request.json();
    const { paramsToSign } = body;

    if (!paramsToSign) {
      return NextResponse.json(
        { error: "Missing paramsToSign" },
        { status: 400 },
      );
    }

    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET!,
    );

    return NextResponse.json({ signature });
  } catch (error) {
    console.error("Cloudinary signature generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate signature" },
      { status: 500 },
    );
  }
}
