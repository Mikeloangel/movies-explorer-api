class UnauthorizedError extends Error {
  constructor(message = 'Нет доступа') {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = UnauthorizedError;
