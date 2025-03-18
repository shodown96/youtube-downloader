import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: any) => {
    const url = req?.nextUrl?.searchParams.get('url') as string
    if (!url) {
        return NextResponse.json({
            message: "Bad Request Error"
        }, { status: 400 })
    }
    try {
        const response = await axios.get(url);
        if (response.status !== 200) throw new Error("Failed to fetch movie");

        // const headers = new Headers(response.headers);
        // headers.set("Content-Disposition", `attachment; filename="movie.mp4"`); // Force download
        // headers.set("Access-Control-Allow-Origin", "*"); // Allow all origins

        return new Response(response.data, {
            status: 200,
        });
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ message: "Internal Server Error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}