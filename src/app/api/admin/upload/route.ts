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
// SVG icons are allowed, but only plain drawings: anything that could run script is refused,
// and /uploads serves SVGs with a sandboxing Content-Security-Policy as a second line of defence.
const SVG_EXTENSIONS = ['.svg'];
const ALLOWED_EXTENSIONS = [...IMAGE_EXTENSIONS, ...VIDEO_EXTENSIONS, ...DOCUMENT_EXTENSIONS, ...SVG_EXTENSIONS];
const UNSAFE_SVG = /<script|<foreignObject|<iframe|<embed|<object|<use[^>]+href\s*=\s*["']?(?!#)|\son[a-z]+\s*=|javascript:|data:text\/html|<!ENTITY/i;

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
          error: `"${ext || 'no extension'}" files cannot be uploaded. Allowed: images (${IMAGE_EXTENSIONS.join(', ')}), SVG icons, videos (${VIDEO_EXTENSIONS.join(', ')}) and PDF.`,
        },
        { status: 400 }
      );
    }
    if (SVG_EXTENSIONS.includes(ext)) {
      const svgText = buffer.toString('utf-8');
      if (!/<svg[\s>]/i.test(svgText) || UNSAFE_SVG.test(svgText)) {
        return NextResponse.json(
          { success: false, error: 'This SVG contains scripts, links or embedded content and cannot be uploaded. Export a plain SVG drawing and try again.' },
          { status: 400 }
        );
      }
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
