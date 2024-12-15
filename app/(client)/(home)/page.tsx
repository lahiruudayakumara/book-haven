"use client";

import { CreditCard, Headset, Package, Rocket } from "lucide-react";
import { IBook, IGetBooK } from "@/types/book";
import { useEffect, useState } from "react";

import BookViewArea from "@/components/book-view/book-view-area";
import ErrorResponse from "@/types/error-response";
import Image from "next/image";
import { ScreenContainer } from "@/components/screen-container";
import allBooks from "@/lib/api-requests/book/all-books";

export default function Home() {
  const [books, setBooks] = useState<IBook[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(12);
  const [totalCount, setTotalCount] = useState<number>(1)
  // const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEmployeeDetails = async (): Promise<
      IGetBooK | ErrorResponse
    > => {
      try {
        const response = await allBooks({
          limit: limit,
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
      setTotalCount(r.totalCount)
      // setIsLoading(false);
    });
  }, [currentPage, limit]);

  return (
    <div className="flex flex-col items-center py-4 dark:bg-gray-700">
      <ScreenContainer>
        <div className="w-full h-auto">
          <div className="overflow-hidden md:grid grid-cols-2 gap-2 mb-4 px-2 md:px-0">
            <div className="bg-gray-200 md:min-h-[500px]">
              <Image
                src="/logo.png"
                width={100}
                height={100}
                className="w-full h-full"
                alt="main-banner"
              />
            </div>
            <div className="md:grid grid-rows-2 gap-2 hidden">
              <div className="bg-gray-200">
                <Image
                  src="/logo.png"
                  width={100}
                  height={100}
                  className="w-full h-full"
                  alt="main-banner"
                />
              </div>
              <div className="bg-gray-200">
                <Image
                  src="/logo.png"
                  width={100}
                  height={100}
                  className="w-full h-full"
                  alt="main-banner"
                />
              </div>
            </div>
          </div>

          {/* <BookViewArea title="New Arrival" book={books.slice(-6)} /> */}

          <div className="grid md:grid-cols-4 my-4 md:mx-4 border border-l-0 border-r-0 border-t-2 border-b-2 py-2 md:divide-x-2 divide-y-2 md:divide-y-0">
            <div className="flex flex-col items-center p-4 gap-4">
              <Rocket size={50} />
              <span>Word wide Delivery</span>
            </div>
            <div className="flex flex-col items-center p-4 gap-4">
              <Headset size={50} />
              <span>Customer Support</span>
            </div>
            <div className="flex flex-col items-center p-4 gap-4">
              <CreditCard size={50} />
              <span>Online Payment Methods</span>
            </div>
            <div className="flex flex-col items-center p-4 gap-4">
              <Package size={50} />
              <span>Cash On Delivery</span>
            </div>
          </div>

          <BookViewArea
            title="All Books"
            book={books}
            page={currentPage}
            totalPage={totalCount}
            limit={limit}
            itemsPerPageOptions={[6, 12, 36]}
            onLimitChange={setLimit}
            onPageChange={setCurrentPage}
          />
        </div>
      </ScreenContainer>
    </div>
  );
}
