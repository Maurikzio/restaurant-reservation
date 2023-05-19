import { NextResponse } from "next/server";
import { headers } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

export async function GET(request: Request, response: Response) {
  const headersList = headers();
  const bearerToken = headersList.get("authorization") as string;

  const token = bearerToken.split(" ")[1];

  // we dont have to check if the token exists or not, because we are doing that in the middleware.

  // We are using jwt to decode the token instead of jose this time.
  const payload = jwt.decode(token) as { email: string };

  if (!payload.email) {
    return NextResponse.json(
      { errorMessage: "Unauthorized request" },
      { status: 401 }
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      city: true,
      phone: true,
    },
  });

  // if (!user) {
  //   return NextResponse.json(
  //     { errorMessage: "Unauthorized request" },
  //     { status: 401 }
  //   );
  // }

  return NextResponse.json(
    {
      id: user?.id,
      firstName: user?.first_name,
      lastName: user?.last_name,
      phone: user?.phone,
      city: user?.city,
    },
    { status: 200 }
  );
}
