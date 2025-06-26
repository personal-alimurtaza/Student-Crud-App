import { Router } from "express";
import { PaymentController } from "#controllers";
import { authenticate } from "#middlewares";

const router = Router();

router.use(authenticate);

router.post("/initiate", PaymentController.initiatePayment);
router.post("/confirm", PaymentController.confirmPayment);

export default router;
