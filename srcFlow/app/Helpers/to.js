// @flow

export default function to<T>(promise: Promise<T>): Promise<[?Error, ?T]> {
  return promise
    .then(res => [null, res])
    .catch(err => [err, null])
}
