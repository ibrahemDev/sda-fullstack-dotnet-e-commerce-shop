import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';


import { useGetAllProductActions } from '@/context/product/actions/useGetAllProductActions';
import { useProductActions } from '@/context/product/actions/ProductActions';
import ProductsFiltersComponent from './components/ProductsFilters';
import ProductsComponent from './components/Products';
import ProductsPaginationComponent from './components/ProductsPagination';
import { RemoveProductContextProvider, RemoveProductModel } from './components/RemoveProductComponent';
import { AddProductModel } from './components/CreateProductComponent';
import { useAuthenticationActions } from '@/context/auth/actions/useAuthenticationActions';


/**
 * Renders the ProductsPage component.
 * 
 * The ProductsPage component displays a list of products,
 * a search bar, filters, and pagination controls. It fetches
 * product data and allows users to interact with the products.
 *
 * @returns {JSX.Element} The rendered ProductsPage component.
 */
const ProductsPage: React.FC = () => {
  /**
   * Uses the useProductActions hook to manage product state and dispatch actions.
   * - productState: Holds the current state of the products, including filters.
   * - productDispatch: A function to dispatch actions that modify the product state.
   * - updateFilters: A function to update the product filters based on user interaction.
   * - resetProductFilters: A function to reset the product filters to their default values.
   */
  const {
    productState,
    productDispatch,
    updateFilters,
    resetProductFilters
  } = useProductActions();
  /**
 * Uses the useGetAllProductActions hook to fetch product data.
 * - isLoading: Indicates whether the product data is currently being fetched.
 * - data: Holds the fetched product data, if available.
 */
  const {
    isLoading,
    data,
  } = useGetAllProductActions();

  /**
   * Uses the useForm hook from react-hook-form to manage the search form.
   * - register: A function to register input fields with the form.
   * - handleSubmit: A function to handle form submission.
   * - setValue: A function to set the value of a form field.
   * - errors: An object containing any validation errors in the form.
   */
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      search: productState.urlQuery.search,
    },
  });

  /**
   * Uses the useAuthenticationActions hook to access authentication-related data and functions.
   * - token: The user's authentication token, if logged in.
   * - isLoggedIn: Indicates whether the user is currently logged in.
   * - isAdmin: Indicates whether the user has administrator privileges.
   * - userId: The ID of the logged-in user, if available.
   * - logout: A function to log the user out.
   * - user: An object containing information about the logged-in user.
   */
  const { token, isLoggedIn, isAdmin, userId, logout, user } = useAuthenticationActions();

  /**
   * useEffect hook to reset product filters when the component mounts.
   */
  useEffect(() => {
    resetProductFilters();
  }, [])

  return (
    <div >

      <div className=' min-h-screen w-full'>
        {/* Search Bar */}
        <div className='flex flex-row justify-between items-end mx-4'>
          <form className='w-full'
            onSubmit={
              isLoading
                ? () => { }
                : handleSubmit((data) => {
                  updateFilters({ search: data.search, page: 1 });
                })
            }
          >
            <div className="navbar-center flex items-center gap-1 m-auto max-w-[700px] mt-32">
              <label className="input input-bordered flex items-center gap-2 w-full mr-0 pr-0">
                <input type="text" required={false} {...register('search', { required: false })} className="grow " placeholder='Search for products' />
                <button type='submit' className='cursor-pointer p-4' >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                </button>
              </label>
            </div>
          </form>
          {/* Add Product Button (Visible to admins) */}
          {isLoggedIn && isAdmin && <AddProductModel />}

        </div>
        {/* Products Filters and List */}
        <div className='flex gap-5 flex-row justify-between mt-4'>
          {/* Product Filters (Hidden on small screens) */}
          <div className='hidden lg:flex flex-col gap-3 items-start min-h-screen  bg-white ml-3 rounded-lg p-3 w-96 shadow-xl max-h-full text-card-foreground border-[1px]'>
            <ProductsFiltersComponent />
          </div>
          {/* Product List */}
          <div className='flex flex-col gap-2 min-h-screen w-full mr-3'>
            <ProductsComponent />
          </div>
        </div>
        {/* Pagination Controls */}
        <ProductsPaginationComponent />
      </div>
    </div>
  );
};

export default ProductsPage;

