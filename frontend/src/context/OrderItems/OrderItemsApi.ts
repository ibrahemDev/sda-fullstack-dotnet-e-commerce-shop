import { AxiosResponse } from "axios";
import { CreateOrderItemDto, OrderItemResponse } from "./OrderItemsTypes";
import api from "@/api";

export const createOrderItem = async (
    orderItem: CreateOrderItemDto, token: string
): Promise<OrderItemResponse | null> => {
    try {
        const response: AxiosResponse<OrderItemResponse> = await api.post(
            '/orderItems',
            orderItem, {
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
            },


        }
        );

        if (response.status === 201) {
            return response.data;
        } else {
            console.error('Failed to create order item:', response.status);
            return null;
        }
    } catch (error) {
        console.error('Error creating order item:', error);
        return null;
    }
};