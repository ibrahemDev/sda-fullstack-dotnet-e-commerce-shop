import { useAuthenticationActions } from "@/context/auth/actions/useAuthenticationActions";
import { useProductActions } from "@/context/product/actions/ProductActions";
import { useGetAllProductActions } from "@/context/product/actions/useGetAllProductActions";
import { AddProductModel } from "@/pages/prodducts/components/CreateProductComponent";
import ProductsComponent from "@/pages/prodducts/components/Products";
import ProductsFiltersComponent from "@/pages/prodducts/components/ProductsFilters";
import ProductsPaginationComponent from "@/pages/prodducts/components/ProductsPagination";
import { useEffect } from "react";
import { useForm } from "react-hook-form";





/**
 * The `ProductsDashboardPage` component renders a dashboard for managing products. 
 * It provides features like searching, filtering, pagination and adding new products (for admin users). 
 * 
 * @returns The `ProductsDashboardPage` component
 */

const ProductsDashboardPage: React.FC<{}> = ({ }) => {


  // Get product state and dispatch functions
  const {
    productState,
    productDispatch,
    updateFilters,
    resetProductFilters
  } = useProductActions();

  // Get product data from the API
  const {
    isLoading,
    data,
  } = useGetAllProductActions();

  // Get authentication related information
  const { token, isLoggedIn, isAdmin, userId, logout, user } = useAuthenticationActions();

  // Initialize the form hook for search input
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

  // Reset product filters when the component mounts
  useEffect(() => {
    resetProductFilters();
  }, [])

  // Show loading state while data is being fetched
  if (!data) {
    return (null);
  }


  return (
    <>

      {/* Header section */}
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Products</h1>
      </div>

      {/* Render different content based on whether there are products */}
      {data!.data.data.items.length <= 0 ? (

        // If there are no products, show a message prompting the user to add products
        <div
          className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm" x-chunk="dashboard-02-chunk-1"
        >
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              You have no products
            </h3>
            <p className="text-sm text-muted-foreground">
              You can start selling as soon as you add a product.
            </p>
            {isLoggedIn && isAdmin && <AddProductModel />}
          </div>
        </div>

      ) : (

        // If there are products, render the products section
        <div >

          {/* Main content area for products */}
          <div className=' min-h-screen w-full'>

            {/* Search and add product button section */}
            <div className='flex flex-row justify-between items-end mx-4'>
              {/* Search form */}
              <form className='w-full'
                onSubmit={
                  isLoading
                    ? () => { }
                    : handleSubmit((data) => {
                      // Update filters when the search form is submitted
                      updateFilters({ search: data.search, page: 1 });
                    })
                }
              >
                <div className="navbar-center flex items-center gap-1 m-auto max-w-[700px] mt-32">
                  <label className="input input-bordered flex items-center gap-2 w-full mr-0 pr-0">
                    {/* Input field for searching products */}
                    <input type="text" required={false} {...register('search', { required: false })} className="grow " placeholder='Search for products' />
                    {/* Search button */}
                    <button type='submit' className='cursor-pointer p-4' >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                    </button>
                  </label>
                </div>
              </form>

              {/* Add product button for admin users */}
              {isLoggedIn && isAdmin && <AddProductModel />}
            </div>

            {/* Products filters and list section */}
            <div className='flex gap-5 flex-row justify-between mt-4'>
              {/* Products filters (hidden on smaller screens) */}
              <div className='hidden lg:flex flex-col gap-3 items-start min-h-screen  bg-white ml-3 rounded-lg p-3 w-96 shadow-xl max-h-full text-card-foreground border-[1px]'>
                <ProductsFiltersComponent />
              </div>

              {/* Products list */}
              <div className='flex flex-col gap-2 min-h-screen w-full mr-3'>
                <ProductsComponent isAdminMode={true} />
              </div>
            </div>
            <ProductsPaginationComponent />
          </div>
        </div>
      )}
    </>
  );
}



export default ProductsDashboardPage;
