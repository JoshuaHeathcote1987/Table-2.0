import React from "react";

export default function DisplayPagination({ currentPage, totalPages, onPageChange }) {
  // Generate an array of page numbers
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center space-x-2">
      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          className={`px-4 py-2 rounded ${pageNumber === currentPage
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
            }`}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
    </div>
  );
}
