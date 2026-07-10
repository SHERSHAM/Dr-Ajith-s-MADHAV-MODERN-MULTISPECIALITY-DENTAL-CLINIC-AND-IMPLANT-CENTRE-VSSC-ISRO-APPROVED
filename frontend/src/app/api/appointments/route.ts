import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const session = getSession(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const appointments = await db.appointment.findMany({
      where: { userId: session.userId },
      include: { invoices: true },
      orderBy: [
        { date: "desc" },
        { time: "asc" }
      ]
    });

    return NextResponse.json({ success: true, appointments });
  } catch (error: any) {
    console.error("Fetch appointments error:", error);
    return NextResponse.json(
      { error: "An internal server error occurred" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = getSession(req);
    const body = await req.json();
    const { doctorId, doctorName, date, time, reason, notes, guestDetails } = body;

    if (!doctorId || !doctorName || !date || !time) {
      return NextResponse.json(
        { error: "Doctor, date, and time slot are required" },
        { status: 400 }
      );
    }

    let userId = session?.userId;

    // Handle guest checkout / booking: create user account if missing
    if (!userId) {
      if (!guestDetails || !guestDetails.email || !guestDetails.name) {
        return NextResponse.json(
          { error: "Login session expired. Please provide your name and email to proceed as guest." },
          { status: 400 }
        );
      }

      let guestUser = await db.user.findUnique({
        where: { email: guestDetails.email },
      });

      if (!guestUser) {
        // Auto-register guest account
        const bcrypt = require("bcryptjs");
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(guestDetails.phone || "patient123", salt);
        
        guestUser = await db.user.create({
          data: {
            name: guestDetails.name,
            email: guestDetails.email,
            phone: guestDetails.phone || null,
            passwordHash,
            role: "PATIENT",
          },
        });
      }
      userId = guestUser.id;
    }

    const appointment = await db.appointment.create({
      data: {
        userId,
        doctorId,
        doctorName,
        date,
        time,
        reason: reason || null,
        notes: notes || null,
        status: "PENDING",
        invoices: {
          create: {
            amount: 500,
            status: "UNPAID",
          }
        }
      },
      include: {
        invoices: true
      }
    });

    return NextResponse.json({ success: true, appointment });
  } catch (error: any) {
    console.error("Create appointment error:", error);
    return NextResponse.json(
      { error: "An internal server error occurred" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = getSession(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { id, status } = body; // status e.g., 'CANCELLED'

    if (!id || !status) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const appointment = await db.appointment.update({
      where: { 
        id,
        userId: session.userId 
      },
      data: { status }
    });

    return NextResponse.json({ success: true, appointment });
  } catch (error: any) {
    console.error("Update appointment error:", error);
    return NextResponse.json(
      { error: "An internal server error occurred" },
      { status: 500 }
    );
  }
}
