import { useUserProfileContext } from "@/contexts/auth";
import { Link, Outlet } from "react-router-dom";

export function AuthGuard() {
  const { isSignedIn } = useUserProfileContext();

  if (!isSignedIn) {
    console.log({ isSignedIn });
    return (
      <div>
        <h1 className="text-4xl mt-12 mb-8 text-center">Unauthorized</h1>
        <h2 className="text-center">
          Please <Link to="/signin">Sign in</Link> to continue
        </h2>
      </div>
    );
  }

  return (
    <>
      <Outlet />
    </>
  );
}
