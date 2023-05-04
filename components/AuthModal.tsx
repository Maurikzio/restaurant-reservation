"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AuthModalInputs from "./AuthModalInputs";

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
  const [open, setOpen] = useState(false);
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    password: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
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
              <button className="uppercase bg-red-600 w-full text-white p-3 rounded test-sm mb-5 disabled:bg-gray-400">
                {isSignIn ? "Sign In" : "Create Account"}
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default LoginModal;
