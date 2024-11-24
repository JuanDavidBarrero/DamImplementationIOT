import { Router } from "express";
import { devicesGet, devicesPost, getDeviceData, postDeviceSwitch } from "../controllers/devices.js";

const router = Router();

router.get('/', devicesGet);
router.post('/', devicesPost);
router.post('/:id', postDeviceSwitch);  
router.get('/:id', getDeviceData);  

export default router;
