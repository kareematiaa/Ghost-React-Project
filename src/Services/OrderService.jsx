import apiClient from "../Api/Axios";
import ApiErrorHandler from "../Utils/ApiErrorHandler";

const OrderService = {
  CreateOrder: async (credentials) => {
    try {
      const response = await apiClient.post("Order/CreateOrder", credentials);

      return response.data;
    } catch (error) {
      console.log(error);

      throw new Error(ApiErrorHandler.getErrorMessage(error));
    }
  },

  GetShippingCosts: async () => {
    try {
      const response = await apiClient.get("Shipping/GetShippingCosts");

      return response.data;
    } catch (error) {
      throw new Error(ApiErrorHandler.getErrorMessage(error));
    }
  },

  GetAllOrders: async () => {
    try {
      const response = await apiClient.get("Order/GetAllOrders");

      return response.data;
    } catch (error) {
      throw new Error(ApiErrorHandler.getErrorMessage(error));
    }
  },

  GetAllCustomers: async () => {
    try {
      const response = await apiClient.get("User/GetAllCustomers");

      return response.data;
    } catch (error) {
      throw new Error(ApiErrorHandler.getErrorMessage(error));
    }
  },

  GetOrderDetails: async (orderId) => {
    try {
      const response = await apiClient.get(`Order/GetOrderDetails/${orderId}`);
      return response.data;
    } catch (error) {
      throw new Error(ApiErrorHandler.getErrorMessage(error));
    }
  },
};

export default OrderService;
