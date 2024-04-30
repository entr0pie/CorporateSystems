import { Router } from "express";
import { ProductController } from "../controllers/ProductController.js";
import { ioc } from "../ioc/container.js";
import { AuthenticationFilter } from "../security/authentication/filters/AuthenticationFilter.js";

const productRouter = Router();
const productController = new ProductController(ioc.ProductService);

productRouter.get("/:id", AuthenticationFilter(), productController.findById.bind(productController));
productRouter.post("", AuthenticationFilter(), productController.create.bind(productController));
productRouter.put("/:id", AuthenticationFilter(), productController.update.bind(productController));
productRouter.delete("/:id",AuthenticationFilter(), productController.delete.bind(productController));

export const ProductRouter = productRouter;