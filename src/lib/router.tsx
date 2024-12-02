import { createBrowserRouter } from "react-router-dom";
import { Signup } from "../pages/Signup";
import { Layout } from "../components/Layout";

export type Route = { route: string; name: string };
export const routes: Route[] = [
  { route: "/", name: "Home" },
  { route: "signup", name: "Signup" },
];

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <h1>Home</h1> },
      {
        path: "signup",
        element: <Signup />,
      },
      { path: "*", element: <h1>Sorry, page not found</h1> },
    ],
  },
]);
