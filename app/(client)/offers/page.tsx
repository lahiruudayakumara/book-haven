"use client";

import { useEffect, useState } from "react";

import ErrorResponse from "@/types/error-response";
import { IOffer } from "@/types/offers";
import Image from "next/image";
import { PageHeader } from "@/components/page-header";
import { ScreenContainer } from "@/components/screen-container";
import { getAvialableOffers } from "@/lib/api-requests/offers/get-avialable-offers";

export default function Offers() {
  const [offers, setOffers] = useState<IOffer[]>([]);

  useEffect(() => {
    const fetchOferDetails = async (): Promise<IOffer | ErrorResponse> => {
      try {
        const response = await getAvialableOffers();
        return response;
      } catch (error) {
        console.error("Error fetching writers:", error);
        return { error: "Error fetching writers" };
      }
    };

    fetchOferDetails().then((r) => {
      if ("error" in r) {
        console.error(r.error);
        return;
      }

      setOffers(
        r.map((offer: IOffer) => ({
          _id: offer._id,
          title: offer.title,
          description: offer.description,
          discountPercentage: offer.discountPercentage,
          startDate: offer.startDate,
          endDate: offer.endDate,
          applicableBooks: offer.applicableBooks,
          imageUrl: offer.imageUrl,
        }))
      );
    });
  }, []);
  return (
    <div>
      <PageHeader title="Offers" description="This is the cart page" />
      <ScreenContainer>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-4 items-center md:min-h-[27vh] text-gray-200 justify-center space-y-2 gap-6">
        {offers.map((offer) => (
          <div key={offer._id} className="text-black grid grid-cols-2 shadow-lg p-4 rounded-md gap-2">
            <Image src={offer.imageUrl} alt={offer.title} width={100} height={100} className="w-full" />
            <div className="text-left">
              <p className="text-2xl text-primary font-bold">{offer.title}</p>
              <p>{offer.description}</p>
              <p>{offer.discountPercentage}% Discount</p>
              <p>{new Date(offer.startDate).toLocaleDateString()} - {new Date(offer.endDate).toLocaleDateString()}</p>
              <p></p>
            </div>
          </div>
        ))}
        {/* <Gift size={70} /> */}
        {/* <p className="font-bold">No Offer Avialable</p> */}
      </div>
      </ScreenContainer>
    </div>
  );
}
