import { Router } from 'express';
import { OrderControllers } from './order.controller';

const router = Router();
router.post('/', OrderControllers.createOrderBike);
router.get('/revenue', OrderControllers.calculateTotalRevenue);
export const OrderRoutes = router;
