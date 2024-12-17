import Logger from "@/utils/logger";
import { NextResponse } from "next/server";
import OfferModel from "@/models/offers";
import mongodb from "@/lib/database/mongodb";

export async function GET() {
  try {
    await mongodb();

    const activeOffers = await OfferModel.find();

    return NextResponse.json(activeOffers);
  } catch (error) {
    console.error('Error fetching active offers:', error);
    return NextResponse.error();
  }
}
