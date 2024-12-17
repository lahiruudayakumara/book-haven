"use client";

import { IBook, IGetBooK } from "@/types/book";
import { useEffect, useState } from "react";

import BookViewAreaWithoutPagination from "@/components/book-view/book-view-area-without-pagination";
import ErrorResponse from "@/types/error-response";
import { PageHeader } from "@/components/page-header";
import { ScreenContainer } from "@/components/screen-container";
import allBooks from "@/lib/api-requests/book/all-books";

export default function ContactUs() {
  const [books, setBooks] = useState<IBook[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const fetchEmployeeDetails = async (): Promise<
      IGetBooK | ErrorResponse
    > => {
      try {
        const response = await allBooks({
          limit: 12,
          page: currentPage,
        });

        return response;
      } catch (error) {
        console.error("Error fetching books:", error);
        return { error: "Error fetching books" };
      }
    };

    fetchEmployeeDetails().then((r) => {
      if ("error" in r) {
        console.error(r.error);
        // setIsLoading(false);
        return;
      }

      const mappedBooks = r.books.map((book: IBook) => ({
        _id: book._id,
        Title: book.Title,
        Price: book.Price,
        DiscountPrice: book.DiscountPrice,
        Category: book.Category,
        Writer: book.Writer,
        BookURL: book.BookURL,
        ImageURL: book.ImageURL,
        Description: book.Description,
      }));

      setBooks(mappedBooks);
      setCurrentPage(r.currentPage);
    });
  }, [currentPage]);

  return (
    <div>
      <PageHeader
        title="New Book Release"
        description="Learn about our latest book release, connect with the author, and get your copy today!"
      />
      <div className="flex flex-col items-center md:min-h-[27vh] justify-center space-y-4">
        <ScreenContainer>
        <BookViewAreaWithoutPagination title="" book={books.slice(-6)} />
        </ScreenContainer>
      </div>
    </div>
  );
}
