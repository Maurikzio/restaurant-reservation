import React from "react";

interface Props {
  inputs: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
    password: string;
  };
  handleChangeInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isSignIn: boolean;
}

function AuthModalInputs({ inputs, handleChangeInput, isSignIn }: Props) {
  const { firstName, lastName, email, phone, city, password } = inputs;

  return (
    <div>
      {!isSignIn ? (
        <div className="my-3 flex justify-between text-sm">
          <input
            className="border rounded p-2 py-3 w-[49%]"
            name="firstName"
            onChange={handleChangeInput}
            placeholder="First Name"
            type="text"
            value={firstName}
          />

          <input
            className="border rounded p-2 py-3 w-[49%]"
            name="lastName"
            onChange={handleChangeInput}
            placeholder="Last Name"
            type="text"
            value={lastName}
          />
        </div>
      ) : null}

      <div className="my-3 flex justify-between text-sm">
        <input
          className="border rounded p-2 py-3 w-full"
          name="email"
          onChange={handleChangeInput}
          placeholder="Email"
          type="email"
          value={email}
        />
      </div>

      {!isSignIn ? (
        <div className="my-3 flex justify-between text-sm">
          <input
            className="border rounded p-2 py-3 w-[49%]"
            name="phone"
            onChange={handleChangeInput}
            placeholder="Phone"
            type="text"
            value={phone}
          />
          <input
            className="border rounded p-2 py-3 w-[49%]"
            name="city"
            onChange={handleChangeInput}
            placeholder="City"
            value={city}
            type="text"
          />
        </div>
      ) : null}

      <div className="my-3 flex justify-between text-sm">
        <input
          className="border rounded p-2 py-3 w-full"
          name="password"
          onChange={handleChangeInput}
          type="password"
          placeholder="Password"
          value={password}
        />
      </div>
    </div>
  );
}

export default AuthModalInputs;
