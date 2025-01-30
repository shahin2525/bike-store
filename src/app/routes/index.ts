import { Router } from 'express';
// import { LoginRoutes } from '../module/auth/login.routes';
import { UserRoutes } from '../module/user/user.routes';
// import { BlogRoutes } from '../module/blog/blog.routes';
import { AdminRoutes } from '../module/admin/admin.routes';
import { BikeRoutes } from '../module/bike/bike.route';
import { LoginRoutes } from '../module/auth/login.routes';

const router = Router();

const routesModule = [
  {
    path: '/auth/',
    route: LoginRoutes,
  },
  {
    path: '/auth/',
    route: UserRoutes,
  },
  {
    path: '/blogs/',
    route: BikeRoutes,
  },
  {
    path: '/admin/',
    route: AdminRoutes,
  },
];

routesModule.forEach((route) => router.use(route.path, route.route));
export default router;
