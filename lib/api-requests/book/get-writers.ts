import ErrorResponse from "@/types/error-response";
import { IBookWriter } from "@/types/book";

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
        console.error("Error:", error);
        return { error: "Internal server error" };
    }
}