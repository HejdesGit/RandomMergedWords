// Define an endpoint.
exports.getListname = {
    spec: {
        description: "Retrieving a list name from given name",
        path: "/getlistname/",
        notes: "Retrieving a list name from given name",
        summary: "Get list name from argument",
        method: "GET",
        type: "string",
        nickname: "getListname",
        items: {
            type: "string"
        }
    },
    action: function (req, res) {
        // Let's pretend we have some accounts retrieved from database.
        res.json();
    }
};