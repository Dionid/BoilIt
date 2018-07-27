export default function asyncHandler(fn) {
  return function asyncHandlerFn(req, res, next) {
    return fn(req, res, next).catch(next)
  }
}
