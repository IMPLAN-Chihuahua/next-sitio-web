import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const path = request.nextUrl.searchParams.get('path');
    const base = process.env.NEXT_PUBLIC_IMPLAN_STATIC;

    if (!base || !path || !path.startsWith('/') || path.startsWith('//') || path.split('/').includes('..')) {
        return new NextResponse('Imagen no válida', { status: 400 });
    }

    try {
        const baseUrl = new URL(base);
        const imageUrl = new URL(path, baseUrl);
        if (imageUrl.origin !== baseUrl.origin || !imageUrl.pathname.startsWith('/uploads/')) {
            return new NextResponse('Imagen no válida', { status: 400 });
        }

        const upstream = await fetch(imageUrl, { cache: 'no-store' });
        if (!upstream.ok) return new NextResponse('Imagen no disponible', { status: 502 });

        const contentType = upstream.headers.get('content-type') || '';
        if (!contentType.startsWith('image/')) {
            return new NextResponse('El archivo no es una imagen', { status: 415 });
        }

        return new NextResponse(upstream.body, {
            headers: {
                'Content-Type': contentType,
                'Content-Disposition': 'attachment; filename="organigrama.png"',
                'X-Content-Type-Options': 'nosniff',
            },
        });
    } catch {
        return new NextResponse('No se pudo descargar la imagen', { status: 502 });
    }
}
