import { createRouter, createWebHistory } from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/index",
    },
    {
      path: "/index",
      name: "index",
      component: () => import("@/views/Index.vue"),
      children: [
        {
          path: "/index",
          redirect: "/star",
        },
        {
          path: "/star",
          name: "star",
          component: () => import("@/components/Star/index.vue"),
        },
        {
          path: "/ball",
          name: "ball",
          component: () => import("@/components/Ball/index.vue"),
        },
        {
          path: "/gobang",
          name: "gobang",
          component: () => import("@/components/Gobang/index.vue"),
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  if (to.matched.length === 0) {
    from.path ? next({ path: from.path }) : next("/");
  } else {
    next();
  }
});
router.afterEach(() => {
  NProgress.done();
});
export default router;
