
// . Init Aliases
require("module-alias/register")
require("app-module-path").addPath(`${__dirname}/src`);

// . Init ENV
require("dotenv").config();

// . Init IoC
require("ioc/index")

// . Init ENV
require("ioc/init/env.js")

// . Init Configs
require("ioc/init/config.js")

// . Init Logger
require("ioc/init/logger.js")

// . Init ErrorHandler
require("ioc/init/errorHandler.js")

// . Init Caching


// . Init Database
require("ioc/init/mdb.js")

// . Init Models


// . Init DMs
require("ioc/init/dm.js")
require("ioc/init/usersDM.js")

// . Init Controllers


// . Init HTTP Router
const express = require("express");
const RouterInit = require("app/Router")

const app = express();

RouterInit(app)

app.listen(3000, () => {
  console.log("Server started")
})

// . Init CRON
