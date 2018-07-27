import boom from "boom"

export default outputTransformer => (req, res, next) => {
  if (res.boom) throw new Error("boom already exists on response object");

  res.boom = {};

  Object.getOwnPropertyNames(boom).forEach((key) => {
    if (typeof boom[key] !== "function") return;

    if (key === "boomify") {
      res.boom.boomify = (error, ...args) => {
        let boomed = {}
        try {
          boomed = boom[key].apply(this, [error, ...args]);
        } catch (e) {
          boomed = {
            output: {
              payload: error,
              statusCode: 502,
            },
          }
        }

        res.status(boomed.output.statusCode).send(boomed.output.payload);
      }
    } else {
      res.boom[key] = (...args) => {
        let boomed = boom[key].apply(this, args);

        if (typeof outputTransformer === "function") {
          boomed = outputTransformer(boomed);
        }

        const data = args[1]

        if (data && typeof data === "object") {
          if (data.details && typeof data.details === "object") {
            boomed.output.payload.details = data.details
          }
        }

        res.status(boomed.output.statusCode).send(boomed.output.payload);
      }
    }
  });

  next();
}
