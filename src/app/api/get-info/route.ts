import { NextRequest, NextResponse } from "next/server";
import ytdl from "@distube/ytdl-core";

export const GET = async (req: NextRequest) => {
    const url = req?.nextUrl?.searchParams.get('url') as string
    const info = await ytdl.getBasicInfo(url)
    const data = await ytdl.getInfo(url)
    return NextResponse.json({ info, formats: data.formats }, { status: 200 })
}