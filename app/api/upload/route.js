import { NextResponse } from 'next/server';
import lighthouse from "@lighthouse-web3/sdk";

export async function POST(request) {
    try {
        const data = await request.json();
        const jsonString = JSON.stringify(data, null, 2);

        const uploadResponse = await lighthouse.uploadText(
            jsonString,
            process.env.LIGHTHOUSE_API_KEY,
            "data.json"
        );

        return NextResponse.json({ 
            success: true, 
            ipfsHash: uploadResponse.data.Hash 
        });

    } catch (error) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
