import { NextResponse } from 'next/server';
import fs from 'node:fs';
import path from 'node:path';

export async function GET() {
  const filePath = path.join(process.cwd(), 'media', 'music', 'Happy_and_Joyful_Children.mp4');
  
  try {
    const stats = await fs.promises.stat(filePath);
    const data = fs.createReadStream(filePath);

    // The 'any' cast is needed because Node.js streams and Web streams have slightly
    // different types, but are compatible for this use case.
    return new Response(data as any, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mp4',
        'Content-Length': String(stats.size),
      },
    });
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      return new NextResponse('Audio file not found at ' + filePath, { status: 404 });
    }
    console.error(error);
    return new NextResponse('Error reading audio file.', { status: 500 });
  }
}
