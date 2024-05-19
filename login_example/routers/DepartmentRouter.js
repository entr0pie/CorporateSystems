import { Router } from "express";
import { ioc } from "../ioc/container.js";
import { DepartmentController } from "../controllers/DepartmentController.js";

const router = Router();
const departmentController = new DepartmentController(ioc.DepartmentService);

router.get("/:id", departmentController.findById.bind(departmentController));
router.get("", departmentController.findAll.bind(departmentController));
router.post("", ioc.filters.Authenticated, departmentController.create.bind(departmentController));
router.put("/:id", ioc.filters.Authenticated, departmentController.update.bind(departmentController));
router.delete("/:id", ioc.filters.Authenticated, departmentController.delete.bind(departmentController));

export const DepartmentRouter = router;