const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");



app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});

const urlDb = "mongodb://studyadmin:P2ssw0rd@ds145043.mlab.com:45043/study-groups";
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
mongoose.connect(urlDb);
const db = mongoose.connection;



const users = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
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
    id: mongoose.Schema.Types.ObjectId,
    description: String,
    assignments: []
});

let UnisDb = mongoose.model('Universities', universities);
let GroupsDb = mongoose.model('Groups', groups);
let UsersDb = mongoose.model('Users', users);

db.on('error', console.log.bind(console, "connection error:"));
db.once('open', () => {
    console.log("Conectada a la db");
});

app.use(express.static(path.join(__dirname, "build")));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "build/index.html"));
});


app.post('/api/login', (req, res) => {
    let body = req.body;

    UsersDb.findOne( {email: body.email} , (err , usuarioDb) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }

        if (!usuarioDb) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas - email',
                errors: err
            });
        }

        if(body.password !== usuarioDb.password) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas - password',
                errors: err
            });
        }

        usuarioDb.password = "xD";
        res.status(200).json({
            usuarioDb
        });

        


    });
});


app.get('/api/users', (req, res) => {
    UsersDb.find({})
        .exec(
            (err, users) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: "Error",
                        errors: err
                    });
                }

                res.status(200).json({
                    users
                });
            }
        )
});


app.post('/api/users', (req, res) => {

    const body = req.body;
    let user = new UsersDb({
        name: body.name,
        email: body.email,
        password: body.password,
        university: body.university,
        career: body.career,
        avatar: body.avatar
    });

    user.save((err, resp) => {
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

    });

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

app.post('/api/Universities', (req, res) => {
    let body = req.body;

    var university = new UnisDb({
        description: body.description,
        assignment: body.assignments
    });

    university.save((err, resp) => {
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


});




const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Listening port", port);
});