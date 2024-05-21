import { Router } from "express";
import { ioc } from "../ioc/container.js";
import { PurchaseController } from "../controllers/PurchaseController.js";

const router = Router();
const purchaseController = new PurchaseController(ioc.PurchaseService);

router.get("/:id", ioc.filters.Authenticated, purchaseController.findById.bind(purchaseController));
router.get("/", ioc.filters.Authenticated, purchaseController.findAll.bind(purchaseController));
router.put("/:id", ioc.filters.Authenticated, purchaseController.updateStatus.bind(purchaseController));

export const PurchaseRouter = router;