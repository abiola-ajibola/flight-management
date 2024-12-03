import { createBrowserRouter } from "react-router-dom";
import { Signup } from "../pages/Signup";
import { Layout } from "../components/Layout";
import { Signin } from "@/pages/SignIn";
import { Flights } from "@/pages/Flights";
import { AddOrEditFlight } from "@/components/Add_EditFlight";
import { AuthGuard } from "@/components/AuthGuard";

export type Route = { route: string; name: string };
export const routes: Route[] = [
  { route: "/", name: "Home" },
  { route: "/signin", name: "Signin" },
  { route: "/flights", name: "Flights" },
];

export const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <h1 className="text-4xl mt-12">
            Welcome to the flight management portal
          </h1>
        ),
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "signin",
        element: <Signin />,
      },
      {
        path: "",
        element: <AuthGuard />,
        children: [
          {
            path: "flights",
            element: <Flights />,
          },
          {
            path: "flight",
            element: <AddOrEditFlight />,
          },
          {
            path: "flight/:id",
            element: <AddOrEditFlight />,
          },
        ],
      },
      {
        path: "*",
        element: <h1 className="text-center mt-12">Sorry, page not found</h1>,
      },
    ],
  },
]);
