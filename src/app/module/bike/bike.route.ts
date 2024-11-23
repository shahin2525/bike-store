import { Router } from 'express';
import { BikeControllers } from './bike.controller';

const router = Router();
router.post('/', BikeControllers.createBike);
router.get('/', BikeControllers.getAllBike);
router.get('/:productId', BikeControllers.getSingleBike);
router.put('/:productId', BikeControllers.updateBike);
router.delete('/:productId', BikeControllers.deleteBike);

export const BikeRoutes = router;
