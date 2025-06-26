import rateLimit from 'express-rate-limit';
import { ResponseHandler } from '#helpers';

const ipBlockMap = new Map();

const rateLimiter = rateLimit({
  windowMs: 10 * 1000,
  max: 10,

  handler: (req, res) => {
    const ip = req.ip;
    const blockUntil = Date.now() + 5 * 60 * 1000;
    ipBlockMap.set(ip, blockUntil);

    return ResponseHandler.tooManyRequests(res, null, "Too many requests. You are temporarily blocked for 5 minutes.");
  },

  keyGenerator: (req) => req.ip,

  skip: (req) => {
    const ip = req.ip;
    const blockUntil = ipBlockMap.get(ip);

    if (blockUntil && Date.now() < blockUntil) {
      return false;
    }

    if (blockUntil && Date.now() >= blockUntil) {
      ipBlockMap.delete(ip);
    }

    return false;
  }
});

export default rateLimiter;
