class ApiErrorHandler {
  static getErrorMessage(error) {
    if (!error.response) {
      // Network error or no response from the server
      return "Network error. Please check your internet connection.";
    }

    const { status, data } = error.response;
    // If `data` is an object, extract the message property
    const errorMessage =
      typeof data === "object"
        ? data.message || data.errorMessages || data.error
        : data;

    switch (status) {
      case 400:
        return errorMessage || "Invalid request. Please check your input.";
      case 401:
        return errorMessage || "Email or password is incorrect.";
      case 403:
        return (
          data ||
          "Forbidden. You don't have permission to access this resource."
        );
      case 404:
        return data.errorMessages || "Resource not found.";
      case 409:
        return errorMessage || " The email or phone number already exists.";
      case 500:
        return "Something went wrong. Please try again later.";
      default:
        return "An unexpected error occurred.";
    }
  }
}

export default ApiErrorHandler;
