import { Router, type IRouter } from "express";
import healthRouter from "./health";
import panchayatRouter from "./panchayat";

const router: IRouter = Router();

router.use(healthRouter);
router.use(panchayatRouter);

export default router;
