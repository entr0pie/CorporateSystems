
import { Router } from 'express';
import { ioc } from '../ioc/container.js';
import { DepositController } from '../controllers/DepositController.js'
import { RequestValidator } from '../security/validators/RequestValidator.js';
import { body, param } from 'express-validator';

const depositRouter = Router();
const depositController = new DepositController(ioc.DepositService);

depositRouter.post("",
    ioc.filters.Authenticated,
    RequestValidator(
        body('name').notEmpty().isString(),
        body('isActive').notEmpty().isBoolean().toBoolean(),
    ),
    depositController.create.bind(depositController)
);

depositRouter.put("/:id",
    ioc.filters.Authenticated,
    RequestValidator(
        param('id').isNumeric().toInt(),
        body('name').notEmpty().isString(),
        body('isActive').notEmpty().isBoolean().toBoolean(),
    ),
    depositController.update.bind(depositController)
);

depositRouter.get("/:id",
    ioc.filters.Authenticated,
    RequestValidator(
        param('id').isNumeric().toInt(),
    ),
    depositController.findById.bind(depositController)
);

depositRouter.get("",
    ioc.filters.Authenticated,
    RequestValidator(
        param('page').isNumeric().toInt(),
        param('size').isNumeric().toInt(),
    ),
    depositController.findAll.bind(depositController)
);

export const DepositRouter = depositRouter;