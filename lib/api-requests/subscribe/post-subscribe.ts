import ErrorResponse from "@/types/error-response";
import Logger from "@/utils/logger";

export default async function postSubscribe(email: string): Promise<ErrorResponse | null> {
    try {
        if (!email) {
            return { error: "Email is required" };
        }

        const formData = new FormData();

        formData.append("email", email);

        const response = await fetch("/api/subscribe", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            Logger.error(
                "Failed to subbscribe . Status:",
                response.status
            );
            return { error: "Failed to subscribe" };
        }

        return await response.json();
    } catch (error: unknown) {
        Logger.error("Error:", error);
        return { error: "Failed to subscribe" };
    }

}
