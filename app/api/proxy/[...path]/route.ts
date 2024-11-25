import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { ENV } from '@/utils/constants';

const backend = ENV.backend;

export async function GET(req: NextRequest, { params }: { params: { path: string[] } }) {
    return handleProxy(req, params);
}

export async function POST(req: NextRequest, { params }: { params: { path: string[] } }) {
    return handleProxy(req, params);
}

export async function PUT(req: NextRequest, { params }: { params: { path: string[] } }) {
    return handleProxy(req, params);
}

export async function PATCH(req: NextRequest, { params }: { params: { path: string[] } }) {
    return handleProxy(req, params);
}

export async function DELETE(req: NextRequest, { params }: { params: { path: string[] } }) {
    return handleProxy(req, params);
}

async function handleProxy(req: NextRequest, params: { path: string[] }) {
    const path = params.path.join('/');
    const url = `${backend}/${path}`;

    try {
        const headers = { ...Object.fromEntries(req.headers.entries()) };
        console.log("proxy header : ", headers)
        delete headers.host;
        console.log("proxy req.method : ", req.method)
        console.log("proxy req : ", req)
        const body = req.method !== 'GET' && req.method !== 'HEAD' ? await req.json() : undefined;
        console.log("proxy body : ", body)

        const response = await axios({
            method: req.method,
            url,
            headers,
            data: body,
        });

        console.log("proxy call  url : ", {
            method: req.method,
            url,
            headers,
            data: body,
        })

        return NextResponse.json(response.data, { status: response.status });
    } catch (error) {
        console.log("error : ", error)
        if (axios.isAxiosError(error)) {
            return NextResponse.json(
                { message: error.response?.data || 'Unknown error' },
                { status: error.response?.status || 500 }
            );
        }
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
