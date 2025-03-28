import { NextRequest, NextResponse } from "next/server";
import ytdl from "@distube/ytdl-core";
// import { createAgentWithRotatingIP } from "@/lib/agent";


export const GET = async (req: NextRequest) => {
    // const agent = createAgentWithRotatingIP();
    const url = req?.nextUrl?.searchParams.get('url') as string
    const info = await ytdl.getBasicInfo(url, { agent:undefined })
    const data = await ytdl.getInfo(url, { agent:undefined })
    return NextResponse.json({ info, formats: data.formats }, { status: 200 })
}