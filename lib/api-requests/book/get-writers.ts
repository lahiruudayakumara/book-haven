import ErrorResponse from "@/types/error-response";
import { IBookWriter } from "@/types/book";
import Logger from "@/utils/logger";

export default async function getWriters(): Promise<IBookWriter | ErrorResponse> {
    try {
        const response = await fetch("/api/book/writer", {
            method: "GET",
        });

        if (!response.ok) {
            throw new Error("Failed to fetch writers");
        }

        return await response.json();
    } catch (error) {
        Logger.error("Error:", error);
        return { error: "Internal server error" };
    }
}