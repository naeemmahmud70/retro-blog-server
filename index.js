const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId

const app = express()
const port = process.env.PORT || 5000

app.use(cors());
app.use(bodyParser.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.clvrh.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const blogsCollection = client.db("retroBlog").collection("blogs");
  console.log('database connected')

  app.post('/addBlog', (req, res) => {
    const newBlog = req.body;
    blogsCollection.insertOne(newBlog)
      .then(result => {
        console.log('inserted', result.insertedCount)
        res.redirect('/')
      })
  })

  app.get('/blogs', (req, res) => {
    blogsCollection.find()
      .toArray((err, events) => {
        res.send(events)
      })
  })

  app.get('/blog/:id', (req, res) => {
    blogsCollection.find({ _id: ObjectId(req.params.id) })
      .toArray((err, documents) => {
        res.send(documents[0])
      })
  })

  app.delete('/delete/:id', (req, res) => {
    blogsCollection.deleteOne({ _id: ObjectId(req.params.id) })
      .then(result => {
        console.log(result)
        res.send(result)
      })
  })

});


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port)
