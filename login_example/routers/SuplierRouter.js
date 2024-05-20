import { Router } from "express";
import { ioc } from "../ioc/container.js";
import { SuplierController } from "../controllers/SuplierController.js";

const router = Router();
const suplierController = new SuplierController(ioc.SuplierService);

router.get('/:id', ioc.filters.Authenticated, suplierController.findById.bind(suplierController));
router.get('/', ioc.filters.Authenticated, suplierController.findAll.bind(suplierController));
router.post('/', ioc.filters.Authenticated, suplierController.create.bind(suplierController));
router.put('/:id', ioc.filters.Authenticated, suplierController.update.bind(suplierController));
router.delete('/:id', ioc.filters.Authenticated, suplierController.delete.bind(suplierController));

export const SuplierRouter = router;