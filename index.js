// Dependencies

const express = require("express");
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

// MongoDb setup
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://azad:azad1403@cluster0.wov4a.mongodb.net/store?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const collection = client.db("store").collection("items");
    console.log('db connected');

    // Add item to db
    app.post('/addProduct', (req, res) => {
        const product = req.body;
       // console.log(product);
        collection.insertOne(product)
            .then(result => {
               // console.log(result,product);
                res.send('success')
            })

    })


    // GET data 
    app.get('/products', (req,res) => {
        collection.find({})
        .toArray( (err,documents) =>{
            res.send(documents);
           
        })
    })
});


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.listen(4000, () => {
    console.log('listening at port 4000');
})