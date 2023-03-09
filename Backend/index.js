const express = require('express');
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect('mongodb+srv://sumeettheracer:yqi7kYhYMlzftLsz@cluster0.ldfosyq.mongodb.net/todo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to MongoDB!');
});

const todoSchema = new mongoose.Schema({
    todos: {
        type: String,
        required: true
    }
})


app.post("/",(req,res)=>{
    console.log(req.body.hello)
})

const PORT = 3000
app.listen(PORT, function () {
    console.log(`the server is running in port ${PORT}`)
})