import validator from "validator";
import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import * as jose from "jose";

export async function POST(request: Request, response: Response) {
  const { email, password } = await request.json();
  const errors: string[] = [];

  const validationSchema = [
    {
      valid: validator.isEmail(email),
      errorMessage: "Email in invalid"
    },
    {
      valid: validator.isLength(password, {min: 1}),
      errorMessage: "Password in invalid"
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

  const user = await prisma.user.findUnique({
    where: {
      email
    }
  });

  if(!user) {
    return NextResponse.json({errorMessage: "Email or password in invalid"}, {status: 401})
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if(!isMatch) {
    return NextResponse.json({errorMessage: "Email or password in invalid"}, {status: 401})
  }

  const alg = "HS256";
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new jose.SignJWT({email: user.email})
    .setProtectedHeader({alg})
    .setExpirationTime('24h')
    .sign(secret)

  return NextResponse.json({ 
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    phone: user.phone,
    city: user.city
   }, {
    status: 200,
    headers: {
      'Set-Cookie': `jwt=${token}; Max-Age=8640; Path=/`
    }
  });

}