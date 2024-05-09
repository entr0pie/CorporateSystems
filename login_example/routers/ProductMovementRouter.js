import { Router } from "express";
import { ProductMovementController } from "../controllers/ProductMovementController.js";
import { ioc } from "../ioc/container.js";

const productMovementController = new ProductMovementController(ioc.ProductMovementService);

const router = Router();

router.get("/date", ioc.filters.Authenticated, productMovementController.findByDateInterval.bind(productMovementController));
router.post("/", ioc.filters.Authenticated, productMovementController.create.bind(productMovementController));
router.get("/:id", ioc.filters.Authenticated, productMovementController.findById.bind(productMovementController));
router.get("/", ioc.filters.Authenticated, productMovementController.findAll.bind(productMovementController));
router.get("/product/:productId", ioc.filters.Authenticated, productMovementController.findByProductId.bind(productMovementController));
router.get("/deposit/:depositId", ioc.filters.Authenticated, productMovementController.findByDepositId.bind(productMovementController));

export const ProductMovementRouter = router;
