import express from 'express';

const app = express();

app.get("/health", (req, res) => {
  res.json({
    "status": "UP"
  });
});

app.listen(8080, () => {
  console.log("Started server at http://localhost:8080");
});