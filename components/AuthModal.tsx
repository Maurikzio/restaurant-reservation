"use client";

import React, { useEffect, useState, useContext } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import AuthModalInputs from "./AuthModalInputs";
import useAuth from "@/hooks/useAuth";
import { AuthenticationContext } from "@/app/context/AuthContext";
import { Alert, CircularProgress } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

interface Props {
  isSignIn: boolean;
}

function LoginModal({ isSignIn }: Props) {
  const { data, error, loading, setAuthState } = useContext(
    AuthenticationContext
  );
  const [open, setOpen] = useState(false);
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    password: "",
  });
  const [disabled, setDisabled] = useState(true);
  const { signIn } = useAuth();

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setAuthState((prevState) => ({
      data: prevState.data,
      error: null,
      loading: false,
    }));
    setInputs({
      ...inputs,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      city: "",
      password: "",
    });
    setOpen(false);
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    if (isSignIn) {
      if (inputs.password && inputs.email) {
        setDisabled(false);
      }
    } else {
      if (
        inputs.firstName &&
        inputs.lastName &&
        inputs.email &&
        inputs.email &&
        inputs.password &&
        inputs.city
      ) {
        setDisabled(false);
      }
    }
  }, [inputs]);

  const handleClick = () => {
    if (isSignIn) {
      signIn({ email: inputs.email, password: inputs.password });
    }
  };

  return (
    <div>
      <button
        onClick={handleOpen}
        className={`${
          isSignIn ? "bg-blue-400 text-white" : ""
        } border p-1 px-4 rounded mr-3`}
      >
        {isSignIn ? "Sign In" : "Sign Up"}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {loading ? (
            <div className="p-2 h-[600px] flex justify-center items-center">
              <CircularProgress className="text-red-600" />
            </div>
          ) : (
            <div className="p-2 h-[600px]">
              <div className="uppercase font-bold text-center pb-2 border-b mb-2">
                <p className="text-sm">{isSignIn ? "Sign In" : "Sign Up"}</p>
              </div>
              <div className="m-auto">
                <h2 className="text-2xl font-light text-center">
                  {isSignIn ? "Log Into Your Account" : "Create Account"}
                </h2>
                <AuthModalInputs
                  inputs={inputs}
                  handleChangeInput={handleChangeInput}
                  isSignIn={isSignIn}
                />
                <button
                  className="uppercase bg-red-600 w-full text-white p-3 rounded test-sm mb-5 disabled:bg-gray-400"
                  disabled={disabled}
                  onClick={handleClick}
                >
                  {isSignIn ? "Sign In" : "Create Account"}
                </button>
              </div>
              {error ? <Alert severity="error">{error}</Alert> : null}
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}

export default LoginModal;
