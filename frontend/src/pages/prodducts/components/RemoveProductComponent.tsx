import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Product } from "@/context/product/ProductType";
import { useDeleteProductActions } from "@/context/product/actions/useDeleteProductActions";
import React, { PropsWithChildren, createContext } from "react";
import { MdDeleteForever } from "react-icons/md";

/**
 * Type definition for the RemoveProductContext.
 */
export type RemoveProductContextType = {
  /** State variable to control the visibility of the dialog. */
  isDialogOpen: boolean;
  /** State setter function to update the visibility of the dialog. */
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  /** State variable to store the currently selected product for removal. */
  selectedItem: Product | null;
  /** State setter function to update the currently selected product. */
  setSelectedItem: React.Dispatch<React.SetStateAction<Product | null>>;
  /** Function to handle the confirmation of the product removal. */
  handleConfirmRemove: () => Promise<void>;
  /** Function to handle the initiation of the product removal process. */
  handleRemoveItem: (product: Product) => void;
};

/**
 * Context object for managing the product removal functionality.
 */
const RemoveProductContext = createContext<RemoveProductContextType>(
  {} as unknown as RemoveProductContextType
);

/**
 * Context provider component for the RemoveProductContext.
 *
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The children components to be wrapped by the provider.
 * @returns {JSX.Element} - The rendered RemoveProductContextProvider component.
 */
export const RemoveProductContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  /**
   * Custom hook for managing product deletion actions.
   * This hook likely provides state variables and functions
   * related to deleting a product, such as:
   * - `deleteProductAsync`: A function to initiate the asynchronous product deletion.
   * - `isDeletingProduct`: A boolean indicating whether a product is currently being deleted.
   * - `isProductDeleted`: A boolean indicating whether a product has been successfully deleted.
   * - `deleteProductError`: An object containing any errors encountered during product deletion.
   */
  const {
    deleteProductAsync,
    isDeletingProduct,
    isProductDeleted,
    deleteProductError,
  } = useDeleteProductActions();

  /** State variable to control the visibility of the confirmation dialog. */
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  /** State variable to store the selected product item to be removed. */
  const [selectedItem, setSelectedItem] = React.useState<Product | null>(null);

  /**
   * Handles the confirmation of the product removal.
   * It calls the `deleteItemAsync` function with the selected item's ID,
   * and then closes the dialog and clears the selected item.
   *
   * @returns {Promise<void>} A promise that resolves when the item is deleted.
   */
  const handleConfirmRemove = async (): Promise<void> => {
    if (selectedItem) {
      await deleteProductAsync(selectedItem.productId);
      setSelectedItem(null);
    }
    setIsDialogOpen(false);
  };

  /**
   * Handles the removal of a product item.
   * It updates the selected item state and opens the confirmation dialog.
   *
   * @param {Product} product - The product item to be removed.
   */
  const handleRemoveItem = (product: Product): void => {
    setSelectedItem(product);
    setIsDialogOpen(true);
  };

  /** Provides the context values to its children components. */
  return (
    <RemoveProductContext.Provider
      value={{
        isDialogOpen,
        setIsDialogOpen,
        selectedItem,
        setSelectedItem,
        handleConfirmRemove,
        handleRemoveItem,
      }}
    >
      {children}
    </RemoveProductContext.Provider>
  );
};

/**
 * Custom hook to access the RemoveProductContext.
 * @returns {RemoveProductContextType} - The context object.
 */
export const useRemoveProductContext = (): RemoveProductContextType => {
  return React.useContext(RemoveProductContext);
};

/**
 * Button component to trigger the product removal process.
 *
 * @param {object} props - The component props.
 * @param {Product} props.product - The product to be removed.
 * @returns {JSX.Element} - The rendered RemoveProductButton component.
 */
export const RemoveProductButton: React.FC<{ product: Product }> = ({
  product,
}) => {
  const removeProvider = useRemoveProductContext();

  return (
    <Button
      variant={"outline"}
      className=" "
      size="sm"
      onClick={() => removeProvider.handleRemoveItem(product)}
    >
      <MdDeleteForever className="text-lg text-red-600" />
    </Button>
  );
};

/**
 * Modal component for confirming product removal.
 * This modal is displayed when the user clicks on the RemoveProductButton.
 *
 * @returns {JSX.Element} - The rendered RemoveProductModel component.
 */
export const RemoveProductModel: React.FC<{}> = ({ }) => {
  const removeProvider = useRemoveProductContext();

  return (
    <AlertDialog
      open={removeProvider.isDialogOpen}
      onOpenChange={removeProvider.setIsDialogOpen}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove Item?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to remove this Product{" "}
            {removeProvider.selectedItem?.name || ""}?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={removeProvider.handleConfirmRemove}>
            Remove
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
