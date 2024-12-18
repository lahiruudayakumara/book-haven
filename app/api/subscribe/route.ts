import { NextRequest, NextResponse } from "next/server";

import Logger from "@/utils/logger";
import SubscribeModel from "@/models/subscribe";
import mongodb from "@/lib/database/mongodb";

export async function POST(req: NextRequest) {
    try {
        await mongodb();
        const data = await req.formData();
        const email = data.get("email");

        if (!email) {
            return NextResponse.json({ message: "Invalid input: Missing required fields" }, { status: 400 });
        }

        const existingEmail = await SubscribeModel.findOne({ email: email });

        if (existingEmail) {
            return NextResponse.json({ error: "Email already subscribed" }, { status: 400 });
        }

        const newBook = new SubscribeModel({ email: email });
        await newBook.save();
        return NextResponse.json(newBook, { status: 201 });
    } catch (error) {
        Logger.info("POST /subscribe ERROR: ", error);
        return NextResponse.json({ error: true }, { status: 500 });
    }
}