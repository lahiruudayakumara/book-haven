import Image from "next/image";
import { X } from "lucide-react";

interface Props {
  open: boolean;
  handleClosePopup: () => void;
  book: {
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

export const BookViewPopup: React.FC<Props> = ({
  book,
  open,
  handleClosePopup,
}) => {
  return (
    <div>
      {open && (
        <div className="z-50 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transform transition-all duration-300 ease-in-out">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-3/4 md:w-1/2 lg:w-1/3">
            <button onClick={handleClosePopup} className="ml-auto flex hover:text-primary transition-all duration-300 ease-in-out">
              <X />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-4">
              <Image
                src={book.ImageURL}
                className="w-full h-[275px] md:h-auto object-cover rounded-md"
                alt={book.Title}
                width={100}
              />
              <div>
                <h2 className="text-xl font-semibold">{book.Title}</h2>
                <p className="text-gray-600 dark:text-gray-100 mt-2">By {book.Writer}</p>
                <p className="text-sm text-gray-500 dark:text-gray-100 mt-1">{book.Category}</p>
                <div className="flex items-center gap-2 mt-4">
                  <p className="text-lg font-bold text-primary">
                    LKR {book.DiscountPrice.toLocaleString()}
                  </p>
                  {book.Price !== book.DiscountPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      LKR {book.Price.toLocaleString()}
                    </span>
                  )}
                </div>
                <p className="text-gray-700 mt-4 dark:text-white">{book.Description}</p>
                {/* <div className="mt-4 flex justify-end gap-3">
                  <a
                    href={book.BookURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    View Book
                  </a>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
