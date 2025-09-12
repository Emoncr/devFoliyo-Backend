/**
 * Unified response handler for consistent API responses
 */
class ResponseHandler {
  /**
   * Send success response
   */
  static success(res, data = null, message = 'Success', statusCode = 200) {
    const response = {
      success: true,
      statusCode,
      message,
      data,
      timestamp: new Date().toISOString(),
    };

    return res.status(statusCode).json(response);
  }

  /**
   * Send error response
   */
  static error(res, message = 'Internal server error', statusCode = 500, errors = null) {
    const response = {
      success: false,
      statusCode,
      message,
      errors,
      timestamp: new Date().toISOString(),
    };

    return res.status(statusCode).json(response);
  }

  /**
   * Send created response (201)
   */
  static created(res, data = null, message = 'Resource created successfully') {
    return this.success(res, data, message, 201);
  }

  /**
   * Send unauthorized response (401)
   */
  static unauthorized(res, message = 'Unauthorized') {
    return this.error(res, message, 401);
  }

  /**
   * Send not found response (404)
   */
  static notFound(res, message = 'Resource not found') {
    return this.error(res, message, 404);
  }

  /**
   * Send validation error response (422)
   */
  static validationError(res, message = 'Validation failed', errors = null) {
    return this.error(res, message, 422, errors);
  }

  /**
   * Send conflict response (409)
   */
  static conflict(res, message = 'Resource conflict') {
    return this.error(res, message, 409);
  }

  /**
   * Send forbidden response (403)
   */
  static forbidden(res, message = 'Forbidden') {
    return this.error(res, message, 403);
  }
}

export default ResponseHandler;
