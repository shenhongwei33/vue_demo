//独立页面路由
import {
  independenceRouterPage
} from './modular-base/router';
//业务总路由
import { pageRouter } from './pageRouter';

//错误页面路由
import {errorRouterPage} from './modular-error/router'


// 所有上面定义的路由都要写在下面的routers里
export const routers = [
  ...independenceRouterPage,
  ...errorRouterPage,
  ...pageRouter
];;