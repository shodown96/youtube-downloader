import ytdl from "@distube/ytdl-core";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest, res: any) => {
    const url = req?.nextUrl?.searchParams.get('url') as string
    const format = req?.nextUrl?.searchParams.get('format') as any
    const quality = req?.nextUrl?.searchParams.get('quality') as string

    const video = ytdl(url, {
        format: format,
        quality: quality,
    })
    return video.pipe(res)
}