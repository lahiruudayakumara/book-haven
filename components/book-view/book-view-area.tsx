"use client";

import React, { useState } from "react";

import BookViewBox from "./book-view-box";
import Pagination from "../pagination";

interface Props {
  book: {
    id: string;
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
  onLimitChange
}) => {
  const [popupView, setPopupView] = useState<boolean>(false);

  return (
    <div className="w-full my-8 px-4 md:px-0">
      <h1 className="text-xl text-primary font-bold mb-4">{title}</h1>
      <div className="grid grid-cols-2 md:grid-col-3 lg:grid-cols-6 gap-3 md:gap-4">
        {book.map((item, index) => (
          <BookViewBox key={index} book={item} />
        ))}
      </div>
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
