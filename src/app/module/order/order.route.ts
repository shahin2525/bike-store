import { Router } from 'express';
import { OrderControllers } from './order.controller';

const router = Router();
router.post('/', OrderControllers.createOrderBike);
export const OrderRoutes = router;
