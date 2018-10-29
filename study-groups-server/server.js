const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
// const {universities} = require('./model');


const urlDb = "mongodb://studyadmin:P2ssw0rd@ds145043.mlab.com:45043/study-groups";
mongoose.connect(urlDb, { useNewUrlParser: true });
const db = mongoose.connection;



const users = new mongoose.Schema({
    id: Number,
    name: String,
    email: String,
    password: String,
    university: String,
    career: String,
    avatar: String
});

const groups = new mongoose.Schema({
    id: Number,
    owner: Number,
    description: String,
    title: String,
    datetime: String,
    university: String,
    assignment: String,
    professor: String,
    limit: Number,
    participants: [],
    location: String
});

const universities = new mongoose.Schema({
    id: String,
    assignments: []
});

const UnisDb = mongoose.model('Universities', universities);
const GroupsDb = mongoose.model('Groups', groups);
const UsersDb = mongoose.model('Users', users);

db.on('error', console.log.bind(console, "connection error:"));
db.once('open', () => {
    console.log("Conectada a la db");
});

app.use(express.static(path.join(__dirname, "build")));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "build/index.html"));
});


app.get('/api/Universities', (req, res) => {
    UnisDb.find({})
        .exec(
            (err, universities) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: "Error",
                        errors: err
                    });
                }

                res.status(200).json({
                    universities
                });
            }
        )

});

app.put('/api/Universities', (req, res) => {
    const body = req.body;

    var university = new MediaSource({
        id: req.id,
        assignment: req.assignments
    });

    UnisDb.save((err, resp) => {
        if (err) {
            return res.status(400).json(
                {
                    ok: false,
                    mensaje: "Error al crear universidad",
                    errors: err
                }
            );
        }

        res.status(201).json({
            resp
        });
    })


})




const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Listening port", port);
});