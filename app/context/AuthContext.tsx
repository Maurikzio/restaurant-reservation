"use client";
import axios from "axios";
import { getCookie } from "cookies-next";
import React, { createContext, useEffect, useState } from "react";

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
  loading: true,
  error: null,
  data: null,
  setAuthState: () => {},
});

const AuthContext: React.FunctionComponent<Props> = ({ children }) => {
  const [authState, setAuthState] = useState<State>({
    loading: true,
    error: null,
    data: null,
  });

  const fetchUser = async () => {
    setAuthState({
      data: null,
      error: null,
      loading: true,
    });
    try {
      const jwt = getCookie("jwt");
      if (!jwt) {
        setAuthState({
          data: null,
          error: null,
          loading: false,
        });
        return; //TODO: check this, it can solve the alway call /me
      }
      const response = await axios.get("http://localhost:3000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      // ensure that after this request all the subsequence requests will have an specific header, Authorization in this case
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

      setAuthState({
        data: response.data,
        error: null,
        loading: false,
      });
    } catch (err: any) {
      //TODO: check this, it can solve the alway call /me
      // setAuthState({
      //   data: null,
      //   error: err.response.data.errorMessage,
      //   loading: false,
      // });
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthenticationContext.Provider value={{ ...authState, setAuthState }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthContext;
