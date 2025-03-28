"use client";

import React, { Suspense } from "react";

import BookViewBox from "./book-view-box";
import Pagination from "../pagination";
import SkeletonBookBox from "../skelton/skelton-box";

interface Props {
  book: {
    _id: string;
    Title: string;
    Price: GLfloat;
    DiscountPrice: GLfloat;
    Category: string;
    Writer: string;
    BookURL: string;
    ImageURL: string;
    Description: string;
  }[];
  title: string;
  page: number;
  totalPage: number;
  limit: number;
  itemsPerPageOptions?: number[];
  onPageChange: (page: number) => void;
  onLimitChange: (page: number) => void;
}

const BookViewArea: React.FC<Props> = ({
  title,
  book,
  page,
  totalPage,
  limit,
  itemsPerPageOptions,
  onPageChange,
  onLimitChange,
}) => {
  // const [popupView, setPopupView] = useState<boolean>(false);
  const isLoading = book.length === 0;

  return (
    <div className="w-full my-8 px-4 md:px-0">
      <h1 className="text-xl text-primary font-bold mb-4">{title}</h1>
      <Suspense
        fallback={
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
            {[...Array(8)].map((_, i) => (
              <SkeletonBookBox key={i} />
            ))}
          </div>
        }
      >
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
            {[...Array(12)].map((_, i) => (
              <SkeletonBookBox key={i} />
            ))}
          </div>
        ) : book.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
            {book.map((item, index) => (
              <BookViewBox key={index} book={item} />
            ))}
          </div>
        ) : (
          <div className="col-span-2 md:col-span-3 lg:col-span-4 h-auto my-auto text-center w-full">
            No books found
          </div>
        )}
      </Suspense>
      <Pagination
        currentPage={page}
        totalItems={totalPage}
        itemsPerPage={limit}
        onItemsPerPageChange={onLimitChange}
        onPageChange={onPageChange}
        itemsPerPageOptions={itemsPerPageOptions}
      />
    </div>
  );
};

export default BookViewArea;
