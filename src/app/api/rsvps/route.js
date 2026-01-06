import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Rsvp from "@/models/Rsvp";

export async function GET() {
  try {
    await connectToDB();

    const rsvps = await Rsvp.find().sort({ createdAt: -1 }); // latest first

    return NextResponse.json(rsvps, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch RSVPs" }, { status: 500 });
  }
}