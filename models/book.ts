import mongoose, { Document, Schema } from 'mongoose';

import { IBook } from '@/types/book';

const bookSchema: Schema = new Schema(
  {
    Title: {
      type: String,
      required: true,
    },
    Price: {
      type: Number,
      required: true,
    },
    DiscountPrice: {
      type: Number,
      required: true,
    },
    Category: {
      type: String,
      required: true,
    },
    Writer: {
      type: String,
      required: true,
    },
    BookURL: {
      type: String,
      required: true,
    },
    ImageURL: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const BookModel = mongoose.models.Book || mongoose.model<IBook>('Book', bookSchema);

export default BookModel;
