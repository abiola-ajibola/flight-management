import { Nav } from "../Nav";
import { Outlet } from "react-router-dom";
import { routes } from "@/lib/router";
import { useUserProfileContext } from "@/contexts/auth";

export function Layout() {
  const { isSignedIn } = useUserProfileContext();
  const routes_ = routes.filter((route) =>
    isSignedIn ? route.route !== "/signin" : route
  );
  
  return (
    <div className="mx-8">
      <Nav routes={routes_} />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
