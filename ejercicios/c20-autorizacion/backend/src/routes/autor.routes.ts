import { Router } from "express";
import * as autorController from "../controllers/autor.controller";
import { validate, validateParams } from "../middlewares/validate.middleware";
import { autorCreateSchema, autorUpdateSchema } from "../validations/autor.validation";
import { idParamSchema } from "../validations/libro.validation";
import { authenticate, authorize } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", autorController.getAll);

router.get("/:id", validateParams(idParamSchema), autorController.getById);

router.post("/", authenticate, authorize("ADMIN"), validate(autorCreateSchema), autorController.create);

router.put("/:id", authenticate, authorize("ADMIN"), validateParams(idParamSchema), validate(autorUpdateSchema), autorController.update);

router.delete("/:id", authenticate, authorize("ADMIN"), validateParams(idParamSchema), autorController.remove);

router.get("/:id/libros", validateParams(idParamSchema), autorController.getLibrosByAutor);

export default router;