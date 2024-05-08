import express from 'express';
import { syncDatabaseModels } from './config/database/DatabaseSync.js';
import { UserRouter } from './routers/UserRouter.js';
import { ProductRouter } from './routers/ProductRouter.js';
import { DepositRouter } from './routers/DepositRouter.js';

const app = express();

app.use(express.json());

syncDatabaseModels();

app.use("/user", UserRouter);
app.use("/product", ProductRouter);
app.use("/deposit", DepositRouter);

app.listen(8080, () => {
  console.log("Started server at http://localhost:8080");
});