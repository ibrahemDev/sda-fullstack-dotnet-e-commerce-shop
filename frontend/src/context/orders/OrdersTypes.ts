import { OrderItem } from "../OrderItems/OrderItemsTypes";
import { User } from "../user/UserType";

export interface CreateOrderDto {
    userId: string;
    status: number;
}

interface OrderListData {
    items: Order[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
}


export interface GetAllOrdersApiResponse {
    success: boolean;
    message: string | null;
    data: OrderListData;
}
export interface Order {
    orderId: string;
    userId: string;
    addressId: string | null;
    paymentMethodId: string | null;
    transactionId: string | null;
    shipmentId: string | null;
    status: number;
    createdAt: string;
    user: User;
    address: any | null;
    paymentMethod: any | null;
    items: OrderItem[];
}
export enum OrderTypes {
    Pending = "Pending",
    Processing = "Processing",
    Shipped = "Shipped",
    Completed = "Completed",
    Cancelled = "Cancelled"
}

// public enum OrderStatus
// {
//     Pending,
//     Processing,
//     Shipped,
//     Completed,
//     Cancelled
// }










