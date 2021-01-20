// Require variable for express server
const express = require("express");

const app = express();
// Setting a port to run at 7000, listener function (defined later in js) will listen via this port.
const PORT = process.env.PORT || 7000;

// Middleware will parse the data into json and encoded readable data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Define what folder the browser will utilize via express
app.use(express.static("public"));

// Create require for Routes used in app 
require("./routes/apiRoute")(app);
require("./routes/htmlRoute")(app);

// Port listener to ensure app functionality on port 7000
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});