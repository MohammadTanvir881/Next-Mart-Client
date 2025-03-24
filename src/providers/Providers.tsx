"use client";

import UserProvider, { UserContext } from "@/context/userContext";
import { ReactNode, useContext } from "react";
import StoreProvider from "./StoreProvider";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <UserProvider>
      {" "}
      <StoreProvider>{children}</StoreProvider>
    </UserProvider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export default Providers;
