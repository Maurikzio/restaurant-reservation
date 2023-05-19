import { AuthenticationContext } from "@/app/context/AuthContext";
import axios from "axios";
import { removeCookies } from "cookies-next";
import { useContext } from "react";

interface AuthProps {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  city: string;
  phone: string;
}

const useAuth = () => {
  const { data, error, loading, setAuthState } = useContext(AuthenticationContext);

  const signIn = async (
    { email, password }: Pick<AuthProps, 'email' | 'password'>,
    cb: () => void) => {

    setAuthState({
      data: null,
      error: null,
      loading: true,
    })
    try {
      const response = await axios.post("http://localhost:3000/api/auth/signin", {
        email,
        password
      });
      setAuthState({
        data: response.data,
        error: null,
        loading: false,
      })
      cb();
    } catch (err: any) {
      setAuthState({
        data: null,
        error: err.response.data.errorMessage,
        loading: false,
      })
    }
  };

  const signUp = async (
    { email, password, firstName, lastName, city, phone }: AuthProps,
    cb: () => void) => {

    setAuthState({
      data: null,
      error: null,
      loading: true,
    })
    try {
      const response = await axios.post("http://localhost:3000/api/auth/signup", {
        email,
        password,
        firstName,
        lastName,
        city,
        phone,
      });
      setAuthState({
        data: response.data,
        error: null,
        loading: false,
      })
      cb();
    } catch (err: any) {
      setAuthState({
        data: null,
        error: err.response.data.errorMessage,
        loading: false,
      })
    }
  };

  const signOut = () => {
    removeCookies('jwt');
    setAuthState({
      data: null,
      error: null,
      loading: false,
    })
  }

  return {
    signIn,
    signUp,
    signOut
  }
};

export default useAuth;