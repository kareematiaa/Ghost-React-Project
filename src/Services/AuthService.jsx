import apiClient from "../Api/Axios";

import ApiErrorHandler from "../Utils/ApiErrorHandler";

const AuthService = {
  login: async (credentials) => {
    try {
      const response = await apiClient.post(
        "Authentication/Login",
        credentials
      );
      return response.data;
    } catch (error) {
      throw new Error(ApiErrorHandler.getErrorMessage(error)); // Use the error handler
    }
  },

  register: async (credentials) => {
    try {
      const response = await apiClient.post(
        "Authentication/CustomerRegister",
        credentials
      );
      return response.data;
    } catch (error) {
      throw new Error(ApiErrorHandler.getErrorMessage(error)); // Use the error handler
    }
  },

  generateOtp: async (email, purpose) => {
    try {
      const response = await apiClient.post(
        "Authentication/generateOtp",
        {},
        {
          params: { email, purpose }, // Send as query parameters
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(ApiErrorHandler.getErrorMessage(error));
    }
  },

  validateOtp: async (email, code) => {
    try {
      const response = await apiClient.post(
        "Authentication/validateOtp",
        {},
        {
          params: { email, code }, // Send as query parameters
        }
      );
      return response;
    } catch (error) {
      throw new Error(ApiErrorHandler.getErrorMessage(error)); // Use the error handler
    }
  },

  ResetPassword: async (credentials) => {
    try {
      const response = await apiClient.post(
        "Authentication/ResetPassword",
        credentials
      );
      return response.data;
    } catch (error) {
      throw new Error(ApiErrorHandler.getErrorMessage(error));
    }
  },

  ForgotPassword: async (credentials) => {
    try {
      const response = await apiClient.post(
        "Authentication/ForgotPassword",
        credentials
      );
      return response.data;
    } catch (error) {
      throw new Error(ApiErrorHandler.getErrorMessage(error)); // Use the error handler
    }
  },
};

export default AuthService;
