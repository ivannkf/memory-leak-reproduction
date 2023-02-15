import {
  createMemoryHistory,
  createRouter as _createRouter,
  createWebHistory,
} from "vue-router";
import Home from "./pages/Home.vue";

export function createRouter() {
  let router = _createRouter({
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes: [
      {
        name: "home",
        path: "/en",
        component: Home,
      },
    ],
    scrollBehavior(to, from, savedPosition) {
      if (!to.name) return savedPosition;
      let fromProductToOrdering = popupComponents.some((name) =>
        from.name?.includes(name)
      );
      let sameRoute = from.name === to.name;
      let toProduct = popupComponents.some((name) => to.name.includes(name));
      if (toProduct || fromProductToOrdering || sameRoute) {
        return savedPosition;
      }
      return { x: 0, y: 0 };
    },
  });
  return router;
}
