import apiClient from "../Api/Axios";
import ApiErrorHandler from "../Utils/ApiErrorHandler";

const WishlistService = {
  AddToWishlist: async (customerId, productId) => {
    try {
      const response = await apiClient.post(
        "Wishlist/AddToWishlist",
        {},
        {
          params: {
            customerId,
            productId,
          },
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(ApiErrorHandler.getErrorMessage(error));
    }
  },

  GetWishlistItems: async ({ customerId }) => {
    try {
      const response = await apiClient.get("Wishlist/GetWishlistItems", {
        params: {
          customerId,
        },
      });

      return response.data;
    } catch (error) {
      throw new Error(ApiErrorHandler.getErrorMessage(error));
    }
  },

  DeleteItemFromWishlist: async (customerId, productId) => {
    try {
      const response = await apiClient.delete(
        `WishList/DeleteItemFromWishlist?customerId=${customerId}&productId=${productId}`
      );

      return response.data;
    } catch (error) {
      throw new Error(ApiErrorHandler.getErrorMessage(error));
    }
  },
};

export default WishlistService;
