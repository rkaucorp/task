const express = require("express");
const app = express();
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const coreRouting = require("./routes");
const variableConfiguration = require("./config");
const DB = require("./db");
app.use(fileUpload());
app.use(morgan("dev"));
app.use(coreRouting);

app.listen(variableConfiguration.APP_PORT, async () => {
  console.log(`Application Running on port ${variableConfiguration.APP_PORT}`);
  await DB.connect();
});
