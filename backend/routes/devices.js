import {Router} from "express";
import { devicesGet } from "../controllers/devices.js";

const router =  Router();

router.get('/', devicesGet);

export default router;