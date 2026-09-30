import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided in form data' },
        { status: 400 }
      );
    }

    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const originalName = file.name || 'upload';
    const ext = path.extname(originalName) || '.jpg';
    const baseName = path.basename(originalName, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    const timestamp = Date.now();
    const uniqueFilename = `${baseName}_${timestamp}${ext}`;
    const destinationPath = path.join(UPLOAD_DIR, uniqueFilename);

    fs.writeFileSync(destinationPath, buffer);

    const publicUrl = `/uploads/${uniqueFilename}`;
    const mimeType = file.type || '';
    const isVideo = mimeType.startsWith('video/') || ['.mp4', '.webm', '.mov', '.ogg'].includes(ext.toLowerCase());

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename: uniqueFilename,
      size: file.size,
      type: isVideo ? 'video' : 'image',
      mimeType,
    });
  } catch (error: any) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'File upload failed' },
      { status: 500 }
    );
  }
}
