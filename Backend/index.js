const express = require('express');
const mongoose = require("mongoose")
const cors = require('cors')
const bodyParser = require("body-parser")
const app = express();
app.use(cors());
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

const TodoSchema = new mongoose.Schema({
    todos: {
      type: String,
      required: true
    }
  });
const Todo = mongoose.model('Todo', TodoSchema);

app.post("/data", (req, res) => {
    const { todo } = req.body;    
    // Create a new instance of the model with the "todos" field set to the value of "todo"
    const newTodo = new Todo({
      todos: todo
    });
  
    // Save the new instance to the database
    newTodo.save()
      .then(() => {
        console.log("The data is saved..");
        res.send("Data received");
      })
      .catch(err => {
        console.error('Failed to save todo', err);
        res.status(500).send("Failed to save todo");
      });
  });

  app.get('/data', (req, res) => {
    Todo.find()
      .then(todos => res.json(todos))
      .catch(err => {
        console.error(err);
        res.status(500).send('Error fetching todos');
      });
  });
  app.get("/",(res,req)=>{
    res.send("<h1>hello</h1>")
  })
  app.post('/delete',(req,res)=>{
   console.log(req.body)
  })

const PORT = 3000
app.listen(PORT, function () {
    console.log(`the server is running in port ${PORT}`)
})