import axios from "axios";

const useAuth = () => {
  const signIn = async ({ email, password }: {email: string, password: string}) => {
    try {
      const response = await axios.post("http://localhost:3000/api/auth/signin", {
        email, 
        password
      });
    } catch(err) {
      console.log(err);
    }
  };

  const singUp = async () => {

  };

  return {
    signIn,
    singUp
  }
};

export default useAuth;