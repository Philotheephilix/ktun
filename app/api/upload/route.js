import { Agent } from '@fileverse/agents';
import { NextResponse } from 'next/server';

const agent = new Agent({
    chain: "sepolia", 
    pinataJWT: process.env.PINATA_JWT, 
    pinataGateway: process.env.PINATA_GATEWAY, 
    pimlicoAPIKey: process.env.PIMLICO_API_KEY,
});

export async function POST(request) {
    try {
        const data = await request.json();
        await agent.setupStorage('my-namespace');
        const file = await agent.create(JSON.stringify(data));
        return NextResponse.json({ 
            success: true, 
            fileId: file.fileId 
        });

    } catch (error) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({ status: 'API is running' });
}