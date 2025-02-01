import { Router } from 'express';

import { LoginController } from './auth.controller';
import { USER_ROLE } from '../user/user.const';
import auth from '../../middlewares/auth';

const router = Router();

router.post('/login', LoginController.loginUser);

router.post(
  '/change-password',
  auth(USER_ROLE.admin, USER_ROLE.customer),
  //   validateRequest(AuthValidation.changePasswordValidationSchema),
  LoginController.changePassword,
);

router.post(
  '/refresh-token',
  // validateRequest(AuthValidation.refreshTokenValidationSchema),
  LoginController.refreshToken,
);
export const AuthRoutes = router;
