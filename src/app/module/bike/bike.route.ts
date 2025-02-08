import { Router } from 'express';
import { BikeControllers } from './bike.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.const';

const router = Router();
router.post('/', auth(USER_ROLE.admin), BikeControllers.createBike);
router.get(
  '/',
  // auth(USER_ROLE.admin, USER_ROLE.customer),
  BikeControllers.getAllBike,
);
router.get('/:productId', BikeControllers.getSingleBike);
router.put('/:productId', auth(USER_ROLE.admin), BikeControllers.updateBike);
router.delete('/:productId', auth(USER_ROLE.admin), BikeControllers.deleteBike);

export const BikeRoutes = router;
