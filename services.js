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
        .catch(() => response.status(404).json({"error":"Profile Failed to registered"}))
        .finally(() => client.close())
    })
    .catch(() => response.status(404).json({"error": "DB_ERR"}));
});

//Register Contacts
app.post("/Contact", (request, response) => { 
    let data = request.body;
    mongoClient.connect(DB_URL, {useNewUrlParser: true})
    .then((client) => {
        let db = client.db("mydb");
        db.collection("Contact")
        .insertOne(data)
        .then(() => response.status(201).json({"message":"Contact is registered"}))
        .catch(() => response.status(404).json({"error":" Contact Failed to registered"}))
        .finally(() => client.close())
    })
    .catch(() => response.status(404).json({"error": "DB_ERR"}));
});
//Show all contacts
app.get("/contacts", (request, response) => { 
    mongoClient.connect(DB_URL, {useNewUrlParser:true})
    .then((client) => {
        let contacts = [];
        let db = client.db("mydb");
        let cursor = db.collection("Contact").find();
        cursor.forEach(document => contacts.push(document))
        .then(() => response.json(contacts))
        .finally(() => client.close())
    })
    .catch(() => response.status(404).json({"error": "DB_ERR"}))
});
//Delete Contacts
app.delete("/contact/:id", (request, response) => { 
    let id = parseInt(request.params.id);
   
    mongoClient.connect(DB_URL, {useNewUrlParser: true})
    .then((client) => {
        let db = client.db("mydb");
        db.collection("Contact")
        .deleteOne({_id: id})
        .then((value) => response.status(200).json(value))
        .catch((err) => response.status(404).json(err))
        .finally(() => client.close())
    })
    .catch(() => response.status(404).json({"error": "DB_ERR"}));
});

//Update Profile
app.put("/profile/:id", (request, response) => { 
    let id = parseInt(request.params.id);
    let data = request.body;
    mongoClient.connect(DB_URL, {useNewUrlParser: true})
    .then((client) => {
        let db = client.db("mydb");
        db.collection("Profile")
        .updateOne({_id: id}, {$set: data})
        .then((value) => response.status(200).json(value))
        .catch((err) => response.status(404).json(err))
        .finally(() => client.close())
    })
    .catch(() => response.status(404).json({"error": "DB_ERR"}));
});