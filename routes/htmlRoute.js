
// Require path for obtaining the file path of the html utilized
var path = require("path");


// Creating route that send user to AJAx page and gets html to display on the page.
// Create a module exports that is a function for routes using the app to write data to notes.html and index.html subsequently
module.exports = function(app) {

    app.get("/notes", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/notes.html"));
    });

    app.get("*", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

};