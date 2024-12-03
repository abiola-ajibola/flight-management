import { PropsWithChildren, useState } from "react";
import { ProfileResponse } from "@/lib/api/auth";
import { userProfileContext } from "./authContext";


export function UserProfileProvider({ children }: PropsWithChildren) {
  const [data, setData] = useState<ProfileResponse>({
    email: "",
    id: "",
    name: "",
  });

  return (
    <userProfileContext.Provider value={{ data, setData }}>
      {children}
    </userProfileContext.Provider>
  );
}
