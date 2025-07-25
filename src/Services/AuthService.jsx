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

  GenerateResetToken: async (email) => {
    try {
      const response = await apiClient.post(
        `Authentication/GenerateResetToken?email=${email}`
      );
      return response.data;
    } catch (error) {
      throw new Error(ApiErrorHandler.getErrorMessage(error));
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
      console.log(error);

      throw new Error(ApiErrorHandler.getErrorMessage(error)); // Use the error handler
    }
  },

  CheckExistence: async (email) => {
    try {
      const response = await apiClient.get(
        `Authentication/CheckExistence?email=${email}`
      );

      return response.data;
    } catch (error) {
      throw new Error(ApiErrorHandler.getErrorMessage(error));
    }
  },
};

export default AuthService;
