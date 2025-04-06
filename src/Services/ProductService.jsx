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

  GetAllCategories: async () => {
    try {
      const response = await apiClient.get("Product/GetAllCategories");

      return response.data;
    } catch (error) {
      throw new Error(ApiErrorHandler.getErrorMessage(error));
    }
  },

  GetAllColors: async () => {
    try {
      const response = await apiClient.get("Order/GetAllColors");

      return response.data;
    } catch (error) {
      throw new Error(ApiErrorHandler.getErrorMessage(error));
    }
  },

  GetAllSizes: async () => {
    try {
      const response = await apiClient.get("Order/GetAllSizes");

      return response.data;
    } catch (error) {
      throw new Error(ApiErrorHandler.getErrorMessage(error));
    }
  },

  AddProduct: async (productData) => {
    try {
      const response = await apiClient.post(
        "Product/CreateProduct",
        productData
      );

      return response.data;
    } catch (error) {
      throw new Error(ApiErrorHandler.getErrorMessage(error));
    }
  },

  AddVariant: async (productData) => {
    try {
      const response = await apiClient.post(
        "Product/CreateProductVariant",
        productData
      );

      return response.data;
    } catch (error) {
      throw new Error(ApiErrorHandler.getErrorMessage(error));
    }
  },

  AddProductImages: async (productData) => {
    try {
      const response = await apiClient.post(
        "Product/CreateProductVariantImages",
        productData
      );

      return response.data;
    } catch (error) {
      throw new Error(ApiErrorHandler.getErrorMessage(error));
    }
  },
};

export default ProductService;
