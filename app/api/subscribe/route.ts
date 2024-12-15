import { NextRequest, NextResponse } from "next/server";

import Logger from "@/utils/logger";
import SubscribeModel from "@/models/subscribe";
import mongodb from "@/lib/database/mongodb";

// export async function GET() {
//     try {
//         await mongodb();
//         const companies = await BookModel.find({});
//         console.log("GET /companies: ", companies);
//         return NextResponse.json(companies, { status: 200 });
//     } catch (error) {
//         Logger.info("GET /companies ERROR: ", error);
//         return NextResponse.json({ error: true }, { status: 500 });
//     }
// }

export async function POST(req: NextRequest) {
    try {
        await mongodb();
        const data = await req.formData();
        const email = data.get("email");

        const newBook = new SubscribeModel({ email: email });
        await newBook.save();
        return NextResponse.json(newBook, { status: 201 });
    } catch (error) {
        Logger.info("POST /subscribe ERROR: ", error);
        return NextResponse.json({ error: true }, { status: 500 });
    }
}