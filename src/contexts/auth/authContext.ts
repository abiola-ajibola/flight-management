import { auth, ProfileResponse } from "@/lib/api/auth";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
} from "react";

export const userProfileContext = createContext<{
  data: ProfileResponse;
  setData: Dispatch<SetStateAction<ProfileResponse>>;
}>({
  data: { id: "", email: "", name: "" },
  setData: () => {},
});

export function useUserProfileContext() {
  const { data, setData } = useContext(userProfileContext);

  useEffect(() => {
    const runEffects = async () => {
      const { data, status } = await auth.getMe();
      if (status == 200) {
        setData(data as ProfileResponse);
        return;
      }
      setData({ id: "", email: "", name: "" });
    };
    runEffects();
  }, [setData]);
  console.log({ data });

  return { data, isSignedIn: !!data.email, setData };
}
