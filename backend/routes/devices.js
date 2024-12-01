import { Router } from "express";
import { addMeasurement, devicesGet, devicesPost, getDeviceData, postDeviceSwitch } from "../controllers/devices.js";

const router = Router();

router.get('/', devicesGet);
router.post('/', devicesPost);
router.post('/:id', postDeviceSwitch);  
router.get('/:id', getDeviceData);  
router.put('/:id', addMeasurement);  

export default router;
