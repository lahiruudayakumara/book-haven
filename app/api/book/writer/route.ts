import BookModel from "@/models/book";
import Logger from "@/utils/logger";
import { NextResponse } from "next/server";
import mongodb from "@/lib/database/mongodb";

export async function GET() {
    try {
        await mongodb();

        const writers = await BookModel.find().select("Writer").exec();

        const allWriters = writers.map((book) => ({
            id: book._id,
            writer: book.Writer,
        }));

        // Deduplicate based on writer names
        const uniqueWriters = Array.from(
            new Map(allWriters.map((item) => [item.writer, item])).values()
        );

        // Sort writers alphabetically by writer name
        uniqueWriters.sort((a, b) => a.writer.localeCompare(b.writer));

        return NextResponse.json(
            {
                writers: uniqueWriters,
            },
            { status: 200 }
        );
    } catch (error) {
        Logger.error("POST /writers ERROR: ", error);
        return NextResponse.json(
            { error: true, message: "Internal server error" },
            { status: 500 }
        );
    }
}
