import { createRouter, createWebHashHistory } from 'vue-router'
import { h } from 'vue'
import { RouterView } from 'vue-router'
import HomeIndex from '@/page/HomeIndex.vue'
import AboutPage from '@/page/AboutPage.vue'
import NotFound from '@/page/NotFound.vue'
import LoginIndex from '@/page/LoginIndex.vue'
import GoodList from '@/page/goods/GoodList.vue'
import CategoryList from '@/page/category/CategoryList.vue'

// 默认路由
const routes = [
  {
    path: '/home',
    component: HomeIndex,
    name: 'home',
    meta: { title: "首页" },
  },
  {
    path: '/about',
    component: AboutPage,
    meta: { title: "关于" }
  },
  {
    path: '/login',
    component: LoginIndex,
    meta: { title: "登录" }
  },
  {
    path: '/:matchPath(.*)*',
    component: NotFound,
    meta: { title: "404" }
  },
]

// 动态路由，用于匹配菜单动态添加路由
const asyncRoutes = [{
  path: "",
  name: "/",
  component: { render: () => h(RouterView) },
  meta: {
    title: "后台首页"
  }
}, {
  path: "goods/list",
  name: "/goods/list",
  component: GoodList,
  meta: {
    title: "商品管理"
  }
}, {
  path: "category/list",
  name: "/category/list",
  component: CategoryList,
  meta: {
    title: "分类列表"
  }
},
  //   {
  //   path: "user/list",
  //   name: "/user/list",
  //   component: UserList,
  //   meta: {
  //     title: "用户列表"
  //   }
  // }, {
  //   path: "/order/list",
  //   name: "/order/list",
  //   component: OrderList,
  //   meta: {
  //     title: "订单列表"
  //   }
  // }, {
  //   path: "/comment/list",
  //   name: "/comment/list",
  //   component: CommentList,
  //   meta: {
  //     title: "评价列表"
  //   }
  // }, {
  //   path: "/image/list",
  //   name: "/image/list",
  //   component: ImageList,
  //   meta: {
  //     title: "图库列表"
  //   }
  // }, {
  //   path: "notice/list",
  //   name: "/notice/list",
  //   component: NoticeList,
  //   meta: {
  //     title: "公告列表"
  //   }
  // }, {
  //   path: "setting/base",
  //   name: "/setting/base",
  //   component: SettingBase,
  //   meta: {
  //     title: "配置"
  //   }
  // }, {
  //   path: "coupon/list",
  //   name: "/coupon/list",
  //   component: CouponList,
  //   meta: {
  //     title: "优惠券列表"
  //   }
  // }, {
  //   path: "manager/list",
  //   name: "/manager/list",
  //   component: ManagerList,
  //   meta: {
  //     title: "管理员管理"
  //   }
  // }, {
  //   path: "access/list",
  //   name: "/access/list",
  //   component: AccessList,
  //   meta: {
  //     title: "菜单权限管理"
  //   }
  // }, {
  //   path: "role/list",
  //   name: "/role/list",
  //   component: RoleList,
  //   meta: {
  //     title: "角色管理"
  //   }
  // }, {
  //   path: "skus/list",
  //   name: "/skus/list",
  //   component: SkusList,
  //   meta: {
  //     title: "规格管理"
  //   }
  // }, {
  //   path: "level/list",
  //   name: "/level/list",
  //   component: LevelList,
  //   meta: {
  //     title: "会员等级"
  //   }
  // }, {
  //   path: "setting/buy",
  //   name: "/setting/buy",
  //   component: SettingBuy,
  //   meta: {
  //     title: "支付设置"
  //   }
  // }, {
  //   path: "setting/ship",
  //   name: "/setting/ship",
  //   component: SettingShip,
  //   meta: {
  //     title: "物流设置"
  //   }
  // }, {
  //   path: "distribution/index",
  //   name: "/distribution/index",
  //   component: DistributionIndex,
  //   meta: {
  //     title: "分销员管理"
  //   }
  // }, {
  //   path: "distribution/setting",
  //   name: "/distribution/setting",
  //   component: DistributionSetting,
  //   meta: {
  //     title: "分销设置"
  //   }
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

// 是否新增路由
let hasNewRoute = false
export function addRoutes(menus) {
  const mid = (menus) => {
    menus.forEach((menu) => {
      const item = asyncRoutes.find(e => e.name == menu.frontpath)
      if (item && !router.hasRoute(item)) {
        router.addRoute('home', item)
        hasNewRoute = true
      }
      if (menu.child && menu.child.length > 0)
        addRoutes(menu.child)
    })
  }
  mid(menus)
  return hasNewRoute
}
export default router