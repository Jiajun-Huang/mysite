import React, { lazy } from "react";
import { Navigate } from "react-router";
import SkeletonLoading from "../components/SkeletonLoading";
import ProtectedRoute from "../components/ProtectedRoute";
import { routesType } from "../types/route";
import BlogCreate from "../views/Blog/blogCreate";
import BlogEdit from "../views/Blog/blogEdit";
import BlogList from "../views/Blog/blogList";
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
    element: (
      <ProtectedRoute>
        <Top />
      </ProtectedRoute>
    ),
    exact: true,
    name: "menuRoutes",
    children: [
      {
        path: "/home",
        element: withLoadingComponent(<Home />),
      },
      {
        path: "/blog/list",
        element: withLoadingComponent(<BlogList />),
      },
      {
        path: "/blog/edit/:id",
        element: withLoadingComponent(<BlogEdit />),
      },
      {
        path: "/blog/create",
        element: withLoadingComponent(<BlogCreate />),
      },
    ],
  },
];

export default routes;
