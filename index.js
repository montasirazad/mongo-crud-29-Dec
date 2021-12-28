const express = require("express")

const app = express();


const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://azad:azad1403@cluster0.wov4a.mongodb.net/store?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("store").collection("items");
  console.log('db connected');
  const product = {name:'Oil',price:100,quantity:20}
  collection.insertOne(product)
  .then(result => {
      console.log('added');
  })
});


app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/index.html')
})

app.listen(4000, ()=>{
    console.log('listening at port 4000');
})