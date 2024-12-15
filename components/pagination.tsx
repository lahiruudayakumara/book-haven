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

  return (
    <div className="flex flex-col items-center space-y-4 mt-12">
      {/* Page Navigation */}
      <div className="flex justify-center items-center space-x-2">
        <button
          className="p-2 bg-primary text-white rounded hover:bg-gray-300 disabled:opacity-50"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        <div className="flex items-center space-x-2">
          <label htmlFor="itemsPerPage" className="text-sm font-medium">
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

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          className="p-2 bg-primary text-white rounded hover:bg-gray-300 disabled:opacity-50"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      {/* Total Items */}
      <div className="text-sm">
        Total items: <strong>{totalItems}</strong>
      </div>
    </div>
  );
};

export default Pagination;
