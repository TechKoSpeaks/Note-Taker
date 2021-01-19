// Require variable for express server
const express = require("express");

const app = express();
// Setting a port to run at 8000, listener function (defined later in js) will listen via this port.
const PORT = 8000;

// Middleware will parse the data into json and encoded readable data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());