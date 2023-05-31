class ApiError extends Error {
    constructor(status, message, errors = []) {
      super(message);
      this.status = status;
      this.errors = errors;
    }
  
    static unauthorizedError() {
      return new ApiError(401, "Пользователь не авторизован");
    }
  
    static forbiddenError() {
      return new ApiError(403, "Доступ запрещен");
    }
  
    static badRequestError(message, errors = []) {
      return new ApiError(400, message, errors);
    }
  
    static notFoundError(message = "Ресурс не найден") {
      return new ApiError(404, message);
    }
  
    static internalServerError(message = "Внутренняя ошибка сервера") {
      return new ApiError(500, message);
    }
  }
  
  module.exports = ApiError;
  