import validator from "validator";
import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import * as jose from "jose";

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

  const userWithEmail = await prisma.user.findUnique({
    where: {
      email
    }
  });

  if(userWithEmail) {
    return NextResponse.json({errorMessage: "Email is associated with another account"}, {status: 400})
  }

  const hashedPwd = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      first_name: firstName,
      last_name: lastName,
      password: hashedPwd,
      city,
      phone,
      email
    }
  });

  const alg = "HS256";
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new jose.SignJWT({email: user.email})
    .setProtectedHeader({alg})
    .setExpirationTime('24h')
    .sign(secret)

    // return NextResponse.json({token}, { status: 200 })
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