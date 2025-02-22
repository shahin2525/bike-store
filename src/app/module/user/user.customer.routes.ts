import { Router } from 'express';
import { UserController } from './user.controller';

const router = Router();

router.get('/:id', UserController.getSingleUser);
router.delete('/:id', UserController.deleteUser);
router.get('/', UserController.getAllUser);
export const CustomerRoutes = router;
