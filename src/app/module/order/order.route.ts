import { Router } from 'express';
import { OrderControllers } from './order.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.const';

const router = Router();
router.post('/', auth(USER_ROLE.user), OrderControllers.createOrderBike);
router.delete('/', auth(USER_ROLE.admin), OrderControllers.deleteOrder);
router.put('/:productId', auth(USER_ROLE.admin), OrderControllers.updateOrder);
router.get(
  '/:productId',
  auth(USER_ROLE.admin),
  OrderControllers.getSingleOrder,
);
router.get('/', auth(USER_ROLE.admin), OrderControllers.getAllOrder);

router.get('/revenue', OrderControllers.calculateTotalRevenue);
export const OrderRoutes = router;
