import { Router } from 'express';
// import { LoginRoutes } from '../module/auth/login.routes';
import { UserRoutes } from '../module/user/user.routes';

import { AdminRoutes } from '../module/admin/admin.routes';
import { BikeRoutes } from '../module/bike/bike.route';
import { AuthRoutes } from '../module/auth/auth.routes';
import { OrderRoutes } from '../module/order/order.route';
import { CustomerRoutes } from '../module/user/user.customer.routes';

const router = Router();

const routesModule = [
  {
    path: '/auth/',
    route: AuthRoutes,
  },
  {
    path: '/auth/',
    route: UserRoutes,
  },
  {
    path: '/customers/',
    route: CustomerRoutes,
  },
  {
    path: '/products',
    route: BikeRoutes,
  },
  {
    path: '/admin/',
    route: AdminRoutes,
  },
  {
    path: '/orders',
    route: OrderRoutes,
  },
];

routesModule.forEach((route) => router.use(route.path, route.route));
export default router;
