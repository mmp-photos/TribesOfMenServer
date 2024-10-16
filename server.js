import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import corsOptions from './config/corsOptions.js';

const app = express();

app.use(cors(corsOptions));
app.use(express.static(join(__dirname, 'public')));





import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = "mongodb+srv://apiConnect:Elh06wDQiSUBLUf3@clustercore.rkcxmtz.mongodb.net/?retryWrites=true&w=majority&appName=ClusterCore";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const run = async () => {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
};

run().catch(console.dir);















app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.path}`);
    next();
});

app.get('/test', (req, res) => {
    console.log(`Request for test file`);
    res.status(200).json({ message: 'successful request' }); // Use status 200 for success
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ error: '404 - not found' });
    } else {
        res.type('txt').send('404 Not-Found');
    }
});

const PORT = process.env.PORT || 3500;
app.listen(PORT, () => console.log('Listening on port', PORT));
