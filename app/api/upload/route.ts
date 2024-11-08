import { NextResponse } from "next/server";
import connectDB from "@/database/db";
import File from "@/models/uploadFile";

export async function POST(request: Request) {
  try {
    await connectDB();
    const formData = await request.formData();
    const file = formData.get("file") as File;

    // Read the file content
    const buffer = await file.arrayBuffer();

    // Create a new file record
    const newFile = await File.create({
      filename: file.name,
      originalName: file.name,
      mimetype: file.type,
      size: file.size,
      data: Buffer.from(buffer),
      path: file.name,
      metadata: {
        uploadedBy: "user123", // You can add additional information
        category: "documents",
      },
    });

    console.log("successfully uploaded: ", newFile.filename);

    return NextResponse.json({
      success: true,
      fileId: newFile._id,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "File upload failed" }, { status: 500 });
  }
}
