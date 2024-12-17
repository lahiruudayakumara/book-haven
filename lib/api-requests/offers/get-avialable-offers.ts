import ErrorResponse from "@/types/error-response";
import { IOffer } from "@/types/offers";
import Logger from "@/utils/logger";

export const getAvialableOffers = async (): Promise<IOffer | ErrorResponse> => {
    try {
        const response = await fetch('/api/offers/available-offers', {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch active offers');
        }

        return await response.json();
    } catch (error) {
        Logger.error('Error fetching active offers:', error);
        return { error: "Internal server error" };
    }
};
