import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

// Only media the site can display. Anything else (html, js, svg with scripts, executables)
// would be served back from /uploads and could run in a visitor's browser.
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif'];
const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.mov', '.ogg', '.ogv', '.m4v'];
const DOCUMENT_EXTENSIONS = ['.pdf'];
const ALLOWED_EXTENSIONS = [...IMAGE_EXTENSIONS, ...VIDEO_EXTENSIONS, ...DOCUMENT_EXTENSIONS];

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
    const ext = (path.extname(originalName) || '').toLowerCase();

    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return NextResponse.json(
        {
          success: false,
          error: `"${ext || 'no extension'}" files cannot be uploaded. Allowed: images (${IMAGE_EXTENSIONS.join(', ')}), videos (${VIDEO_EXTENSIONS.join(', ')}) and PDF.`,
        },
        { status: 400 }
      );
    }
    const baseName = path.basename(originalName, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    const timestamp = Date.now();
    const uniqueFilename = `${baseName}_${timestamp}${ext}`;
    const destinationPath = path.join(UPLOAD_DIR, uniqueFilename);

    fs.writeFileSync(destinationPath, buffer);

    const publicUrl = `/uploads/${uniqueFilename}`;
    const mimeType = file.type || '';
    const isVideo = VIDEO_EXTENSIONS.includes(ext);

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
