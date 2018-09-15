//Initiallising node modules
var express = require("express");
var bodyParser = require("body-parser");
var sql = require("mssql");
var app = express();

// Body Parser Middleware
app.use(bodyParser.json());

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

//Setting up server
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});

//Initiallising connection string
var dbConfig = {
    user: "sa",
    password: "guiHTY58Rgs",
    server: "localhost\\DESKTOP-LC9N9KF",
    database: "Hampayvand"
};

//Function to connect to database and execute query
var executeQuery = function (res, query) {
    sql.connect(dbConfig, function (err) {
        if (err) {
            console.log("Error while connecting database :- " + err);
            res.send({err:"ERR"});
        }
        else {
            // create Request object
            var request = new sql.Request();
            // query to the database
            request.query(query, function (err, res) {
                if (err) {
                    console.log("Error while querying database :- " + err);
                    res.send({err:"ERR"});
                }
                else {
                    res.send(res);
                }
            });
        }
    });
}

//GET API
app.post("/api/regTeam", function (req, res) {
    var query = "INSERT INTO [dbo].[RegisteredPersons]  ([name],[phone],[email],[description],[title],[role]) VALUES ('" + req.body.name + "','" + req.body.phone + "','" + req.body.email + "','" + req.body.des + "','" + req.body.idea + "','team')";
    executeQuery(res, query);
});

//POST API
app.post("/api/regMentor", function (req, res) {
    var query = "INSERT INTO [dbo].[RegisteredPersons]  ([name],[phone],[email],[description],[title],[role]) VALUES ('" + req.body.name + "','" + req.body.phone + "','" + req.body.email + "','" + req.body.des + "','" + req.body.idea + "','mentor')";
    executeQuery(res, query);
});

//PUT API
app.post("/api/regInvestor", function (req, res) {
    var query = "INSERT INTO [dbo].[RegisteredPersons]  ([name],[phone],[email],[description],[title],[role]) VALUES ('" + req.body.name + "','" + req.body.phone + "','" + req.body.email + "','" + req.body.des + "','" + req.body.idea + "','investor')";
    executeQuery(res, query);
});