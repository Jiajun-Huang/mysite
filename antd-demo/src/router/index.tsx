import React, { lazy } from "react";
import { Navigate } from "react-router";
import SkeletonLoading from "../components/SkeletonLoading";
import { routesType } from "../types/route";
import Top from "../views/Layout/Top";
import Login from "../views/Login";

const Error404 = lazy(() => import("../views/Error/404"));

const Home = lazy(() => import("../views/Home"));

const withLoadingComponent = (Comp: JSX.Element) => (
  <React.Suspense fallback={<SkeletonLoading />}>{Comp}</React.Suspense>
);
const routes: routesType[] = [
  {
    path: "/",
    element: <Navigate to="/home" />,
  },
  {
    path: "*",
    element: <Navigate to="/404" />,
  },
  {
    path: "/404",
    element: <Error404 />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Top />,
    exact: true,
    name: "menuRoutes",
    children: [
      {
        path: "/home",
        element: withLoadingComponent(<Home />),
      },
    ],
  },
];

export default routes;
