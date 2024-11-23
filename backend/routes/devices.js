import {Router} from "express";
import { devicesGet, devicesPost } from "../controllers/devices.js";

const router =  Router();

router.get('/', devicesGet);
router.post('/', devicesPost);

export default router;