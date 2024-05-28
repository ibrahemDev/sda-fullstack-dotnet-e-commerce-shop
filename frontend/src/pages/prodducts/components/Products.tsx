/**
 * @fileoverview Component to display a list of products. 
 * It handles loading states, errors, and empty results.
 */

import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// Components
import ProductItemComponent from './ProductItem';

// Context & Actions
import { useGetAllProductActions } from '@/context/product/actions/useGetAllProductActions';

// Utilities
import { generateKey } from '@/lib/utils';
import { RemoveProductContextProvider, RemoveProductModel } from './RemoveProductComponent';
import { EditProductContextProvider, EditProductModel } from './EditProductComponent';

/**
 * Renders a list of product items.
 * 
 * @returns {JSX.Element} The rendered ProductsComponent.
 */

const ProductsComponent: React.FC<{ isAdminMode?: boolean }> = ({ isAdminMode: _isAdminMode }): JSX.Element => {
  const isAdminMode = _isAdminMode || false;


  // Access product fetching state and data
  const {
    isLoading,
    error,
    data,

  } = useGetAllProductActions();

  // Display a loading skeleton while fetching data
  if (isLoading) {
    return (
      <>
        {Array.from({ length: 25 }).map((_, index) => (
          <div className='w-full h-32' key={generateKey(index)}>
            <Skeleton count={2} />
          </div>
        ))}
      </>
    );
  }

  // Display an error message if fetching fails
  if (error) {
    // Use optional chaining to safely access error message
    if (error instanceof Error) {
      return <div>Error: {error.message ?? ''}</div>;
    } else {
      return <div>Error.....</div>;
    }
  }

  // Display a message if no products are found
  if (data && data?.data.data.items.length <= 0) {
    return (
      <div className="flex flex-col items-center justify-start">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center w-full">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">No products found.</h1>
          <p className="text-gray-600">
            We couldn't find any products matching your search.
          </p>
        </div>
      </div>
    );
  }

  // Render the list of product items
  return (
    <>
      <RemoveProductContextProvider>
        <EditProductContextProvider>
          {data?.data.data.items.map((product, index) => (
            <ProductItemComponent key={generateKey(index)} product={product} isAdminMode={isAdminMode} />
          ))}

          <EditProductModel />
        </EditProductContextProvider>
        <RemoveProductModel />
      </RemoveProductContextProvider>
    </>
  );
};

export default ProductsComponent;
