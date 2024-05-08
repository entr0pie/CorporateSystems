import { Router } from "express";
import { ProductController } from "../controllers/ProductController.js";
import { ioc } from "../ioc/container.js";

const productRouter = Router();
const productController = new ProductController(ioc.ProductService);

productRouter.get("/:id", ioc.filters.Authenticated, productController.findById.bind(productController));
productRouter.post("", ioc.filters.Authenticated, productController.create.bind(productController));
productRouter.put("/:id", ioc.filters.Authenticated, productController.update.bind(productController));
productRouter.delete("/:id",ioc.filters.Authenticated, productController.delete.bind(productController));

export const ProductRouter = productRouter;