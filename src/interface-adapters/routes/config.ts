import type { RouteItem } from "./routeTypes";

const routes: RouteItem[] = [
  // {
  //   path: ["/", "/home"],
  //   component: "Home",
  //   exact: true,
  // },

  {
    path: "/",
    component: "Home.tsx",
    exact: true,
    layout: "main",
  },
  {
    path: "/register",
    component: "signUp/SignUp.tsx",
    exact: true,
    layout: "auth",
  },
  // {
  //   path: '/projects',
  //   component: 'Dashboard',
  //   exact: true,
  //   protected: true,
  // },
  // {
  //   path: '/projects/:id',
  //   component: 'ProjectPage',
  //   exact: true,
  //   protected: true,
  // },
  // {
  //   path: '/',
  //   component: 'Dashboard',
  //   exact: true,
  //   protected: true,
  // },
];

export default routes;
