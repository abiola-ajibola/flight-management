import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { Signup } from "./pages/Signup";
import { Layout } from "./components/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <h1>Home</h1> },
      {
        path: "signup",
        element: <Signup />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
