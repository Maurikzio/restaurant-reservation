"use client";

import React, { createContext, useState } from "react";

interface Props {
  children: React.ReactNode;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  phone: string;
}

interface State {
  loading: boolean;
  error: string | null;
  data: User | null;
}

interface Auth extends State {
  setAuthState: React.Dispatch<React.SetStateAction<State>>;
}

export const AuthenticationContext = createContext<Auth>({
  loading: false,
  error: null,
  data: null,
  setAuthState: () => {},
});

const AuthContext: React.FunctionComponent<Props> = ({ children }) => {
  const [authState, setAuthState] = useState<State>({
    loading: false,
    error: "I am an error",
    data: null,
  });

  return (
    <AuthenticationContext.Provider value={{ ...authState, setAuthState }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthContext;
