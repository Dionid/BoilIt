// @flow
import Env from "../ignite/env"

const databaseConfig = (env: Env) => {
  return {
    main: {
      client: "pg",
      connection: {
        host: env.get("DB_HOST", "localhost"),
        port: env.get("DB_PORT", "5432"),
        user: env.get("DB_USER", "root"),
        password: env.get("DB_PASSWORD", ""),
        database: env.get("DB_DATABASE", "dkh"),
      },
      debug: env.get("DB_DEBUG", true),
    },
  }
}

export default databaseConfig
