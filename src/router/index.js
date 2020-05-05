import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "",
    component: Vue.component("Public", () => import("../layouts/Public.vue")),
    children: [
      {
        path: "",
        name: "Home",
        component: Vue.component("Home", () => import("../views/Home.vue")),
      },
      {
        path: "about",
        name: "About",
        component: Vue.component("About", () => import("../views/About.vue")),
      },
      {
        path: "login",
        name: "Login",
        component: Vue.component("Login", () => import("../views/Login.vue")),
      },
      {
        path: "register",
        name: "Register",
        component: Vue.component("Register", () =>
          import("../views/Register.vue")
        ),
      },
    ],
  },
  {
    path: "/app",
    name: "",
    component: Vue.component("Registered", () =>
      import("../layouts/Registered.vue")
    ),
    meta: {
      authRequired: true,
    },
    children: [
      {
        path: "",
        name: "Dashboard",
        component: Vue.component("Dashboard", () =>
          import("../views/Dashboard.vue")
        ),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "exact-active",
});

router.beforeEach(async (to, from, next) => {
  await store.dispatch("isLoggedIn");
  if (to.matched.some((record) => record.meta.authRequired)) {
    if (!store.state.LOGGED_IN) {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    if (to.name == "Login" || to.name == "Register") {
      if (store.state.LOGGED_IN) {
        next({
          path: "/app",
        });
      } else {
        next();
      }
    } else {
      next();
    }
  }
});

export default router;
