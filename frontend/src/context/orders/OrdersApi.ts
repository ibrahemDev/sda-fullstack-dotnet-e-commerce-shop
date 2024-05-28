import api from "@/api";
import { CreateOrderDto, Order } from "./OrdersTypes";
import { AxiosResponse } from "axios";



export const createNewOrder = async (orderData: CreateOrderDto, token: string): Promise<Order | null> => {
    try {
        const response: AxiosResponse<Order> = await api.post(
            '/orders',
            orderData, {
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
            },


        }
        );

        if (response.status === 201) {
            return response.data;
        } else {
            // Handle errors appropriately, e.g., by throwing an error or returning null
            console.error('Failed to create order:', response.status);
            return null;
        }
    } catch (error) {
        // Handle errors appropriately, e.g., by throwing an error or returning null
        console.error('Error creating order:', error);
        return null;
    }
};
