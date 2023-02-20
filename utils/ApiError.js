class ApiError {
  // probably should extend error class look into this
  constructor(statusCode, message) {
    this.statusCode = statusCode;
    this.message = message;
  }
}

module.exports = ApiError;
