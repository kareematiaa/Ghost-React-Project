import apiClient from "../Api/Axios";
import ApiErrorHandler from "../Utils/ApiErrorHandler";

const OrderService = {
  CreateOrder: async (credentials) => {
    try {
      const response = await apiClient.post("Order/CreateOrder", credentials);

      return response.data;
    } catch (error) {
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
};

export default OrderService;
