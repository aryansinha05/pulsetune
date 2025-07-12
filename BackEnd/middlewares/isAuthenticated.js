import ErrorHandler from "../middlewares/error.js";

export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return next(new ErrorHandler("Please login to access this resource", 401));
};