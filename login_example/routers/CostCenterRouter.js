import { Router } from "express";
import { ioc } from "../ioc/container.js";
import { CostCenterController } from "../controllers/CostCenterController.js";

const router = Router();
const costCenterController = new CostCenterController(ioc.CostCenterService);

router.get('/:id', ioc.filters.Authenticated, costCenterController.findById.bind(costCenterController));
router.get('/', ioc.filters.Authenticated, costCenterController.findAll.bind(costCenterController));
router.post('/', ioc.filters.Authenticated, costCenterController.create.bind(costCenterController));
router.put('/:id', ioc.filters.Authenticated, costCenterController.update.bind(costCenterController));
router.delete('/:id', ioc.filters.Authenticated, costCenterController.delete.bind(costCenterController));

export const CostCenterRouter = router;