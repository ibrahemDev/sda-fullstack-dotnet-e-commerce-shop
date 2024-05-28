import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState, useEffect } from "react";

import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import PaginationComponent from "@/components/PaginationComponent";
import { queryClient } from "@/main";
import React from "react";
import { FaEdit, FaPlus } from "react-icons/fa";
import {
  Category,
  CreateOrUpdateCategoryDto,
  GetAllCategoriesResponse,
} from "@/context/categories/CategoriesTypes";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import api from "@/api";
const PAGE_SIZE = 150; // Number of users to display per page

// Define the Zod schema for validating the category form
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Category name must be at least 2 characters.",
  }),
  description: z.string(),
});

export default function CategoriesDashboardPage() {
  // State for current page in pagination
  const [currentPage, setCurrentPage] = useState(1);

  //Create Section
  // State to control the create category dialog
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Create a mutation for creating a new category
  const createCategoryMutation = useMutation({
    mutationFn: async (newCategory: CreateOrUpdateCategoryDto) => {
      await api.post("/categories", newCategory);
    },
    onSuccess: () => {
      // Invalidate the cache for the "categories" query after successful creation
      queryClient.invalidateQueries({
        queryKey: ["categories", currentPage],
      });
    },
  });

  // Function to open the create category dialog
  const handleCreateDialogOpen = () => {
    setIsCreateDialogOpen(true);
  };

  // Function to close the create category dialog
  const handleCreateDialogClose = () => {
    setIsCreateDialogOpen(false);
    form.reset(); // Reset the form when closing the dialog
  };

  // Handle Category Creation
  const handleCreateCategory = async (
    newCategory: CreateOrUpdateCategoryDto
  ): Promise<void> => {
    await createCategoryMutation.mutateAsync(newCategory);
    handleCreateDialogClose();
  };

  // Fetch categories data using React Query
  const { isLoading, data: categoriesData } = useQuery({
    queryKey: ["categories", currentPage],
    queryFn: async () => {
      const response = await api.get<GetAllCategoriesResponse>(
        `/categories?page=${currentPage}&limit=${PAGE_SIZE}`
      );
      return response.data;
    },
  });

  // Extract total pages and categories from the fetched data
  const totalPages = categoriesData?.data.totalPages || 1;
  const categories = categoriesData?.data.items || [];

  // Create a mutation for deleting a category
  const deleteCategoryMutation = useMutation({
    mutationFn: async (categoryId: string) => {
      await api.delete(`/categories/${categoryId}`);
    },
    onSuccess: () => {
      // Invalidate the cache for the "categories" query after successful deletion
      queryClient.invalidateQueries({
        queryKey: ["categories", currentPage],
      });
    },
  });

  // Update User Mutation (Assuming you have an API endpoint for updating)
  const updateCategoryMutation = useMutation({
    mutationFn: async ({ updatedCategory, categoryId }: { updatedCategory: CreateOrUpdateCategoryDto, categoryId: string }) => {
      await api.put(
        `/categories/${categoryId}`,
        updatedCategory
      );
    },
    onSuccess: () => {
      // Invalidate the cache for the "categories" query after successful update
      queryClient.invalidateQueries({
        queryKey: ["categories", currentPage],
      });
    },
  });

  // State to control the edit dialog
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  // State to hold the selected category for editing
  const [selectedItem, setSelectedItem] = React.useState<Category | null>(
    null
  );

  // Handle category update
  const handleEditPopup = async (
    newCategory: CreateOrUpdateCategoryDto
  ): Promise<void> => {
    if (selectedItem) {
      await updateCategoryMutation.mutateAsync({
        updatedCategory: newCategory,
        categoryId: selectedItem!.categoryId,

      });
      setSelectedItem(null);
    }
    setIsDialogOpen(false);
  };

  // Function to open the edit dialog and populate it with the selected category
  const handleEditItem = (category: Category): void => {
    setSelectedItem(category);
    setIsDialogOpen(true);
  };

  // Function to handle page changes in pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Function to handle category deletion
  const handleDeleteCategory = (categoryId: string) => {
    if (window.confirm("Are you sure you want to delete this Category?")) {
      deleteCategoryMutation.mutate(categoryId);
    }
  };

  // Initialize the form with Zod validation and default values
  const form = useForm<CreateOrUpdateCategoryDto>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const { register } = form;
  // When the selected item changes, update the form values
  useEffect(() => {
    if (selectedItem) {
      form.setValue("name", selectedItem!.name);
      form.setValue("description", selectedItem!.description);
      // form.setValue("categoryList", selectedItem!.categoryList!)
    } else {
      setIsDialogOpen(false);

      form.reset();
    }
  }, [selectedItem, form]);

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Categories</h1>
      </div>

      {/** other sections */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle></CardTitle>
        </CardHeader>
        <CardContent >

          <div className="">
            {/* Display loading state while fetching categories */}
            {isLoading ? (
              <div>Loading Categories...</div>
            ) : (
              <div className="overflow-x-auto">
                <ScrollArea className="rounded-md border">
                  {/* Render the categories table */}
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Category ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {categories.map((category) => (
                        <TableRow key={category.categoryId}>
                          <TableCell>{category.categoryId}</TableCell>
                          <TableCell>{category.name}</TableCell>
                          <TableCell>{category.description}</TableCell>

                          <TableCell>
                            <Button
                              variant={"outline"}
                              className=" "
                              size="sm"
                              onClick={() => handleEditItem(category)}
                            >
                              {/* Edit button */}
                              <FaEdit className="text-lg text-green-700" />
                            </Button>
                            {/* Add Edit button here */}
                          </TableCell>
                          <TableCell>
                            <Button
                              className=" text-red-700"
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                handleDeleteCategory(category.categoryId)
                              }
                            >
                              {/* Delete button */}
                              Delete
                            </Button>
                            {/* Add Edit button here */}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </div>
            )}
          </div>

          {/* create section */}
          <Card className="w-full mt-4    ">
            <CardHeader>

              {/* Add Create Category Button */}
              <Button variant={"outline"} onClick={handleCreateDialogOpen}>
                <FaPlus className="mr-2" />
                Create Category
              </Button>
            </CardHeader>

          </Card>

          {/* Pagination component */}
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages /*Math.ceil(filteredUsers.length / PAGE_SIZE)*/}
            onUpdatePageNumber={handlePageChange}
          />
        </CardContent>
      </Card>

      {/* Edit Category Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto">
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>update Category Details</DialogDescription>
          </DialogHeader>

          {/* Form for editing a category */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(() => {
                handleEditPopup({
                  ...form.getValues(),
                  categoryId: selectedItem?.categoryId,
                } as CreateOrUpdateCategoryDto);
                //editProvider.setIsDialogOpen(false);
              })}
              className="space-y-8"
            >
              <ScrollArea className="h-[calc(100vh-200px)] rounded-md border ">
                <div className="m-5">
                  {/* Input field for category name */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Category Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Textarea field for category description */}
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Category Description"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </ScrollArea>

              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Create Category Dialog */}
      <Dialog
        open={isCreateDialogOpen}
        onOpenChange={handleCreateDialogClose} // Close on backdrop click
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Create Category</DialogTitle>
            <DialogDescription>
              Add a new category
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((data) =>
                handleCreateCategory(data)
              )}
              className="space-y-8"
            >
              <ScrollArea className="h-[calc(100vh-200px)] rounded-md border ">
                <div className="m-5">
                  <div className="m-5">
                    {/* Input field for category name */}
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Category Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Textarea field for category description */}
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Category Description"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </ScrollArea>

              <DialogFooter>
                <Button type="submit">Create</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}

