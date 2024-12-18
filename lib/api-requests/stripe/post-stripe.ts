import ErrorResponse from "@/types/error-response";
import Logger from "@/utils/logger";

interface CreatePaymentIntentResponse {
    clientSecret: string;
}

export const createPaymentIntent = async (amount: number): Promise<CreatePaymentIntentResponse | ErrorResponse> => {
    try {
        if (!amount) {
            return { error: 'Invalid input: Missing required fields' };
        }

        const formData = new FormData();

        amount *= 100;

        formData.append('amount', amount.toString());

        const response = await fetch('/api/stripe', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            Logger.error(
                "Failed to subbscribe . Status:",
                response.status
            );
            return { error: "Failed to create payment intent" };
        }


        return await response.json();
    } catch (error) {
        Logger.error("Error:", error);
        return { error: "Failed to create payment intent" };
    }
};
