import React from "react";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  itemsPerPageOptions?: number[];
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (limit: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  itemsPerPageOptions = [5, 10, 20, 50],
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newLimit = parseInt(e.target.value, 10);
    onItemsPerPageChange(newLimit);
    onPageChange(1); // Reset to the first page after changing items per page
  };

  // Generate page numbers dynamically
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 mt-12">
      {/* Items Per Page Selector */}
      <div className="md:flex items-center space-x-2 hidden">
        <label htmlFor="itemsPerPage" className="text-sm font-medium dark:text-slate-200">
          Items per page:
        </label>
        <select
          id="itemsPerPage"
          className="p-2 border rounded"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
        >
          {itemsPerPageOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Pagination Buttons */}
      <div className="flex justify-center items-center space-x-1">
        {/* Previous Button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded ${
            currentPage === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-primary text-white hover:bg-primary-dark"
          }`}
        >
          Prev
        </button>

        {/* Page Numbers */}
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-1 rounded ${
              currentPage === page
                ? "bg-primary text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {page}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
          className={`px-3 py-1 rounded ${
            currentPage === totalPages || totalPages === 0
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-primary text-white hover:bg-primary-dark"
          }`}
        >
          Next
        </button>
      </div>

      {/* Total Items */}
      <div className="text-sm dark:text-slate-200">
        Total items: <strong>{totalItems}</strong>
      </div>
    </div>
  );
};

export default Pagination;
