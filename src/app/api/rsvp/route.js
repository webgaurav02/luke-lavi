import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Rsvp from "@/models/Rsvp";

export async function POST(req) {
    try {
        await connectToDB();

        const data = await req.json();

        const { name, phone, guestName } = data;

        if (!name || !phone) {
            return NextResponse.json({ error: "Name and phone are required" }, { status: 400 });
        }

        const newRsvp = new Rsvp({ name, phone, guestName });
        await newRsvp.save();

        return NextResponse.json({ message: "RSVP submitted successfully" }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to submit RSVP" }, { status: 500 });
    }
}