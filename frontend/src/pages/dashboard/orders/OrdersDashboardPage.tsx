import React, { useEffect, useState } from "react";
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
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Order,
  GetAllOrdersApiResponse,
  CreateOrderDto,
  OrderTypes,
} from "@/context/orders/OrdersTypes";
import { OrderItem } from "@/context/OrderItems/OrderItemsTypes";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { FaEdit, FaTrash, FaChevronDown, FaChevronUp, FaCartArrowDown, FaRegUser } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
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
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import PaginationComponent from "@/components/PaginationComponent";
import { CiMenuKebab } from "react-icons/ci";

import { queryClient } from "@/main";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Define the number of orders to display per page
const PAGE_SIZE = 10;

// Define the schema for validating order data using Zod
const formSchema = z.object({
  userId: z.string().min(1),
  status: z.number(),
});

/**
 * This component displays the Orders Dashboard Page.
 * It allows users to view, edit, and delete orders.
 * The page also includes pagination and collapsible sections
 * for viewing order items and user details.
 */
export default function OrdersDashboardPage() {
  // State variables for managing pagination
  const [currentPage, setCurrentPage] = useState(1);

  // State variables for managing the edit dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Order | null>(null);

  // State variables for managing the delete dialog
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<Order | null>(null);

  // State for managing collapsible sections (order items and user details)
  const [expandedOrderItems, setExpandedOrderItems] = useState<{
    [orderId: string]: boolean;
  }>({});
  const [expandedUserDetails, setExpandedUserDetails] = useState<{
    [orderId: string]: boolean;
  }>({});

  // Fetch orders data using React Query
  const { isLoading, data: ordersData, refetch } = useQuery({
    queryKey: ["orders", currentPage], // Query key for caching
    queryFn: async () => {
      const response = await axios.get<GetAllOrdersApiResponse>(
        `/api/orders?page=${currentPage}&limit=${PAGE_SIZE}`
      );
      return response.data;
    },
  });

  // Calculate total pages for pagination
  const totalPages = ordersData?.data.totalPages || 1;
  // Extract orders from fetched data
  const orders = ordersData?.data.items || [];

  // Function to handle page changes in pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Mutation for updating an order
  const updateOrderMutation = useMutation({
    mutationFn: async ({
      updatedOrder,
      orderId,
    }: {
      updatedOrder: CreateOrderDto;
      orderId: string;
    }) => {
      await axios.put(`/api/orders/${orderId}`, updatedOrder);
    },
    // Invalidate the cache and perform actions after successful mutation
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders", currentPage] });
      setSelectedItem(null);
      setIsDialogOpen(false);
    },
  });

  // Mutation for deleting an order
  const deleteOrderMutation = useMutation({
    mutationFn: async (orderId: string) => {
      await axios.delete(`/api/orders/${orderId}`);
    },
    // Invalidate the cache after successful mutation
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders", currentPage] });
      setOrderToDelete(null);
    },
  });

  // React Hook Form configuration
  const form = useForm<Order>({
    resolver: zodResolver(formSchema), // Use Zod for validation
    defaultValues: {
      userId: "",
      status: 0,
    },
  });

  // Effect hook to handle form values when the dialog is open or closed
  useEffect(() => {
    if (isDialogOpen) {
      if (selectedItem) {
        form.setValue("userId", selectedItem!.userId);
        form.setValue("status", selectedItem!.status);
      }
    } else {
      setSelectedItem(null);
      form.reset();
    }
  }, [isDialogOpen]);

  // Extract the register function from React Hook Form
  const { register } = form;

  // Function to handle editing an order (opens the dialog)
  const handleEditItem = (order: Order): void => {
    setSelectedItem(order);
    setIsDialogOpen(true);
  };

  // Function to handle saving changes made to an order
  const handleEdit = async (updatedFields: Partial<Order>) => {
    if (selectedItem) {
      const updatedOrder = { ...selectedItem, ...updatedFields };

      await updateOrderMutation.mutateAsync({
        orderId: updatedOrder.orderId,
        updatedOrder: {
          status: updatedOrder.status,
          userId: updatedOrder.userId,
        },
      });
    }
  };

  // Function to handle deleting an order (opens the confirmation dialog)
  const handleDeleteItem = (order: Order) => {
    setOrderToDelete(order);
    setIsDeleteDialogOpen(true);
  };

  // Function to handle confirming the deletion of an order
  const handleConfirmDelete = async () => {
    if (orderToDelete) {
      await deleteOrderMutation.mutateAsync(orderToDelete.orderId);
      setIsDeleteDialogOpen(false);
    }
  };

  // Function to toggle the visibility of order items for a specific order
  const toggleOrderItems = (orderId: string) => {
    setExpandedOrderItems((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  // Function to toggle the visibility of user details for a specific order
  const toggleUserDetails = (orderId: string) => {
    setExpandedUserDetails((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  // Render the component
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Orders</h1>
      </div>
      <Card className="w-full ">
        <CardHeader>
          <CardTitle>Orders List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            {/* Display a loading message while fetching data */}
            {isLoading ? (
              <p>Loading orders...</p>
            ) : (
              <ScrollArea className="rounded-md border text-left">
                {/* Display the orders in a table */}
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>User ID</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created At</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <React.Fragment key={order.orderId}>
                        <TableRow key={order.orderId}>
                          <TableCell>{order.orderId}</TableCell>
                          <TableCell>{order.userId}</TableCell>
                          <TableCell>{Object.keys(OrderTypes)[order.status].toString()}</TableCell>
                          <TableCell>{order.createdAt}</TableCell>
                          {/* Buttons to toggle order items and user details */}
                          <TableCell>
                            <Button
                              variant={"outline"}
                              className=" "
                              size="sm"
                              onClick={() => toggleOrderItems(order.orderId)}
                            >
                              {/* Display chevron icons to indicate expand/collapse */}
                              {expandedOrderItems[order.orderId] ? (
                                <FaChevronUp />
                              ) : (
                                <FaChevronDown />
                              )}{" "}
                              <FaCartArrowDown />{" "}
                            </Button>
                            <Button
                              variant={"outline"}
                              className=" "
                              size="sm"
                              onClick={() => toggleUserDetails(order.orderId)}
                            >
                              {expandedUserDetails[order.orderId] ? (
                                <FaChevronUp />
                              ) : (
                                <FaChevronDown />
                              )}{" "}
                              <FaRegUser />{" "}
                            </Button>
                          </TableCell>
                          {/* Dropdown menu for edit and delete actions */}
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost">
                                  <CiMenuKebab />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>
                                  More Actions
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                  <DropdownMenuItem
                                    onClick={() => handleEditItem(order)}
                                  >
                                    <FaEdit className="text-lg mr-2 h-4 w-4 text-green-700" />
                                    <span>Edit</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => handleDeleteItem(order)}
                                  >
                                    <FaTrash className="text-lg mr-2 h-4 w-4 text-red-700" />
                                    <span>Delete</span>
                                  </DropdownMenuItem>
                                </DropdownMenuGroup>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                        {/* Collapsible Order Items Section */}
                        {expandedOrderItems[order.orderId] && (
                          <>
                            <CardHeader>
                              <CardTitle>Orders List</CardTitle>
                            </CardHeader>
                            <TableRow>
                              <TableCell colSpan={6}>
                                {expandedOrderItems[order.orderId] && (
                                  <div className="mt-2 border rounded-md p-2">
                                    {/* Display order items in a separate table */}
                                    <OrderItemTable items={order.items} />
                                  </div>
                                )}
                              </TableCell>
                            </TableRow>
                          </>
                        )}
                        {/* Collapsible User Details Section */}
                        {expandedUserDetails[order.orderId] && (
                          <>
                            <CardHeader>
                              <CardTitle>User Details</CardTitle>
                            </CardHeader>
                            <TableRow>
                              <TableCell colSpan={6}>
                                {expandedUserDetails[order.orderId] && (
                                  <div className="mt-2 border rounded-md p-2">
                                    {/* Display user details in a separate table */}
                                    <UserDetailsTable user={order.user} />
                                  </div>
                                )}
                              </TableCell>
                            </TableRow>
                          </>
                        )}
                      </React.Fragment>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            )}
          </div>
          {/* Pagination component */}
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            onUpdatePageNumber={handlePageChange}
          />
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Order</DialogTitle>
            <DialogDescription>
              Update order details below.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((data) => {
                handleEdit({
                  ...data,
                  userId: form.getValues().userId,
                });
              })}
              className="space-y-4"
            >
              {/* Input field for order status */}
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    {/* Dropdown for selecting order status */}
                    <Select
                      value={
                        Object.keys(OrderTypes)[field.value].toString()
                      }
                      onValueChange={(e) => {
                        form.setValue(
                          "status",
                          Object.keys(OrderTypes).indexOf(e)
                        );
                      }}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue
                          placeholder="Status"
                          {...register("status")}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(OrderTypes).map((orderTypes) => (
                          <SelectItem
                            key={orderTypes}
                            value={orderTypes}
                          >
                            {orderTypes}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Order</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this order?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

/**
 * This component displays a table of order items.
 * @param {OrderItem[]} items - An array of order items to display.
 * @returns A table of order items.
 */
const OrderItemTable = ({ items }: { items: OrderItem[] }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product ID</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Quantity</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.orderItemId}>
            <TableCell>{item.productId}</TableCell>
            <TableCell>{item.price}</TableCell>
            <TableCell>{item.quantity}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

/**
 * This component displays a table of user details.
 * @param {any} user - The user object to display details from.
 * @returns A table of user details.
 */
const UserDetailsTable = ({ user }: { user: any }) => {
  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell className="font-bold">User ID:</TableCell>
          <TableCell>{user.userId}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-bold">Email:</TableCell>
          <TableCell>{user.email}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

