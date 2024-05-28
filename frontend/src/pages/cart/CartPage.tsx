import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Component imports for UI elements
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

// Context and action imports
import { Cart } from '@/context/cart/CartType';
import { CartItem } from '@/context/cartItem/CartItemTypes';
import { useAuthenticationActions } from '@/context/auth/actions/useAuthenticationActions';
import { useDeleteCartItemActions } from '@/context/cartItem/actions/useDeleteCartItemActions';
import { useUpdateCartItemActions } from '@/context/cartItem/actions/useUpdateCartItemActions';
import { createOrderItem } from '@/context/OrderItems/OrderItemsApi';
import { createNewOrder } from '@/context/orders/OrdersApi';
import { useDeleteCartActions } from '@/context/cart/actions/useDeleteCartActions';
import { useCreateCartActions } from '@/context/cart/actions/useCreateCartActions';







/**
 * Component representing the user's shopping cart.
 *
 * @returns {React.ReactElement} The rendered CartPage component.
 */
const CartPage: React.FC<{}> = () => {
  const [isCreateingOrder, setCreatingOrder] = useState(false);
  const navigate = useNavigate(); // For navigation within the application

  // Get authentication status and user information
  const {
    user,
    isLoggedIn,
    updateSelfUserAction,
    token
  } = useAuthenticationActions();

  // Actions for cart item management
  const { deleteCartItemAsync, isDeletingCartItem, deleteCartItemError } = useDeleteCartItemActions();
  const { updateCartItemAsync, isUpdatingCartItem, updateCartItemError } = useUpdateCartItemActions();


  const {
    deleteCartAsync,
    isDeletingCart,
    isCartDeleted,
    deleteCartError,
  } = useDeleteCartActions()
  const {
    createCartAsync,
    isCreatingCart,
    isCartCreated,
    createCartError,
  } = useCreateCartActions();

  // State to control the delete confirmation dialog
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedCartItem, setSelectedCartItem] = React.useState<CartItem | null>(null);

  /**
   * Handles changes to the quantity of an item in the cart.
   *
   * @param {CartItem} cartItem - The cart item being modified.
   * @param {number} newQuantity - The updated quantity of the item.
   */
  const handleQuantityChange = (cartItem: CartItem, newQuantity: number): void => {
    updateCartItemAsync({ ...cartItem, quantity: newQuantity });
  };

  /**
   * Handles the removal of an item from the cart.
   *
   * @param {CartItem} cartItem - The cart item to be removed.
   */
  const handleRemoveItem = async (cartItem: CartItem): Promise<void> => {
    setSelectedCartItem(cartItem);
    setIsDialogOpen(true);
  };

  /**
   * Handles the confirmation of item removal from the cart.
   */
  const handleConfirmRemove = async (): Promise<void> => {
    setIsDialogOpen(false);

    if (selectedCartItem?.cartItemId) {
      await deleteCartItemAsync(selectedCartItem.cartItemId);
      setSelectedCartItem(null);
    }
  };


  // Redirect to login if the user is not logged in
  if (!user) {
    navigate('/');
    return null;
  }

  // Force-unwrap the cart since we are certain the user is logged in at this point
  const cart: Cart = user.cart!;

  /**
   * Calculates the total price of all items in the cart.
   *
   * @returns {number} The total price of all items in the cart.
   */
  const calculateTotalPrice = (): number => {
    return cart.items.reduce(
      (total, item) => total + item.product!.price * item.quantity,
      0
    );
  };

  return (
    <div className="container mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {/* Display cart items or an empty cart message */}
      {!cart || cart.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Cart Items</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Map through cart items and render each item */}
              {cart.items.map((item) => (
                <div key={item.cartItemId} className="flex items-center mb-4">
                  {/* Product Image */}
                  <img
                    src={`https://via.placeholder.com/150?text=${item.product?.name}`}
                    alt={item.product?.name}
                    className="w-20 h-20 object-cover rounded-md mr-4"
                  />

                  {/* Product Details */}
                  <div className="flex-1">
                    <h3 className="text-lg font-medium">
                      {item.product?.name}
                    </h3>
                    <p className="text-gray-600">
                      Price: ${item.product?.price}
                    </p>
                  </div>

                  {/* Quantity Controls and Remove Button */}
                  <div className="flex items-center ml-4">
                    <Label htmlFor={`quantity-${item.cartItemId}`}>
                      Qty:
                    </Label>
                    <Input
                      id={`quantity-${item.cartItemId}`}
                      type="number"
                      min={1}
                      max={item.product?.stock || 10}
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(
                          item,
                          parseInt(e.target.value, 10)
                        )
                      }
                      className="w-20 ml-2"
                    />
                    <Button
                      variant="ghost"
                      className="ml-4"
                      onClick={() => handleRemoveItem(item)}
                      disabled={isDeletingCartItem}
                    >
                      {isDeletingCartItem && selectedCartItem?.cartItemId === item.cartItemId ? 'Removing...' : 'Remove'}
                    </Button>
                    {deleteCartItemError && selectedCartItem?.cartItemId === item.cartItemId && (
                      <p className="text-red-500 text-sm mt-1">Error deleting item</p>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Separator />

          {/* Total Price and Checkout Button */}
          <div className="flex justify-end mt-6">
            <div className="text-right">
              <p className="text-lg font-medium">
                Total: ${calculateTotalPrice().toFixed(2)}
              </p>
              <Button className="mt-4" disabled={isUpdatingCartItem || isCreateingOrder} onClick={async () => {
                if (!isLoggedIn) {
                  return false;

                }
                setCreatingOrder(true);



                const createOrderResponse = await createNewOrder({
                  userId: user.userId,
                  status: 0
                }, token?.token || "")
                if (createOrderResponse == null) {
                  setCreatingOrder(false);
                  return;
                }


                for (let i = 0; i < cart.items.length; i++) {
                  let cartItem = cart.items[i]


                  const createOrderItemResponse = await createOrderItem({

                    orderId: createOrderResponse.orderId,
                    productId: cartItem.productId,
                    price: cartItem.product!.price,
                    quantity: cartItem.quantity

                  }, token?.token || "")



                }

                await deleteCartAsync(cart.cartId);

                await createCartAsync(user.userId);







                setCreatingOrder(false);
              }}  >
                {isUpdatingCartItem ? 'Updating...' : isCreateingOrder ? 'Createing Order' : 'Proceed to Checkout'}
              </Button>
              {updateCartItemError && (
                <p className="text-red-500 text-sm mt-1">Error updating cart</p>
              )}
            </div>
          </div>

          {/* Delete Confirmation Dialog */}
          <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Remove Item?</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to remove this item from your
                  cart?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleConfirmRemove}>
                  Remove
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
    </div>
  );
};

export default CartPage;
