import apiClient from "../Api/Axios";
import ApiErrorHandler from "../Utils/ApiErrorHandler";

const ProductService = {
  GetAllProducts: async ({ page, pageSize }) => {
    try {
      const response = await apiClient.get("Product/GetAllProducts", {
        params: {
          page,
          pageSize,
        },
      });

      return response.data;
    } catch (error) {
      throw new Error(ApiErrorHandler.getErrorMessage(error));
    }
  },

  GetProductDetails: async ({ productId }) => {
    try {
      const response = await apiClient.get("Product/GetProductDetails", {
        params: {
          productId,
        },
      });

      return response.data;
    } catch (error) {
      throw new Error(ApiErrorHandler.getErrorMessage(error));
    }
  },
};

export default ProductService;
