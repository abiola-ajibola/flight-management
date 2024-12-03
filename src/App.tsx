import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { router } from "./lib/router";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { UserProfileProvider } from "./contexts/auth";

function App() {
  return (
    <>
      <UserProfileProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </UserProfileProvider>
    </>
  );
}

export default App;
