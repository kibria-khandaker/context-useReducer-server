const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;

const app = express();

// middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.yuakuri.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1
});




async function run() {
    try {
        //------
        // const db = client.db("moontech");
        // const productCollection = db.collection("product");
        // Or--
        await client.connect();
        // Database Name and Table Name 
        const productCollection = client.db("moontech").collection("product");
        //--------

        app.get("/products", async (req, res) => {
            const cursor = productCollection.find({});
            const product = await cursor.toArray();

            res.send({ status: true, data: product });
        });

    }
    finally { }
}
run().catch(console.dir)









// for get main routing and testing 
app.get('/', (req, res) => {
    res.send('Server is Running')
});


// Server running port
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

// contextUseReducer
// YNHq0NSILz5wQoPf
