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

  GetAllAdminProducts: async ({ page, pageSize }) => {
    try {
      const response = await apiClient.get("Product/GetAllAdminProducts", {
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
        "Product/CreateProductVariants",
        productData
      );

      return response.data;
    } catch (error) {
      console.log(error.response.data);
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
      console.log(error);

      throw new Error(ApiErrorHandler.getErrorMessage(error));
    }
  },

  DeleteProduct: async (productId) => {
    try {
      const response = await apiClient.delete(
        `Product/DeleteProduct?productId=${productId}`
      );

      return response.data;
    } catch (error) {
      throw new Error(ApiErrorHandler.getErrorMessage(error));
    }
  },

  DeleteProductVariant: async (productVariantId) => {
    try {
      const response = await apiClient.delete(
        `Product/DeleteProductVariant?productVariantId=${productVariantId}`
      );

      return response.data;
    } catch (error) {
      throw new Error(ApiErrorHandler.getErrorMessage(error));
    }
  },

  DeleteProductVariantImage: async (imageId) => {
    try {
      const response = await apiClient.delete(
        `Product/DeleteProductImage?productImageId=${imageId}`
      );

      return response.data;
    } catch (error) {
      log(error.response);
      throw new Error(ApiErrorHandler.getErrorMessage(error));
    }
  },

  GetProductVariantDetails: async (productVariantId, sizeId) => {
    try {
      const response = await apiClient.get(
        `Product/GetProductOrderVariant?variantId=${productVariantId}&sizeId=${sizeId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(ApiErrorHandler.getErrorMessage(error));
    }
  },

  AddColor: async (colorData) => {
    try {
      const response = await apiClient.post("Order/AddColor", colorData);
      return response.data;
    } catch (error) {
      throw new Error(ApiErrorHandler.getErrorMessage(error));
    }
  },

  AddSize: async (data) => {
    try {
      const response = await apiClient.post("Order/AddSize", data);
      return response.data;
    } catch (error) {
      throw new Error(ApiErrorHandler.getErrorMessage(error));
    }
  },
};

export default ProductService;
