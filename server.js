import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import cors from 'cors';
import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';
import classesRouter from './routes/classesRouter.js';
import connectToDatabase from './data/database2.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import corsOptions from './config/corsOptions.js';

const app = express();

app.use(cors(corsOptions));
app.use(express.static(join(__dirname, 'public')));


app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.path}`);
    next();
});

const uri = process.env.ATLAS_CONNECT;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.use('/class', classesRouter);

app.get('/muppet/', async (req, res) => {
  console.log(`Request for muppets file`);
  console.log(`It's time to light the lights!`);
  try {
      const db = await connectToDatabase();
      const muppetsCollection = db.collection('users');
      const findUsername = "Matt";
      const firstMuppet = await muppetsCollection.findOne({ username: findUsername });
      res.status(200).json(firstMuppet);
  } catch (error) {
      console.error("Error fetching Muppet:", error);
      res.status(500).json({ error: 'Failed to retrieve the first Muppet' });
  } finally {
      await client.close();
  }
});



// app.get('*', (req, res) => {
//   res.status(404);
//   console.log(`All route was requested`)
//   if (req.accepts('html')) {
//       res.sendFile(join(__dirname, 'views', '404.html'));
//   } else if (req.accepts('json')) {
//       res.json({ error: '404 - not found' });
//   } else {
//       res.type('txt').send('404 Not-Found');
//   }
// });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


const PORT = process.env.PORT || 3500;
app.listen(PORT, () => console.log('Listening on port', PORT));
