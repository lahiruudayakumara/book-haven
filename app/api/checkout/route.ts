import { NextRequest, NextResponse } from "next/server";

import CheckoutModel from "@/models/checkout";
import Logger from "@/utils/logger";
import mongodb from "@/lib/database/mongodb";

export async function POST(req: NextRequest) {
  try {
    await mongodb();

    const data = await req.json();

    if (!data || !data.customerDetails || !data.items || !data.totalAmount) {
      return NextResponse.json({ message: "Invalid input: Missing required fields" }, { status: 400 });
    }

    const order = await CheckoutModel.create(data);

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    Logger.error("POST /books ERROR: ", error);
    return NextResponse.json({ message: "Error creating order", error: true }, { status: 400 });
  }

}
