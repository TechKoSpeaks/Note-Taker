

// Create promisified versions of all functions using node, defining constants and variables below
const fs = require("fs");
const util = require("util");
var data = JSON.parse(fs.readFileSync("./db/data.json", "utf8"));
const writeFileAsync = util.promisify(fs.writeFile);

// Creating the route with module.exports for the app
module.exports = function(app) {

    // Display all of the notes listed
    app.get("/api/notes", function(req, res) {
        res.json(data);
    });

    // Creating new notes on the app
    app.post("/api/notes", function(req, res) {
// Writing these to a new note body
        let newNote = req.body;

        // Checking to find last ID within the json file, and assigning that note one greater than the original ID
        let lastId = data[data.length - 1]["id"];
        let newId = lastId + 1;
        newNote["id"] = newId;
        // Console logging the body of the note created for reference 
        console.log("Req.body:", req.body);
        // Pushing that data to a new note
        data.push(newNote);

        // write to the data.json file as well
        writeFileAsync("./db/data.json", JSON.stringify(data)).then(function() {
            console.log("data.json has been updated!");
        });

        res.json(newNote);
    });

    // Function that deals with deleting a post from the app
    app.delete("/api/notes/:id", function(req, res) {

        let noteId = req.params.id;
        let newId = 0;
        // Console logging deleted note ID for reference
        console.log(`Deleting note with ID ${noteId}`);
        // Filter data of current note, and return current note ID when note equal to noteId (required params ID)
        data = data.filter(currentNote => {
           return currentNote.id != noteId;
        });
        // For current note data, change note ID to string and add to newId (originally 0)
        for (currentNote of data) {
            currentNote.id = newId.toString();
            newId++;
        }
        // Write to files with updated json data
        fs.writeFileSync("./db/data.json", JSON.stringify(data));
        res.json(data);
    }); 
        
};