const ERRORS = {
  STATUS: {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    TOO_MANY_REQUESTS: 429,
    SERVER_ERROR: 500,
  },
  MESSAGE: {
    OK: "Data shown",
    CREATED: "Entity created successfully",
    BAD_REQUEST: "Invalid data provided",
    UNAUTHORIZED: "Unauthorized access",
    FORBIDDEN: "Access denied",
    NOT_FOUND: "Data not found",
    CONFLICT: "Resource already exists",
    TOO_MANY_REQUESTS: "Too many requests. Please try again later.",
    SERVER_ERROR: "Internal server error",
  },
};

export default ERRORS;
