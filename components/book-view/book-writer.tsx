"use client";

import { CirclePlus, Eye, ShoppingBag } from "lucide-react";
import React, { useState } from "react";

import { BookViewPopup } from "./book-view-popup";
import Image from "next/image";
import { useCart } from "@/context";

interface Props {
  writer: {
    id: string;
    name: string;
  };
}

const BookWriter: React.FC<Props> = ({ writer }) => {
  return (
    <div className="flex flex-col justify-center items-center text-center">
      <Image src="/avatar.svg" width={100} height={100} alt="writer" />
      <p className="text-primary">{writer.name}</p>
    </div>
  );
};

export default BookWriter;
