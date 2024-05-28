import { useProductActions } from "@/context/product/actions/ProductActions";
import { useGetAllProductActions } from "@/context/product/actions/useGetAllProductActions";
import { useEffect, useState } from "react";

/**
 * Renders a pagination component for products.
 *
 * @returns {JSX.Element} The rendered pagination component.
 */
const ProductsPaginationComponent = (): JSX.Element => {
  const { productState, updateFilters } = useProductActions();
  const { data } = useGetAllProductActions();
  const [displayedPages, setDisplayedPages] = useState<number[]>([]);

  /**
   * Calculates the page numbers to display in the pagination.
   *
   * @param {number} currentPage - The current page number.
   * @param {number} totalPages - The total number of pages.
   * @returns {number[]} An array of page numbers to display.
   */
  function calculatePagination(currentPage: number, totalPages: number): number[] {
    // Handle edge cases for first three pages
    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5].slice(0, Math.min(totalPages, 5));
    }

    // Handle edge cases for last three pages
    if (currentPage >= totalPages - 2) {
      return [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages].slice(totalPages - 5 > 0 ? 0 : 4 - totalPages);
    }

    // Calculate pages for normal cases
    return [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2];
  }

  useEffect(() => {
    const newDisplayedPages = calculatePagination(productState.urlQuery.page ?? 1, data?.data.data.totalPages ?? 1);
    setDisplayedPages(newDisplayedPages);

    // Scroll to top smoothly
    const body = document.querySelector('#root');
    body!.scrollIntoView({
      behavior: 'smooth',
    });
  }, [data?.data.data.totalPages, productState.urlQuery.page]);

  return (
    <div className="join my-10">
      <div className="join my-10">
        {/* Previous Page Button */}
        <button
          className={`join-item btn px-2 ${productState.urlQuery.page! <= 1 ? 'btn-disabled' : ''}`}
          onClick={() => updateFilters({ page: (productState.urlQuery.page ?? 1) - 1 })}
          disabled={productState.urlQuery.page! <= 1}
        >
          Previous
        </button>

        {productState.urlQuery.page! > 3 && (
          <button className="join-item btn btn-disabled">...</button>
        )}

        {/* Page Numbers */}
        {displayedPages.map((page) => (
          <button
            key={page}
            className={`join-item btn ${productState.urlQuery.page === page ? 'btn-active' : ''}`}
            onClick={() => updateFilters({ page: page })}
          >
            {page}
          </button>
        ))}

        {productState.urlQuery.page! < (data?.data.data.totalPages! - 3) && (
          <button className="join-item btn btn-disabled">...</button>
        )}

        {/* Next Page Button */}
        <button
          className={`join-item btn ${(productState.urlQuery.page!) >= (data?.data.data.totalPages!) ? 'btn-disabled' : ''}`}
          onClick={() => updateFilters({ page: (productState.urlQuery.page!) + 1 })}
          disabled={(productState.urlQuery.page!) >= (data?.data.data.totalPages!)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductsPaginationComponent;

