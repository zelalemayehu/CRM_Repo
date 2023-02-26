let app = require("express")();// express object
let mongoClient = require("mongodb").MongoClient;// mongodb client
let cors = require("cors");// cors
let parser = require("body-parser");// parser
let PORT = 8181;// port for express
let DB_URL = "mongodb://127.0.0.1:27017";// db url
app.use(parser.json());// add cors & body paraser to the express
app.use(cors()); // enabling cors
app.listen(PORT, () => console.log(`Server started at ${PORT}`)); 

//Register user profile
app.post("/profile", (request, response) => { 
    let data = request.body;
    mongoClient.connect(DB_URL, {useNewUrlParser: true})
    .then((client) => {
        let db = client.db("mydb");
        db.collection("Profile")
        .insertOne(data)
        .then(() => response.status(201).json({"message":"Profile is registered"}))
        .catch(() => response.status(404).json({"error":"Failed to registered"}))
        .finally(() => client.close())
    })
    .catch(() => response.status(404).json({"error": "DB_ERR"}));
});
//Register Contacts

//Show all contacts

//Delete Contacts

//Update Profile

//