const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()
const { MongoClient } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.clvrh.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const blogsCollection = client.db("retroBlog").collection("blogs");
  console.log('database connected')
  // perform actions on the collection object
});


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port)
