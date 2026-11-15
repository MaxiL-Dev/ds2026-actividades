import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import { validate } from "../middlewares/validate.middleware";
import { registroSchema, loginSchema } from "../validations/auth.validation";
import { authenticate } from "../middlewares/auth.middleware";
import { updateProfileSchema } from "../validations/auth.validation";


const router = Router();

router.post("/registro", validate(registroSchema), authController.registrar);
router.post("/login", validate(loginSchema), authController.login);
router.get("/yo", authenticate, authController.yo);
router.put("/yo", authenticate, validate(updateProfileSchema), authController.updateYo);

export default router;