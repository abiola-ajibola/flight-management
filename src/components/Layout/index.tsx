import { Nav } from "../Nav";
import { Outlet } from "react-router-dom";
import { routes } from "@/lib/router";

export function Layout() {
  return (
    <div>
      <Nav routes={routes} />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
