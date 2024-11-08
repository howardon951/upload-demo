import { NextResponse } from "next/server";
import connectDB from "@/database/db";
import File from "@/models/uploadFile";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const file = await File.findById(params.id);

    if (!file) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }
    console.log("file", file);
    if (!Buffer.isBuffer(file.data)) {
      return NextResponse.json({ error: "檔案資料格式錯誤" }, { status: 500 });
    }

    // Setting response headers
    const headers = new Headers();
    headers.set("Content-Type", file.mimetype);
    headers.set(
      "Content-Disposition",
      `attachment; filename*=UTF-8''${encodeURIComponent(file.originalName)}`
    );

    return new NextResponse(file.data, {
      headers,
      status: 200,
    });
  } catch (error) {
    console.error("Download error:", error);
    return NextResponse.json(
      { error: "Failed to download file" },
      { status: 500 }
    );
  }
}
