import 'dotenv/config';
import express from 'express';
import { syncDatabaseModels } from './config/database/DatabaseSync.js';

const app = express();

syncDatabaseModels();

app.get("/health", (req, res) => {
  res.json({
    "status": "UP"
  });
});

app.listen(8080, () => {
  console.log("Started server at http://localhost:8080");
});