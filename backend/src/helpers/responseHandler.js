import ERRORS from "#constants";

class ResponseHandler {
  static ok(res, data = null, message = ERRORS.MESSAGE.OK) {
    return res.status(ERRORS.STATUS.OK).json({ status: ERRORS.STATUS.OK, message, data });
  }

  static created(res, data = null, message = ERRORS.MESSAGE.CREATED) {
    return res.status(ERRORS.STATUS.CREATED).json({ status: ERRORS.STATUS.CREATED, message, data });
  }

  static badRequest(res, data = null, message = ERRORS.MESSAGE.BAD_REQUEST) {
    return res.status(ERRORS.STATUS.BAD_REQUEST).json({ status: ERRORS.STATUS.BAD_REQUEST, message, data });
  }

  static unauthorized(res, data = null, message = ERRORS.MESSAGE.UNAUTHORIZED) {
    return res.status(ERRORS.STATUS.UNAUTHORIZED).json({ status: ERRORS.STATUS.UNAUTHORIZED, message, data });
  }

  static forbidden(res, data = null, message = ERRORS.MESSAGE.FORBIDDEN) {
    return res.status(ERRORS.STATUS.FORBIDDEN).json({ status: ERRORS.STATUS.FORBIDDEN, message, data });
  }

  static notFound(res, data = null, message = ERRORS.MESSAGE.NOT_FOUND) {
    return res.status(ERRORS.STATUS.NOT_FOUND).json({ status: ERRORS.STATUS.NOT_FOUND, message, data });
  }

  static conflict(res, data = null, message = ERRORS.MESSAGE.CONFLICT) {
    return res.status(ERRORS.STATUS.CONFLICT).json({ status: ERRORS.STATUS.CONFLICT, message, data });
  }

  static tooManyRequests(res, data = null, message = ERRORS.MESSAGE.TOO_MANY_REQUESTS) {
    return res.status(ERRORS.STATUS.TOO_MANY_REQUESTS).json({ status: ERRORS.STATUS.TOO_MANY_REQUESTS, message, data });
  }

  static serverError(res, data = null, message = ERRORS.MESSAGE.SERVER_ERROR) {
    return res.status(ERRORS.STATUS.SERVER_ERROR).json({ status: ERRORS.STATUS.SERVER_ERROR, message, data });
  }
}

export default ResponseHandler;
