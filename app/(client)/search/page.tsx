"use client";

import { IBook, IGetBooK } from "@/types/book";
import { Suspense, useEffect, useState } from "react";

import BookViewAreaWithoutPagination from "@/components/book-view/book-view-area-without-pagination";
import ErrorResponse from "@/types/error-response";
import Logger from "@/utils/logger";
import { PageHeader } from "@/components/page-header";
import { ScreenContainer } from "@/components/screen-container";
import allBooks from "@/lib/api-requests/book/all-books";
import { useSearchParams } from "next/navigation";

const SearchResults = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const keyword = searchParams.get("keyword");

  const [books, setBooks] = useState<IBook[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);

  useEffect(() => {
    const fetchBooks = async (): Promise<IGetBooK | ErrorResponse> => {
      try {
        const response = await allBooks({
          category: category ?? undefined,
          keyword: keyword ?? undefined,
        });
        return response;
      } catch (error) {
        Logger.error("Error fetching books:", error);
        return { error: "Error fetching books" };
      }
    };

    fetchBooks().then((r) => {
      if ("error" in r) {
        Logger.error(r.error);
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
      setTotalCount(r.totalCount);
    });
  }, [category, keyword]);

  return (
    <>
      <PageHeader
        title="Search"
        description={`${
          books.length > 0
            ? `Search results: ${totalCount}`
            : `No books found for keyword: "${keyword}" in category: "${category}"`
        }`}
      />
      <ScreenContainer>
        {books.length > 0 ? (
          <BookViewAreaWithoutPagination title="" book={books} />
        ) : (
          <div className="flex items-center justify-center h-[50vh]">
            <p className="text-lg text-gray-500 ml-4">No books found</p>
          </div>
        )}
      </ScreenContainer>
    </>
  );
};

export default function Search() {
  return (
    <Suspense fallback={<p className="text-center mt-10">Loading search results...</p>}>
      <SearchResults />
    </Suspense>
  );
}
