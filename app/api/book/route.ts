import { NextRequest, NextResponse } from "next/server";

import BookModel from "@/models/book";
import Logger from "@/utils/logger";
import mongodb from "@/lib/database/mongodb";

export async function POST(request: NextRequest) {
    try {
        await mongodb();
        const formData = await request.formData();
        const category = formData.get("category")?.toString() || "";
        const page = parseInt(formData.get("page")?.toString() || "1", 10);
        const limit = parseInt(formData.get("limit")?.toString() || "10", 10);

        let filter: any = {};
        // if (search) {
        //     filter = { ...filter, name: { $regex: search, $options: "i" } };
        // }

        if (category) {
            filter = {...filter, Category: category}
        }

        const books = await BookModel.find(filter)
            .skip((page - 1) * limit)
            .limit(limit)
            .exec();

        const totalCount = await BookModel.countDocuments(filter);
        const totalPages = Math.ceil(totalCount / limit);

        return NextResponse.json(
            {
                books,
                totalCount,
                totalPages,
                currentPage: page
            },
            { status: 200 }
        );
    } catch (error) {
        Logger.error("POST /books ERROR: ", error);
        return NextResponse.json({ error: true, message: "Internal server error" }, { status: 500 });
    }
}
