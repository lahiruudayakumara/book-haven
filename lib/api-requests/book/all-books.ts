import { IGetBooK, IPostBook } from "@/types/book";

import ErrorResponse from "@/types/error-response";

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


        const response = await fetch("/api/book", {
            method: "POST",
            body: data
        });
        if (!response.ok) {
            throw new Error("Failed to fetch books");
        }
        const books = await response.json();
        console.log(books)
        return books;
    } catch (error) {
        console.error("Error:", error);
        return { error: "Internal server error" };
    }
}