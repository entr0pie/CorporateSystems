import { Router } from "express";
import { ioc } from "../ioc/container.js";
import { QuotationController } from "../controllers/QuotationController.js";

const router = Router();
const quotationController = new QuotationController(ioc.QuotationService);

router.post("/", quotationController.create.bind(quotationController));
router.get("/", quotationController.findAll.bind(quotationController));
router.get("/:id", quotationController.findById.bind(quotationController));
router.put("/:id", quotationController.update.bind(quotationController));
router.delete("/:id", quotationController.delete.bind(quotationController));

export const QuotationRouter = router;