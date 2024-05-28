/**
 * @fileoverview Component for filtering product listings. 
 * It provides options for category selection, sort direction, and sorting criteria.
 */

import React, { useState } from 'react';

// Components
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

// Context & Actions
import { useGetAllCategoriesActions } from '@/context/categories/actions/useGetAllCategories';
import { useProductActions } from '@/context/product/actions/ProductActions';
import { LoadingSpinner } from '@/components/LoadingSpinner';

const ProductsFiltersComponent: React.FC = (): JSX.Element => {
  // State to manage the selected category, initialized as undefined
  const [category, setCategory] = useState<undefined | string>();

  // Access product state, dispatch, and filter update functions from context
  const {
    productState,
    updateFilters,
  } = useProductActions();

  // Access category data and loading state from context
  const {
    isLoading,
    error,
    data,
  } = useGetAllCategoriesActions();

  return (
    <>
      <div className="flex flex-row justify-between w-full">
        {/* Filters Title */}
        <div className="text-2xl font-semibold text-gray-800 mb-2">
          Filters
        </div>

        {/* Sort Direction Toggle (Ascending/Descending) */}
        <div>
          <ToggleGroup variant="outline" type="single" value={productState.urlQuery.dir}
            onValueChange={(e) => {
              updateFilters({ dir: e as "Asc" | "Desc" | undefined });
            }}
          >
            {/* Ascending Toggle */}
            <ToggleGroupItem
              value="Asc"
              aria-label="Toggle Ascending"
              className={typeof productState.urlQuery.dir === "undefined" || productState.urlQuery.dir === "Asc" ? "bg-red-500 text-red-800 " : ""}
            >
              <h1>Asc</h1>
            </ToggleGroupItem>

            {/* Descending Toggle */}
            <ToggleGroupItem
              value="Desc"
              aria-label="Toggle Descending"
              className={productState.urlQuery.dir === "Desc" ? "bg-red-500" : ""}
            >
              <h1>Desc</h1>
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>

      {/* Category Selection (Conditional Rendering) */}
      {/* Display the category filter only if data is loaded and there are no errors */}
      {isLoading && error == null ? (
        <div className="flex justify-center"><LoadingSpinner /></div>
      ) : (
        <div className="flex flex-col items-start gap-4">
          {/* Category Filter Title */}
          <h2 className="text-xl font-bold">Select Category</h2>

          {/* Category Selection Dropdown */}
          <div className="flex gap-1">
            <Select
              value={productState.urlQuery.byCategory ?? "Category"}
              onValueChange={(e) => {
                updateFilters({ byCategory: e, page: 1 });
              }}
            >
              {/* Category Dropdown Trigger */}
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>

              {/* Category Dropdown Options */}
              <SelectContent>
                {data?.data.data.items.map((item) => (
                  <React.Fragment key={item.categoryId}>
                    <SelectItem value={item.name}>{item.name}</SelectItem>
                  </React.Fragment>
                ))}
              </SelectContent>
            </Select>

            {/* Category Filter Reset Button */}
            {productState.urlQuery.byCategory ? (
              <Button variant={"outline"} onClick={() => { updateFilters({ byCategory: undefined, page: 1 }); }}>
                Reset
              </Button>
            ) : undefined}
          </div>
        </div>
      )}

      {/* Sort Criteria Selection */}
      <div className="flex flex-col items-start gap-4">
        {/* Sort By Title */}
        <h2 className="text-xl font-bold">Sort By</h2>

        {/* Sort Criteria Dropdown */}
        <div className="flex gap-1">
          <Select
            value={productState.urlQuery.sortBy ?? "Name"}
            onValueChange={(e) => {
              updateFilters({ sortBy: e as "Name" | "Price" | "Stock" | undefined, page: 1 });
            }}
          >
            {/* Sort Criteria Dropdown Trigger */}
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>

            {/* Sort Criteria Dropdown Options */}
            <SelectContent>
              <SelectItem value={"Name"}>Name</SelectItem>
              <SelectItem value={"Price"}>Price</SelectItem>
              <SelectItem value={"Stock"}>Stock</SelectItem>
            </SelectContent>
          </Select>

          {/* Sort Criteria Reset Button */}
          {productState.urlQuery.sortBy !== "Name" ? (
            <Button variant={"outline"} onClick={() => { updateFilters({ sortBy: "Name", page: 1 }); }}>
              Reset
            </Button>
          ) : undefined}
        </div>
      </div>
    </>
  );
};

export default ProductsFiltersComponent;
