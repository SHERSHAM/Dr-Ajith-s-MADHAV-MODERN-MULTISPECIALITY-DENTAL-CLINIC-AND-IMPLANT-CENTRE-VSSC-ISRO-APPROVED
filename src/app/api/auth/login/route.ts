import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, phone, otp, method } = body;

    if (method === "phone") {
      if (!phone || !otp) {
        return NextResponse.json(
          { error: "Phone number and OTP code are required" },
          { status: 400 }
        );
      }

      if (otp !== "123456" && otp !== "111111") {
        return NextResponse.json(
          { error: "Invalid OTP code. Try using '123456' to login." },
          { status: 400 }
        );
      }

      let user = await db.user.findFirst({
        where: { phone },
      });

      if (!user) {
        const mockEmail = `patient-${phone}@madhavdental.com`;
        user = await db.user.findUnique({
          where: { email: mockEmail },
        });

        if (!user) {
          const salt = await bcrypt.genSalt(10);
          const passwordHash = await bcrypt.hash("temporaryPassword", salt);
          user = await db.user.create({
            data: {
              name: `Patient (${phone})`,
              email: mockEmail,
              phone,
              passwordHash,
              role: "PATIENT",
            },
          });
        }
      }

      const token = signToken({
        userId: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
      });

      const response = NextResponse.json({
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
        },
      });

      response.cookies.set("portal_session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });

      return response;
    }

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 400 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 400 }
      );
    }

    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });

    response.cookies.set("portal_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "An internal server error occurred" },
      { status: 500 }
    );
  }
}
