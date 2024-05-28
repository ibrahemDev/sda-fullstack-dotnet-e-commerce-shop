import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CreateProductDto, Product } from "@/context/product/ProductType";
import React, { PropsWithChildren, createContext } from "react";
import { FaEdit } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useEffect } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area";
import { useUpdateProductActions } from "@/context/product/actions/useUpdateProductActions";

// Define the type for the EditProductContext.
export type EditProductContextType = {
  // Flag to control the visibility of the edit dialog.
  isDialogOpen: boolean;
  // Function to set the visibility of the edit dialog.
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  // The currently selected product for editing.
  selectedItem: Product | null;
  // Function to set the currently selected product.
  setSelectedItem: React.Dispatch<React.SetStateAction<Product | null>>;
  // Function to handle the submission of the edit product form.
  handleEditPopup: (newProduct: Product) => Promise<void>;
  // Function to handle the opening of the edit dialog and setting the selected item.
  handleEditItem: (product: Product) => void;
}

// Create the EditProductContext.
const EditProductContext = createContext<EditProductContextType>({} as unknown as EditProductContextType)

/**
 * Provider component for the EditProductContext.
 * 
 * @param children - The children components to be wrapped by this provider.
 * @returns A React element that provides the EditProductContext.
 */
export const EditProductContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  // Access the updateProductAsync function and related states from the useUpdateProductActions hook.
  const {
    updateProductAsync,
    isUpdatingProduct,
    isProductUpdated,
    updateProductError,
  } = useUpdateProductActions();

  // Initialize the product state using the useReducer hook.
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<Product | null>(null);

  /**
   * Handles the submission of the edit product form.
   * 
   * @param newProduct - The updated product data.
   */
  const handleEditPopup = async (newProduct: Product): Promise<void> => {
    // If there is a selected item, update the product.
    if (selectedItem) {
      await updateProductAsync(newProduct)
      // Reset the selected item and close the dialog.
      setSelectedItem(null);
    }
    setIsDialogOpen(false);
  };

  /**
   * Handles the opening of the edit dialog and setting the selected item.
   * 
   * @param product - The product to be edited.
   */
  const handleEditItem = (product: Product): void => {
    // Set the selected item and open the dialog.
    setSelectedItem(product);
    setIsDialogOpen(true);
  };

  // Provide the context values to the children components.
  return (
    <EditProductContext.Provider value={{
      isDialogOpen, setIsDialogOpen,
      selectedItem, setSelectedItem,
      handleEditPopup,
      handleEditItem
    }}>
      {children}
    </EditProductContext.Provider>
  );
};


/**
 * Hook to access the EditProductContext.
 * 
 * @returns The EditProductContextType.
 */
export const useEditProductContext = (): EditProductContextType => {
  return React.useContext(EditProductContext);
};


/**
 * Button component to trigger the edit product functionality.
 * 
 * @param product - The product to be edited.
 * @returns A React element representing the edit button.
 */
export const EditProductButton: React.FC<{ product: Product }> = ({ product }) => {
  // Access the editProvider from the EditProductContext.
  const editProvider = useEditProductContext();

  // Render the edit button.
  return (
    <Button variant={"outline"} className=" " size="sm" onClick={() => editProvider.handleEditItem(product)} >
      <FaEdit className="text-lg text-red-600" />
    </Button>
  )
}



// Define the validation schema for the edit product form using Zod.
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),

  price: z.number().min(1, {
    message: "Stock must be greater than or equal to 0",
  }),
  stock: z.number().min(0, {
    message: "Stock must be greater than or equal to 0",
  }),
  description: z.string().min(10),

});



/**
 * Modal component for editing a product.
 * 
 * @returns A React element representing the edit product modal.
 */
export const EditProductModel: React.FC<{}> = ({ }) => {
  // Access the editProvider from the EditProductContext.
  const editProvider = useEditProductContext();

  // Create a form instance using the useForm hook from React Hook Form.
  const form = useForm<CreateProductDto>({
    resolver: zodResolver(formSchema), // Use Zod resolver for form validation.
    defaultValues: {
      name: "",
      price: 0,
      stock: 0,
      description: "",
      //categoryList: []
    },
  });

  // Get the register function from the form instance.
  const { register } = form;

  // Use the useEffect hook to update the form values when the selected item changes.
  useEffect(() => {
    // If there is a selected item, update the form values.
    if (editProvider.selectedItem) {
      form.setValue("name", editProvider.selectedItem!.name)
      form.setValue("price", editProvider.selectedItem!.price)
      form.setValue("stock", editProvider.selectedItem!.stock)
      form.setValue("description", editProvider.selectedItem!.description || "")
    } else {
      // Otherwise, close the dialog and reset the form.
      editProvider.setIsDialogOpen(false);
      form.reset();
    }
  }, [editProvider.selectedItem, form])


  // Render the edit product modal.
  return (

    <Dialog open={editProvider.isDialogOpen} onOpenChange={editProvider.setIsDialogOpen}>

      <DialogContent className="sm:max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto">

        {/* Dialog Header */}
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>
            update Product Details
          </DialogDescription>
        </DialogHeader>

        {/* Form */}
        <Form {...form} >
          <form onSubmit={form.handleSubmit(() => {
            // Handle form submission, update the product, and close the dialog.
            editProvider.handleEditPopup({ ...form.getValues(), productId: editProvider.selectedItem!.productId, categoryList: [] } as Product)
          })} className="space-y-8">

            {/* Scrollable Area */}
            <ScrollArea className="h-[calc(100vh-200px)] rounded-md border ">
              <div className="m-5">

                {/* Name Input */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Product Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Price Input */}
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Product Price"
                          type="number"
                          {...register('price', { valueAsNumber: true })}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Stock Input */}
                <FormField
                  control={form.control}
                  name="stock"
                  defaultValue={0}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stock</FormLabel>
                      <FormControl >
                        <Input
                          placeholder="Product Stock"
                          type="number"
                          {...register('stock', { valueAsNumber: true })}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Description Textarea */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Product Description"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              </div>
            </ScrollArea>

            {/* Dialog Footer */}
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>

          </form>
        </Form>

      </DialogContent>

    </Dialog>

  )

}

