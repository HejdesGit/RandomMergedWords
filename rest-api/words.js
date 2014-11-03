// Define an endpoint.
exports.getWord = {
    spec: {
        description: "Creating and saving a list name",
        path: "/word",
        notes: "Creates a list name and stores it in database",
        summary: "Get list name",
        method: "GET",
        type: "string",
        nickname: "getWords"
    },
    action: function (req, res) {
        // Let's pretend we have some accounts retrieved from database.
        res.json();
    }
};