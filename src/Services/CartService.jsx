import apiClient from "../Api/Axios";
import ApiErrorHandler from "../Utils/ApiErrorHandler";

const CartService = {
  AddToCart: async (customerId, productVariantId, sizeId, quantity) => {
    try {
      const response = await apiClient.post(
        "Cart/AddToCart",
        {},
        {
          params: {
            customerId,
            productVariantId,
            sizeId,
            quantity,
          },
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(ApiErrorHandler.getErrorMessage(error));
    }
  },

  GetCartItems: async ({ customerId }) => {
    try {
      const response = await apiClient.get("Cart/GetCartItems", {
        params: {
          customerId,
        },
      });

      return response.data;
    } catch (error) {
      throw new Error(ApiErrorHandler.getErrorMessage(error));
    }
  },

  ChangeItemQuantity: async (
    customerId,
    productVariantId,
    sizeId,
    quantity
  ) => {
    try {
      const response = await apiClient.put(
        "Cart/ChangeItemQuantity",
        {},
        {
          params: {
            customerId,
            productVariantId,
            sizeId,
            quantity,
          },
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(ApiErrorHandler.getErrorMessage(error));
    }
  },

  RemoveItemFromCart: async (customerId, productVariantId, sizeId) => {
    try {
      const response = await apiClient.delete(
        `Cart/RemoveItemFromCart?customerId=${customerId}&productVariantId=${productVariantId}&sizeId=${sizeId}`
      );

      return response.data;
    } catch (error) {
      throw new Error(ApiErrorHandler.getErrorMessage(error));
    }
  },
};

export default CartService;
