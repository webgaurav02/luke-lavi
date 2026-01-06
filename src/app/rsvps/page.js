"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function RsvpsPage() {
    const [rsvps, setRsvps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");

    useEffect(() => {
        async function fetchRsvps() {
            try {
                const res = await fetch("/api/rsvps");
                const data = await res.json();

                if (!res.ok) throw new Error(data.error || "Failed to fetch RSVPs");

                setRsvps(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchRsvps();
    }, []);

    const fadeUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    // Filter RSVPs based on search input
    const filteredRsvps = rsvps.filter(
        (r) =>
            r.name.toLowerCase().includes(search.toLowerCase()) ||
            (r.guestName && r.guestName.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <main className="bg-[#c9a36a] min-h-screen py-16 px-6">
            <h1 className="text-center font-serif text-5xl mb-2 text-[#6d1221]">RSVP List</h1>

            {/* Total Count */}
            {!loading && !error && rsvps.length > 0 && (
                <p className="text-center text-[#6d1221] font-semibold mb-6 text-lg md:text-xl">
                    Total RSVPs: <span className="font-serif">{rsvps.length}</span>
                </p>
            )}

            {/* Search Bar */}
            {!loading && rsvps.length > 0 && (
                <div className="max-w-md mx-auto mb-8">
                    <input
                        type="text"
                        placeholder="Search by name or guest name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#6d1221] text-[#6d1221] bg-white/40 backdrop-blur-md placeholder-[#6d1221]/70"
                    />
                </div>
            )}

            {loading && (
                <p className="text-center text-[#6d1221] font-semibold">Loading RSVPs...</p>
            )}

            {error && (
                <p className="text-center text-red-700 font-semibold">{error}</p>
            )}

            {!loading && !error && filteredRsvps.length === 0 && (
                <p className="text-center text-[#6d1221] font-semibold">
                    No RSVPs found
                </p>
            )}

            {/* RSVP Cards */}
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
                <AnimatePresence>
                    {filteredRsvps.map((rsvp) => (
                        <motion.div
                            key={rsvp._id}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={fadeUp}
                            className="bg-white/30 backdrop-blur-md rounded-lg shadow-lg p-6 flex flex-col gap-2 text-[#6d1221]"
                        >
                            <p>
                                <span className="font-semibold">Name:</span> {rsvp.name}
                            </p>
                            <p>
                                <span className="font-semibold">Phone:</span> {rsvp.phone}
                            </p>
                            {/* {rsvp.guestName && (
                                <p>
                                    <span className="font-semibold">Guest Name:</span> {rsvp.guestName}
                                </p>
                            )} */}
                            <p className="text-sm text-gray-700 mt-2">
                                Submitted: {new Date(rsvp.createdAt).toLocaleString("en-IN", {
                                    day: "numeric", month: "short", year: "numeric",
                                    hour: "2-digit", minute: "2-digit"
                                })}
                            </p>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </main>
    );
}