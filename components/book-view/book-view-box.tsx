"use client";

import { CirclePlus, Eye } from "lucide-react";
import React, { useState } from "react";

import { BookViewPopup } from "./book-view-popup";
import Image from "next/image";
import { useCart } from "@/context";
import { useToast } from "../toast-provider";

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
  };
}

const ViewBox: React.FC<Props> = ({ book }) => {
  const { addToast } = useToast();
  const { dispatch } = useCart();
  const [open, setOpen] = useState<boolean>(false);
  console.log(book);

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: book._id,
        img: book.ImageURL,
        name: book.Title,
        price: book.DiscountPrice,
        quantity: 1,
      },
    })
    addToast("Item added to cart", "success");
  };

  return (
    <div className="shadow-md min-h[450px] hover:shadow-lg p-2 rounded-md space-y-1 dark:bg-gray-800 dark:text-white group transition-all duration-300 ease-in-out">
      <BookViewPopup
        book={book}
        open={open}
        handleClosePopup={() => setOpen(!open)}
      />
      <Image
        src={book.ImageURL}
        className="w-full h-[275px] rounded-md transform group-hover:scale-105 transition-transform duration-300 ease-in-out"
        alt="img"
        width={100}
        height={100}
      />
      <h1>
        {book.Title.length > 20 ? `${book.Title.slice(0, 20)}...` : book.Title}
      </h1>
      <p className="transition-colors duration-300 ease-in-out">
        LKR{" "}
        {new Intl.NumberFormat("en-LK", {
          style: "currency",
          currency: "LKR",
          minimumFractionDigits: 0,
        })
          .format(book.DiscountPrice)
          .replace("LKR", "")
          .trim()}
        <span className="ml-4 text-slate-400 line-through">
          {book.Price === book.DiscountPrice
            ? ""
            : new Intl.NumberFormat("en-LK", {
                style: "currency",
                currency: "LKR",
                minimumFractionDigits: 0,
              })
                .format(book.Price)
                .replace("LKR", "")
                .trim()}
        </span>
      </p>
      <div className="flex justify-end gap-3 md:group-hover:opacity-100 md:opacity-0 transform transition-all duration-300 ease-in-out">
        <div
          className="cursor-pointer hover:text-primary transition-colors duration-300 ease-in-out"
          onClick={handleAddToCart}
        >
          <CirclePlus />
        </div>
        <div
          onClick={() => setOpen(true)}
          className="hidden md:block cursor-pointer hover:text-primary transition-colors duration-300 ease-in-out"
        >
          <Eye />
        </div>
      </div>
    </div>
  );
};

export default ViewBox;
