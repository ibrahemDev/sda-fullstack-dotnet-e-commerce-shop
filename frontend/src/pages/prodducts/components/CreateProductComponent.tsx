import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { CreateProductDto } from "@/context/product/ProductType";
import { useCreateProductActions } from "@/context/product/actions/useCreateProductActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Define the validation schema for the product form
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
 * This component renders a dialog box for creating a new product.
 * It uses react-hook-form for form handling and zod for validation.
 * The component fetches the list of categories from the server and allows the user to select multiple categories for the product.
 */
export const AddProductModel: React.FC<{}> = ({ }) => {
  // State variable to control the visibility of the dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Access the createProductAsync action from the context
  const { createProductAsync } = useCreateProductActions();

  // Initialize the form with react-hook-form, using zodResolver for validation and setting default values
  const form = useForm<CreateProductDto>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 0,
      stock: 0,
      description: "",
    },
  });

  const { register } = form;

  // useEffect hook to reset the form when the dialog is closed
  useEffect(() => {
    if (!isDialogOpen) {
      form.reset();
    }
  }, [isDialogOpen]);

  // Render the dialog box
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      {/* Trigger for opening the dialog */}
      <DialogTrigger asChild>
        <Button variant="outline">Add Product</Button>
      </DialogTrigger>

      {/* Dialog content */}
      <DialogContent className="sm:max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto">
        <DialogHeader>
          <DialogTitle>Create Product</DialogTitle>
          <DialogDescription>Create Product Details</DialogDescription>
        </DialogHeader>

        {/* Form for creating the product */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(async () => {
              // Submit the form data to the server
              await createProductAsync({
                ...form.getValues(),
                categoryList: [],
              } as CreateProductDto);
              // Close the dialog after successful submission
              setIsDialogOpen(false);
            })}
            className="space-y-8"
          >
            {/* Scrollable area for the form fields */}
            <ScrollArea className="h-[calc(100vh-200px)] rounded-md border ">
              <div className="m-5">
                {/* Form field for the product name */}
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

                {/* Form field for the product price */}
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
                          {...register("price", { valueAsNumber: true })}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Form field for the product stock */}
                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stock</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Product Stock"
                          type="number"
                          {...register("stock", { valueAsNumber: true })}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Form field for the product description */}
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

            {/* Dialog footer with submit button */}
            <DialogFooter>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

