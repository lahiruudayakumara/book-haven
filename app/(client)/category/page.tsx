"use client";

import { IBook, IGetBooK } from "@/types/book";
import { Suspense, useEffect, useState } from "react";

import BookViewBox from "@/components/book-view/book-view-box";
import ErrorResponse from "@/types/error-response";
import Logger from "@/utils/logger";
import { PageHeader } from "@/components/page-header";
import Pagination from "@/components/pagination";
import { ScreenContainer } from "@/components/screen-container";
import SkeletonBookBox from "@/components/skelton/skelton-box";
import allBooks from "@/lib/api-requests/book/all-books";
import { categories } from "@/data/category";

export default function Writer() {
  const [books, setBooks] = useState<IBook[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(8);
  const [totalCount, setTotalCount] = useState<number>(1);
  const [category, setCategory] = useState<string>("All");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchEmployeeDetails = async (): Promise<
      IGetBooK | ErrorResponse
    > => {
      setIsLoading(true); // Start loading
      try {
        const response = await allBooks({
          limit: limit,
          page: currentPage,
          category: category !== "All" ? category : "",
        });

        return response;
      } catch (error) {
        Logger.error("Error fetching books:", error);
        return { error: "Error fetching books" };
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    fetchEmployeeDetails().then((r) => {
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
      setCurrentPage(r.currentPage);
      setTotalCount(r.totalCount);
    });
  }, [currentPage, limit, category]);

  return (
    <div>
      <PageHeader
        title="Book Categories"
        description="Browse through various book categories, from fiction to non-fiction, and find your next favorite read by talented writers."
      />
      <div className="flex flex-col items-center md:min-h-[27vh] justify-center space-y-2">
        <ScreenContainer>
          <div className="grid grid-cols-4 w-full py-4 gap-8">
            <div className="min-h-[350px] md:max-h-[550px] bg-slate-100 dark:bg-gray-800 p-4 rounded-md">
              <h1 className="text-black text-xl font-bold dark:text-slate-200">Categories</h1>
              <div className="flex flex-col mt-4 space-y-4">
                {categories.map((item) => (
                  <span
                    key={item.id}
                    onClick={() => setCategory(item.name)}
                    className={`text-primary cursor-pointer ${
                      category === item.name ? "font-bold" : ""
                    }`}
                  >
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="col-span-3">
              {/* <div className="w-full flex bg-slate-100 mb-4 rounded-md text-black p-2 px-4">
                <div className="ml-auto ">Filter</div>
              </div> */}
              {/* Content with Loading */}
              <Suspense
                fallback={
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                    {[...Array(8)].map((_, i) => (
                      <SkeletonBookBox key={i} />
                    ))}
                  </div>
                }
              >
                {isLoading ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                    {[...Array(8)].map((_, i) => (
                      <SkeletonBookBox key={i} />
                    ))}
                  </div>
                ) : books.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                    {books.map((item, index) => (
                      <BookViewBox key={index} book={item} />
                    ))}
                  </div>
                ) : (
                  <div className="col-span-2 md:col-span-3 lg:col-span-4 h-auto my-auto text-center w-full">
                    No books found
                  </div>
                )}
              </Suspense>
              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalItems={totalCount}
                onItemsPerPageChange={setLimit}
                itemsPerPage={limit}
                onPageChange={setCurrentPage}
                itemsPerPageOptions={[8, 16, 32]}
              />
            </div>
          </div>
        </ScreenContainer>
      </div>
    </div>
  );
}
