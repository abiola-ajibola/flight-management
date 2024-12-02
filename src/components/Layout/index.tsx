import { Nav } from "../Nav";
import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div>
      <Nav />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
