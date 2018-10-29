const mongoose = require("mongoose");


const users = new mongoose.Schema({
    id: Number,
    name: String,
    email: String,
    password: String,
    university: String,
    career: String,
    avatar: String
});

const universities = new mongoose.Schema({
    id: String,
    assignments: []
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
