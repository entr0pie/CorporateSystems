
import { Router } from 'express';
import { ioc } from '../ioc/container.js';
import { DepositController } from '../controllers/DepositController.js'

const depositRouter = Router();
const depositController = new DepositController(ioc.DepositService);

depositRouter.post("", ioc.filters.Authenticated, depositController.create.bind(depositController));
depositRouter.put("/:id", ioc.filters.Authenticated, depositController.update.bind(depositController));
depositRouter.get("/:id", ioc.filters.Authenticated, depositController.findById.bind(depositController));
depositRouter.get("", ioc.filters.Authenticated, depositController.findAll.bind(depositController));

export const DepositRouter = depositRouter;