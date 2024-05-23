import { Router } from "express";
import { ProductController } from "../controllers/ProductController.js";
import { ioc } from "../ioc/container.js";
import { RequestValidator } from "../security/validators/RequestValidator.js";
import { body, param } from "express-validator";

const productRouter = Router();
const productController = new ProductController(ioc.ProductService);

productRouter.get("/:id",
    ioc.filters.Authenticated,
    RequestValidator(
        param('id').isNumeric().toInt(),
    ),
    productController.findById.bind(productController)
);

productRouter.post("",
    ioc.filters.Authenticated,
    RequestValidator(
        body('name').notEmpty().isString(),
        body('description').notEmpty().isString(),
        body('isActive').notEmpty().isBoolean(),
    ),
    productController.create.bind(productController)
);

productRouter.put("/:id",
    ioc.filters.Authenticated,
    RequestValidator(
        param('id').isNumeric().toInt(),
        body('name').notEmpty().isString(),
        body('description').notEmpty().isString(),
        body('isActive').notEmpty().isBoolean().toBoolean(),
    ),
    productController.update.bind(productController)
);

productRouter.delete("/:id",
    ioc.filters.Authenticated,
    RequestValidator(
        param('id').isNumeric().toInt(),
    ),
    productController.delete.bind(productController)
);

export const ProductRouter = productRouter;