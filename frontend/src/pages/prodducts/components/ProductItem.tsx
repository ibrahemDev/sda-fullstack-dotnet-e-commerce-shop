import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"
import { useAuthenticationActions } from "@/context/auth/actions/useAuthenticationActions";

import { useCreateCartItemActions } from "@/context/cartItem/actions/useCreateCartItemActions";
import { Product } from "@/context/product/ProductType"
import { generateKey } from "@/lib/utils";

import { FaCartPlus, FaMinus, FaPlus } from "react-icons/fa";
import { BsFillCartDashFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useDeleteCartItemActions } from "@/context/cartItem/actions/useDeleteCartItemActions";
import { useNavigate } from 'react-router-dom';

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RemoveProductButton } from "./RemoveProductComponent";
import { EditProductButton } from "./EditProductComponent";





/**
 * CartButton component for handling adding and removing items from the cart.
 *
 * @param {Product} product - The product object.
 * @returns {JSX.Element} - The rendered CartButton component.
 */
export const CartButton: React.FC<{ product: Product }> = ({ product }) => {
  const { createCartItemAsync, isCreatingCartItem, isCartItemCreated, createCartItemError } = useCreateCartItemActions();
  const { token, isLoggedIn, isAdmin, userId, logout, user } = useAuthenticationActions();
  const { deleteCartItemAsync, isDeletingCartItem, isCartItemDeleted, deleteCartItemError } = useDeleteCartItemActions();

  //const [isInCart, setIsInCart] = useState(false);
  let t_isInCart = user?.cart?.items.findIndex((cartItem) => cartItem.productId === product.productId);

  /*useEffect(() => {
      let _isInCart = user?.cart?.items.findIndex((cartItem) => cartItem.productId === product.productId) !== -1;
      setIsInCart(_isInCart);
  }, [user]);*/

  const [quantity, setQuantity] = useState(1);
  //const [isOpen, setIsOpen] = useState(false); not used 

  /**
   * Handles changes to the quantity of the product in the cart.
   *
   * @param {number} newQuantity - The new quantity of the product.
   */
  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  /**
   * Creates a new cart item for the given product.
   */
  const createCartItem = async () => {
    //setIsOpen(false); not used 
    await createCartItemAsync({
      cartId: user?.cart?.cartId!,
      productId: product.productId,
      quantity: quantity
    });
  };

  /**
   * Deletes the cart item for the given product.
   */
  const deleteCartItem = async () => {
    await deleteCartItemAsync(user?.cart?.items[t_isInCart!].cartItemId!);
  };


  return (
    <>
      {t_isInCart != -1 ? (
        <Button variant={"outline"} className=" " size="sm" onClick={deleteCartItem} >
          <BsFillCartDashFill className="text-lg" />
        </Button>
      ) : (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant={"outline"} className=" " size="sm">
              <FaCartPlus className="text-lg" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Add To Cart</h4>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <FaMinus className="lg:h-4 lg:w-4 md:h-4 md:w-4 h-2 w-2" />
                  </Button>
                  <span className="lg:text-lg md:text-md text-xs">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  >
                    <FaPlus className="lg:h-4 lg:w-4 md:h-4 md:w-4 h-2 w-2" />
                  </Button>
                </div>
                <span className="lg:text-lg md:text-md text-xs font-semibold">
                  ${(product.price * quantity).toFixed(2)}
                </span>
              </div>

              <div className="px-4 py-3">
                <Button variant="default" className="w-full lg:text-lg md:text-md text-xs" onClick={createCartItem}>
                  Add to Cart
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </>
  );
};






/**
 * ProductItemComponent for displaying individual product information.
 *
 * @param {Product} product - The product object.
 * @returns {JSX.Element} - The rendered ProductItemComponent component.
 */
const ProductItemComponent: React.FC<{ product: Product, isAdminMode?: boolean }> = ({ product, isAdminMode: _isAdminMode }) => {
  const isAdminMode = _isAdminMode || false;
  const navigate = useNavigate();
  const { token, isLoggedIn, isAdmin, userId, logout, user } = useAuthenticationActions();
  const [imageLoaded, setImageLoaded] = useState(true);

  const handleImageError = () => {
    setImageLoaded(false);
  };
  return (
    <div className="flex lg:flex-row xl:flex-row md:flex-row flex-col items-center   gap-6 p-4 border rounded-lg shadow-sm dark:border-gray-800">
      <img
        src={
          imageLoaded ?
            (product.image || `https://placehold.co/600x600/EEE/31343C?font=lora&text=${product.name}`)
            : `https://via.placeholder.com/600x600?text=Image+Not+Available`
        }
        alt={product.name}
        onError={handleImageError}
        className="w-48 h-48 rounded-lg object-cover"
        loading="lazy"
      />
      <div className=" flex flex-col items-start w-full gap-2 justify-start">

        <div className="flex justify-between w-full">
          <Button className="text-lg font-semibold max-sm:text-sm" variant={"link"} onClick={() => navigate(`/products/${product.productId}`, { state: { product } })}>
            {product.name}
          </Button>
          <span className="text-2xl font-bold max-sm:text-sm" >${product.price}</span>
        </div>

        <p className="text-gray-500 dark:text-gray-400">
          {product.description || 'No description available'}
        </p>

        <div className="flex items-center justify-between gap-2 w-full">
          <div className="flex gap-2">
            <span className="text-2xl max-sm:text-sm  font-bold">
              {product.categoryList?.map((category, index) => {
                return <Badge key={generateKey(index)}>{category.name}</Badge>
              })}
            </span>
          </div>
          <div className="flex gap-3">
            {isLoggedIn && !isAdminMode && <CartButton product={product} />}
            {isLoggedIn && isAdminMode && isAdmin && <RemoveProductButton product={product} />}
            {isLoggedIn && isAdminMode && isAdmin && <EditProductButton product={product} />}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductItemComponent
