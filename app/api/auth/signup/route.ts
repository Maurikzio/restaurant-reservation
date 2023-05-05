import validator from "validator";
import { NextResponse } from 'next/server';

export async function POST(request: Request, response: Response) {

  const { firstName, lastName, email, phone, city, password } = await request.json();

  const errors: string[] = [];

  const validationSchema = [
    {
      valid: validator.isLength(firstName, { min: 1, max: 20 }),
      errorMessage: "Firstname is invalid",
    },
    {
      valid: validator.isLength(lastName, { min: 1, max: 20 }),
      errorMessage: "Lastname is invalid",
    },
    {
      valid: validator.isEmail(email),
      errorMessage: "Email is invalid",
    },
    {
      valid: validator.isMobilePhone(phone),
      errorMessage: "Phone is invalid",
    },
    {
      valid: validator.isLength(city, { min: 1, max: 20 }),
      errorMessage: "City is invalid",
    },
    {
      valid: validator.isStrongPassword(password),
      errorMessage: "Password is not strong enough",
    }
  ];

  validationSchema.forEach(check => {
    if(!check.valid) {
      errors.push(check.errorMessage)
    }
  });

  if(errors.length) {
    return NextResponse.json({errorMessage: errors[0]}, {status: 400})
  }


  return new Response("Hello there", {
    status: 200,
  })
}