import express from 'express';
import { syncDatabaseModels } from './config/database/DatabaseSync.js';
import { DepositRouter } from './routers/DepositRouter.js';
import { ProductMovementRouter } from './routers/ProductMovementRouter.js';
import { ProductRouter } from './routers/ProductRouter.js';
import { UserRouter } from './routers/UserRouter.js';
import { DepartmentRouter } from './routers/DepartmentRouter.js';
import { SuplierRouter } from './routers/SuplierRouter.js';

const app = express();

app.use(express.json());

syncDatabaseModels();

app.use("/user", UserRouter);
app.use("/product", ProductRouter);
app.use("/deposit", DepositRouter);
app.use("/product-movement", ProductMovementRouter);
app.use("/department", DepartmentRouter);
app.use("/suplier", SuplierRouter);

app.listen(8080, () => {
  console.log("Started server at http://localhost:8080");
});