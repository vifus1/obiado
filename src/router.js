import { createRouter, createWebHistory } from "vue-router";
import list from "./components/ordersList.vue";

const routerHistory = createWebHistory();
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: "/",
      component: list,
      name: "Home",
    },
  ],
});

export default router;
