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
import { Pagination } from "@/components/ui/pagination";
import { useState, useEffect, useMemo } from "react";

import { User, UserModel, UserModel2 } from "@/context/user/UserType";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import PaginationComponent from "@/components/PaginationComponent";
import { queryClient } from "@/main";
import React from "react";
import { FaEdit } from "react-icons/fa";
import { z } from "zod";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import api from "@/api";
const PAGE_SIZE = 150; // Number of users to display per page


const formSchema = z.object({
  email: z.string().email(),
  phoneNumber: z.string(),
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  dateOfBirth: z.string().pipe(z.coerce.date()), // Assuming you want this as a Date object
  role: z.number(),
  createdAt: z.string().nullable().optional()
  //.pipe(z.coerce.date()), // Assuming you want this as a Date object
});


export default function CustomersDashboardPage() {

  /**
   * Define state variables for current page and search term.
   */
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  /**
   * Fetch users data using React Query's useQuery hook.
   * The query key includes searchTerm and currentPage to refetch data on changes.
   */
  const { isLoading, data: usersData } = useQuery({
    queryKey: ['users', searchTerm, currentPage],
    queryFn: async () => {
      const response = await api.get<UserModel2<User[]>>(`/users?page=${currentPage}&limit=${PAGE_SIZE}&search=${searchTerm}`);
      return response.data;
    },
  });
  const totalPages = usersData?.data.totalPages || 1
  const users = usersData?.data.items || [];

  /**
   * Define a mutation for deleting a user using React Query's useMutation hook.
   * On successful deletion, it invalidates the 'users' cache to trigger a refetch.
   */
  const deleteUserMutation = useMutation({
    mutationFn: async (userId: string) => {
      await api.delete(`/users/${userId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users', searchTerm, currentPage] });
    },
  });

  // Update User Mutation 
  const updateUserMutation = useMutation({
    mutationFn: async (updatedUser: User) => {
      await api.put(`/users/${updatedUser.userId}`, updatedUser);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users', searchTerm, currentPage] });
    },
  });

  /**
   * State variables to manage the dialog for editing user details.
   */
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<User | null>(null);

  /**
   * Function to handle the edit popup and update user details.
   */
  const handleEditPopup = async (newUser: User): Promise<void> => {
    if (selectedItem) {
      await updateUserMutation.mutateAsync(newUser)
      setSelectedItem(null);
    }
    setIsDialogOpen(false);
  };

  /**
   * Function to open the edit dialog and populate it with the selected user's data.
   */
  const handleEditItem = (user: User): void => {
    setSelectedItem(user);
    setIsDialogOpen(true);
  };

  /**
   * Function to handle page changes in the pagination component.
   */
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  /**
   * Function to handle user deletion confirmation and trigger the delete mutation.
   */
  const handleDeleteUser = (userId: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUserMutation.mutate(userId);
    }
  };







  /**
   * Initialize a form using React Hook Form and define its schema using Zod.
   */
  const form = useForm<User>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      phoneNumber: "",
      firstName: "",
      lastName: "",
      dateOfBirth: new Date().toISOString().split('T')[0],
      role: 2,
      createdAt: new Date().toString()
    },
  });

  const { register } = form;

  /**
   * UseEffect hook to populate the form with selected user's data when the dialog is open.
   */
  useEffect(() => {
    if (selectedItem) {
      form.setValue("email", selectedItem!.email)
      form.setValue("phoneNumber", selectedItem!.phoneNumber)
      form.setValue("firstName", selectedItem!.firstName)
      form.setValue("lastName", selectedItem!.lastName || "")
      form.setValue("dateOfBirth", selectedItem!.dateOfBirth)
      form.setValue("role", selectedItem!.role || 0)
      form.setValue("createdAt", selectedItem!.createdAt)
    } else {
      setIsDialogOpen(false);
      form.reset();
    }
  }, [selectedItem, form])

  return (
    <>
      {/* Page title */}
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Customers </h1>
      </div>

      {/* Card component for displaying the user list */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Users List</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Input field for searching users */}
          <Input
            type="text"
            placeholder="Search users..."
            className="mb-4"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1)
            }}
          />

          {/* Display loading indicator or user list based on loading state */}
          <div className="">
            {isLoading ? (
              <div>Loading users...</div>
            ) : (
              <div className="overflow-x-auto">
                {/* ScrollArea component to enable scrolling for the user list table */}
                <ScrollArea className="rounded-md border">
                  <Table>
                    <TableHeader>
                      {/* Table header row */}
                      <TableRow>
                        <TableHead>User ID</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone Number</TableHead>
                        <TableHead>First Name</TableHead>
                        <TableHead>Last Name</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {/* Map through the users array and render a table row for each user */}
                      {users.map((user) => (
                        <TableRow key={user.userId}>
                          <TableCell>{user.userId}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.phoneNumber}</TableCell>
                          <TableCell>{user.firstName}</TableCell>
                          <TableCell>{user.lastName}</TableCell>
                          <TableCell>
                            {/* Edit button to open the edit dialog */}
                            <Button variant={"outline"} className=" " size="sm" onClick={() => handleEditItem(user)} >
                              <FaEdit className="text-lg text-green-700" />
                            </Button>
                          </TableCell>
                          <TableCell>
                            {/* Delete button to remove a user */}
                            <Button
                              className=" text-red-700"
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteUser(user.userId)}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </div>
            )}
          </div>

          {/* Pagination component to navigate between pages */}
          <PaginationComponent currentPage={currentPage} totalPages={totalPages} onUpdatePageNumber={handlePageChange} />

        </CardContent>
      </Card>





      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>

        <DialogContent className="sm:max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto">

          <DialogHeader>
            <DialogTitle>Edit Customer</DialogTitle>
            <DialogDescription>
              update Customer Details
            </DialogDescription>
          </DialogHeader>

          <Form {...form} >
            <form onSubmit={form.handleSubmit(() => {

              handleEditPopup({ ...form.getValues(), userId: selectedItem?.userId } as User)
              //editProvider.setIsDialogOpen(false);
            })} className="space-y-8">
              <ScrollArea className="h-[calc(100vh-200px)] rounded-md border ">
                <div className="m-5">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="User Email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />



                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>phoneNumber</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="User phoneNumber"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />




                  <FormField
                    control={form.control}
                    name="firstName"
                    defaultValue={""}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>firstName</FormLabel>
                        <FormControl >
                          <Input

                            placeholder="User firstName"

                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    defaultValue={""}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>lastName</FormLabel>
                        <FormControl >
                          <Input

                            placeholder="User lastName"

                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>dateOfBirth</FormLabel>
                        <FormControl>
                          {

                            (<Input
                              type="date"

                              placeholder="User dateOfBirth"
                              {...field}

                              value={

                                new Date(field.value).toISOString().split('T')[0]

                              }




                            />)
                          }
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <FormControl>
                          <Input
                            type="number"

                            placeholder="User role"

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

    </>
  );
}

