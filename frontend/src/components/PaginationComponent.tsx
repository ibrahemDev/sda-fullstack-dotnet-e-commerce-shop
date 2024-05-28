import { useEffect, useState } from "react";

/**
 * Renders a pagination component for products.
 *
 * @param {object} props - The component props.
 * @param {number} props.currentPage - The current page number.
 * @param {number} props.totalPages - The total number of pages.
 * @param {(page: number) => void} props.onUpdatePageNumber - The callback function to update the current page number.
 * 
 * @returns {JSX.Element} The rendered pagination component.
 */
const PaginationComponent: React.FC<{ currentPage: number, totalPages: number, onUpdatePageNumber: (page: number) => void }> = ({ currentPage, totalPages, onUpdatePageNumber }) => {

  // State to manage the currently displayed page numbers
  const [displayedPages, setDisplayedPages] = useState<number[]>([]);

  /**
   * Calculates the page numbers to display in the pagination.
   * It handles three cases: 
   * 1. When the current page is within the first three pages.
   * 2. When the current page is within the last three pages.
   * 3. For all other cases, it displays the current page and two pages before and after.
   *
   * @param {number} _currentPage - The current page number.
   * @param {number} _totalPages - The total number of pages.
   * @returns {number[]} An array of page numbers to display.
   */
  function calculatePagination(_currentPage: number, _totalPages: number): number[] {
    // Handle edge cases for first three pages
    if (_currentPage <= 3) {
      return [1, 2, 3, 4, 5].slice(0, Math.min(_totalPages, 5));
    }

    // Handle edge cases for last three pages
    if (_currentPage >= _totalPages - 2) {
      return [_totalPages - 4, _totalPages - 3, _totalPages - 2, _totalPages - 1, _totalPages].slice(_totalPages - 5 > 0 ? 0 : 4 - _totalPages);
    }

    // Calculate pages for normal cases
    return [_currentPage - 2, _currentPage - 1, _currentPage, _currentPage + 1, _currentPage + 2];
  }

  // UseEffect to update the displayed page numbers and scroll to top whenever the current page or total pages change
  useEffect(() => {
    const newDisplayedPages = calculatePagination(currentPage ?? 1, totalPages ?? 1);
    setDisplayedPages(newDisplayedPages);

    // Scroll to top smoothly
    const body = document.querySelector('#root');
    body!.scrollIntoView({
      behavior: 'smooth',
    });
  }, [totalPages, currentPage]);

  return (
    <div className="join my-10">
      <div className="join my-10">
        {/* Previous Page Button - Disabled if on the first page */}
        <button
          className={`join-item btn px-2 ${currentPage! <= 1 ? 'btn-disabled' : ''}`}
          onClick={() => onUpdatePageNumber((currentPage ?? 1) - 1)}
          disabled={currentPage! <= 1}
        >
          Previous
        </button>

        {/* Ellipsis to indicate skipped pages - shown only if currentPage is greater than 3 */}
        {currentPage! > 3 && (
          <button className="join-item btn btn-disabled">...</button>
        )}

        {/* Page Numbers - loop through the calculated displayed pages */}
        {displayedPages.map((page) => (
          <button
            key={page}
            className={`join-item btn ${currentPage === page ? 'btn-active' : ''}`}
            onClick={() => onUpdatePageNumber(page)}
          >
            {page}
          </button>
        ))}

        {/* Ellipsis to indicate skipped pages - shown only if currentPage is less than totalPages - 3 */}
        {currentPage! < (totalPages! - 3) && (
          <button className="join-item btn btn-disabled">...</button>
        )}

        {/* Next Page Button - Disabled if on the last page */}
        <button
          className={`join-item btn ${(currentPage!) >= (totalPages!) ? 'btn-disabled' : ''}`}
          onClick={() => onUpdatePageNumber((currentPage!) + 1)}
          disabled={(currentPage!) >= (totalPages!)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationComponent;

