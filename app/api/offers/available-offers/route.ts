import Logger from "@/utils/logger";
import { NextResponse } from "next/server";
import OfferModel from "@/models/offers";
import mongodb from "@/lib/database/mongodb";

export async function GET() {
  try {
    await mongodb();

    // const today = new Date().toISOString().split('T')[0];

    const activeOffers = await OfferModel.find();

    return NextResponse.json(activeOffers);
  } catch (error) {
    Logger
    .error('Error fetching active offers:', error);
    return NextResponse.error();
  }
}
