import mongoose, { Document, Schema } from 'mongoose';

import { IBook } from '@/types/book'; // Adjust the path to your interface

// Define the schema for the book model
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
    timestamps: true, // This will automatically add createdAt and updatedAt fields
  }
);

// Prevent model overwrite by checking if it already exists in mongoose.models
const BookModel = mongoose.models.Book || mongoose.model<IBook>('Book', bookSchema);

export default BookModel;
