import express from 'express';
import { syncDatabaseModels } from './config/database/DatabaseSync.js';
import { DepositRouter } from './routers/DepositRouter.js';
import { ProductMovementRouter } from './routers/ProductMovementRouter.js';
import { ProductRouter } from './routers/ProductRouter.js';
import { UserRouter } from './routers/UserRouter.js';
import { DepartmentRouter } from './routers/DepartmentRouter.js';
import { SuplierRouter } from './routers/SuplierRouter.js';
import { CostCenterRouter } from './routers/CostCenterRouter.js';
import { PurchaseRequestRouter } from './routers/PurchaseRequestRouter.js';
import { QuotationRouter } from './routers/QuotationRouter.js';
import { PurchaseRouter } from './routers/PurchaseRouter.js';

const app = express();

app.use(express.json());

syncDatabaseModels();

app.use("/user", UserRouter);
app.use("/product", ProductRouter);
app.use("/deposit", DepositRouter);
app.use("/product-movement", ProductMovementRouter);
app.use("/department", DepartmentRouter);
app.use("/suplier", SuplierRouter);
app.use("/cost-center", CostCenterRouter);
app.use("/purchase-request", PurchaseRequestRouter);
app.use("/quotation", QuotationRouter);
app.use("/purchase", PurchaseRouter);

app.listen(8080, () => {
  console.log("Started server at http://localhost:8080");
});