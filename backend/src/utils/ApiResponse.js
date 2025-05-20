class ApiResponse {
  constructor(success, statusCode, message, data = null) {
    this.success = success;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.timestamp = new Date().toISOString();
  }

  /**
   * Create a success response
   * @param {string} message - Success message
   * @param {object} data - Response data
   * @param {number} statusCode - HTTP status code (default: 200)
   * @returns {ApiResponse} Response object
   */
  static success(message, data = null, statusCode = 200) {
    return new ApiResponse(true, statusCode, message, data);
  }

  /**
   * Create an error response
   * @param {string} message - Error message
   * @param {number} statusCode - HTTP status code (default: 400)
   * @param {object} errors - Error details (optional)
   * @returns {ApiResponse} Response object
   */
  static error(message, statusCode = 400, errors = null) {
    return new ApiResponse(false, statusCode, message, errors);
  }

  /**
   * Create a not found error response
   * @param {string} message - Error message (default: "Not found")
   * @returns {ApiResponse} Response object
   */
  static notFound(message = "Not found") {
    return ApiResponse.error(message, 404);
  }

  /**
   * Create an unauthorized error response
   * @param {string} message - Error message (default: "Unauthorized access")
   * @returns {ApiResponse} Response object
   */
  static unauthorized(message = "Unauthorized access") {
    return ApiResponse.error(message, 401);
  }

  /**
   * Create a forbidden error response
   * @param {string} message - Error message (default: "Forbidden access")
   * @returns {ApiResponse} Response object
   */
  static forbidden(message = "Forbidden access") {
    return ApiResponse.error(message, 403);
  }

  /**
   * Create a server error response
   * @param {string} message - Error message (default: "Internal server error")
   * @param {object} errors - Error details (optional)
   * @returns {ApiResponse} Response object
   */
  static serverError(message = "Internal server error", errors = null) {
    return ApiResponse.error(message, 500, errors);
  }
}

module.exports = ApiResponse;
