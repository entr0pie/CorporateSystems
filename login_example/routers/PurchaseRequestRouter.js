import { Router } from "express";
import { ioc } from "../ioc/container.js";
import { PurchaseRequestController } from "../controllers/PurchaseRequestController.js";

const router = Router();
const purchaseRequestController = new PurchaseRequestController(ioc.PurchaseRequestService);

router.post("/", ioc.filters.Authenticated, purchaseRequestController.create.bind(purchaseRequestController));
router.get("/:id", ioc.filters.Authenticated, purchaseRequestController.findById.bind(purchaseRequestController));
router.get("/", ioc.filters.Authenticated, purchaseRequestController.findAll.bind(purchaseRequestController));
router.delete("/:id", ioc.filters.Authenticated, purchaseRequestController.cancel.bind(purchaseRequestController));

export const PurchaseRequestRouter = router;