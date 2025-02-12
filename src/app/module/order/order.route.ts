import { Router } from 'express';
import { OrderControllers } from './order.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.const';

const router = Router();
router.get(
  '/:email',
  auth(USER_ROLE.customer),
  OrderControllers.getAllOrderByEmailForSingleCustomer,
);
router.post('/', auth(USER_ROLE.customer), OrderControllers.createOrderBike);
router.delete('/:orderId', auth(USER_ROLE.admin), OrderControllers.deleteOrder);
router.put('/:orderId', auth(USER_ROLE.admin), OrderControllers.updateOrder);
router.get('/:orderId', auth(USER_ROLE.admin), OrderControllers.getSingleOrder);

router.get('/', auth(USER_ROLE.admin), OrderControllers.getAllOrder);

router.get('/revenue', OrderControllers.calculateTotalRevenue);
export const OrderRoutes = router;
