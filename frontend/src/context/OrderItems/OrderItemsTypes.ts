import { Product } from "../product/ProductType";

// Define types for creating order items
export interface CreateOrderItemDto {
    orderId: string;
    productId: string;
    price: number;
    quantity: number;
}

export interface OrderItemResponse {
    orderItemId: string;
    orderId: string;
    productId: string;
    price: number;
    quantity: number;
    createdAt: string;
}


export interface OrderItem {
    orderItemId: string;
    orderId: string;
    productId: string;
    price: number;
    quantity: number;
    createdAt: string;
    product: Product;
}