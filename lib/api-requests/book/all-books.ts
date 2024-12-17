import { IGetBooK, IPostBook } from "@/types/book";

import ErrorResponse from "@/types/error-response";
import Logger from "@/utils/logger";

export default async function allBooks(book: IPostBook): Promise<
    IGetBooK | ErrorResponse
> {

    try {
        const data = new FormData();

        if (book.page) {
            data.append("page", book.page.toString())
        }

        if (book.limit) {
            data.append("limit", book.limit.toString())
        }

        if (book.category) {
            data.append("category", book.category)
        }

        if (book.keyword) {
            data.append("keyword", book.keyword)
        }


        const response = await fetch("/api/book", {
            method: "POST",
            body: data
        });
        if (!response.ok) {
            throw new Error("Failed to fetch books");
        }
        const books = await response.json();
        return books;
    } catch (error) {
        Logger.error("Error:", error);
        return { error: "Internal server error" };
    }
}