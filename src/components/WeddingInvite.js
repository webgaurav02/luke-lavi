"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRef } from "react";

import {
    Playfair_Display,
} from 'next/font/google';

const playfair = Playfair_Display({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-playfair',
});


import Image from "next/image";

import { motion, AnimatePresence } from "framer-motion";

// Assets
import weddingImg from "@/assets/wedding.jpg";
import lukeAndLavinia from "@/assets/typo/luke_lavinia.svg"
import lukeAndLaviniaMaroon from "@/assets/typo/luke_lavinia_maroon.svg"
import lukeAndLaviniaWide from "@/assets/typo/luke_lavinia_wide.svg"
import dressCode from "@/assets/dress_code.svg";

export default function WeddingInvite() {

    const audioRef = useRef(null);
    useEffect(() => {
        const audio = new Audio("/audio/wedding-music.mp3");
        audio.loop = true;
        audio.volume = 0.6; // ≤ 0.6 ✅

        audioRef.current = audio;
    }, []);

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const [isOpened, setIsOpened] = useState(false);

    const searchParams = useSearchParams();
    const guestName = searchParams.get("guest") || "Friend";

    const [successMessage, setSuccessMessage] = useState("");

    const [rsvp, setRsvp] = useState({
        name: "",
        phone: "",
    });

    // Target date: 14 Feb 2026, 1:00 PM IST
    const weddingDate = new Date("2026-02-14T13:01:00+05:30");

    const [timeLeft, setTimeLeft] = useState({
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const diff = weddingDate - now;

            if (diff <= 0) {
                clearInterval(interval);
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            setTimeLeft({
                days: String(days).padStart(2, "0"),
                hours: String(hours).padStart(2, "0"),
                minutes: String(minutes).padStart(2, "0"),
                seconds: String(seconds).padStart(2, "0"),
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const fadeUp = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" },
        },
    };

    const fadeIn = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 1 },
        },
    };

    const staggerContainer = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const imageVariant = {
        hidden: { opacity: 0, y: 24 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1, ease: "easeOut" },
        },
    };

    const playMusicSoftly = () => {
        if (!audioRef.current) return;

        const audio = audioRef.current;
        audio.volume = 0;
        audio.play();

        let vol = 0;
        const fade = setInterval(() => {
            vol += 0.05;
            if (vol >= 0.6) {
                audio.volume = 0.6;
                clearInterval(fade);
            } else {
                audio.volume = vol;
            }
        }, 200);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/rsvp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...rsvp, guestName }),
            });

            const result = await res.json();

            if (!res.ok) throw new Error(result.error || "Something went wrong");

            setSuccessMessage("We’re so happy you’ll be with us! Counting down the days until the celebration 🥂");
            setRsvp({ name: "", phone: "" });

            // Hide message after 5 seconds
            setTimeout(() => setSuccessMessage(""), 5000);

        } catch (err) {
            setSuccessMessage(err.message);
            setTimeout(() => setSuccessMessage(""), 5000);
        }
    }


    const toTitleCase = (str) => {
        return str.replace(
            /\w\S*/g,
            text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
        );
    }


    const InvitationCover = ({ onOpen }) => (
        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="fixed inset-0 z-999 bg-[#b08d57] flex flex-col items-center justify-center text-center"
        >
            <p className="text-white text-4xl mt-6">
                Dear <span className="font-semibold">{toTitleCase(guestName)}</span>,
            </p>
            <p className="mt-2  text-lg text-white font-normal md:mb-20 mb-10 md:max-w-7xl max-w-[60svw]">
                With joyful hearts, we invite you to witness our forever
            </p>
            <Image
                src={lukeAndLaviniaWide}
                alt="Luke and Lavinia"
                width='0'
                height='0'
                sizes="100svw"
                className="md:block hidden w-[50%] h-auto mb-20"
            />
            <Image
                src={lukeAndLavinia}
                alt="Luke and Lavinia"
                width='0'
                height='0'
                sizes="100svw"
                className="md:hidden block w-[70%] h-auto mb-20"
            />

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onOpen}
                className="bg-[#6d1221] text-white px-8 py-3 rounded-full tracking-widest text-sm shadow-lg"
            >
                OPEN INVITATION
            </motion.button>
        </motion.div>
    );

    if (!mounted) return null;

    return (
        <>

            {/* <AnimatePresence mode="wait"> */}
            {!isOpened && (
                <InvitationCover
                    key="invite-cover"
                    onOpen={() => {
                        setIsOpened(true);
                        localStorage.setItem("inviteOpened", "true");
                        playMusicSoftly();
                    }}

                />
            )}
            {/* </AnimatePresence> */}


            {isOpened && (
                <main className=" bg-[#5a1a24] text-[#5a1a24] w-screen overflow-x-hidden">
                    {/* HERO */}
                    <section className="grid md:grid-cols-2 gap-0 min-h-screen">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={fadeIn}
                            delay={0.9}
                            className="relative w-full h-[60vh] md:h-auto"
                        >
                            <Image
                                src={weddingImg}
                                alt="Wedding Couple"
                                fill
                                className="object-cover"
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1 }}
                            className="bg-[#6d1221] text-white flex flex-col justify-center items-center text-center p-10"
                        >
                            <h1 className="hidden  text-4xl md:text-5xl mb-4">
                                Luke <br /> & Lavinia
                            </h1>
                            <Image
                                src={lukeAndLavinia}
                                alt="Luke and Lavinia"
                                width='0'
                                height='0'
                                sizes="100svw"
                                className="w-[50%] h-auto"
                            />
                            <p className="tracking-widest text-lg mt-15">14.02.2026</p>
                        </motion.div>
                    </section>

                    {/* COUNTDOWN */}
                    <motion.section
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="text-center py-16 bg-[#c9a36a] min-h-screen flex flex-col justify-center md:px-0 px-5"
                    >
                        <Image
                            src='/icons/Untitled-2-02.svg'
                            alt="Wedding Cake"
                            height='0'
                            width='0'
                            sizes="100svw"
                            className="w-auto md:h-[25svh] h-[25svh] mx-auto mb-5"
                        />
                        <motion.h2 variants={fadeUp} whileInView="visible" viewport={{ once: true }} className="font-semibold mb-6 text-5xl">It’s our wedding!</motion.h2>
                        <p className={`text-xl leading-6 ${playfair.className}`}>Two are better than one…</p>
                        <p className={`text-xl leading-6 px-10 ${playfair.className}`}>If either of them falls, one can help the other up <br /> <span className="text-sm">~ Ecclesiastes 4:9–10</span></p>
                        <p className="mb-6 mt-28 text-2xl font-bold">The Wedding begins in…</p>

                        <div className="flex justify-center gap-4 flex-wrap">
                            {[
                                { label: "Days", value: timeLeft.days },
                                { label: "Hours", value: timeLeft.hours },
                                { label: "Minutes", value: timeLeft.minutes },
                                // { label: "Seconds", value: timeLeft.seconds },
                            ].map((item) => (
                                <motion.div
                                    key={item.label}
                                    variants={fadeUp}
                                    className="bg-none text-[#6d1221] w-fit py-4 "
                                >
                                    <motion.p
                                        key={item.value}
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ duration: 0.4 }}
                                        className="md:text-9xl text-5xl font-bold mx-5"
                                    >
                                        {item.value}
                                    </motion.p>
                                    <p className="md:text-xl text-sm uppercase">{item.label}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>

                    {/* GALLERY */}
                    <motion.section
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                        className="bg-[#6d1221] py-16 px-6 max-w-screen overflow-x-hidden"
                    >
                        <div className="flex flex-row justify-center items-center gap-0">
                            <Image
                                src='/icons/Untitled-2-01.svg'
                                alt="Wedding Rings"
                                height='0'
                                width='0'
                                sizes="100svh"
                                className="md:w-20 w-12 md:h-20 h-12 md:mb-4 mb-2 mr-3"
                            />
                            <h3 className="text-white text-4xl font-bold text-left mb-2">
                                Our Sweet Love
                            </h3>
                        </div>
                        <p className={`text-white font-light text-center mb-8 max-w-2xl mx-auto ${playfair.className}`}>
                            Love creates moments that last a lifetime. We are honored to share these unforgettable memories with you.
                        </p>


                        <div className="relative">
                            {/* Slider */}
                            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar pb-4 px-2 w-screen mx-auto pr-16">
                                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8 }}
                                        className="relative min-w-[90%] sm:min-w-[45%] md:min-w-[30%] md:h-160 h-120 snap-center"
                                    >
                                        <Image
                                            src={`/gallery/gallery${i}.jpg`}
                                            alt="Couple"
                                            fill
                                            className="object-cover rounded-none"
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.section>

                    {/* RSVP */}
                    <motion.section
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        className="py-16 md:px-0 px-10 text-center bg-[#c9a36a] min-h-[80svh] flex flex-col justify-center"
                    >
                        <Image
                            src='/icons/wine-glasses.svg'
                            alt="Wedding Cake"
                            height='0'
                            width='0'
                            sizes="100svw"
                            className="w-auto md:h-[25svh] h-[25svh] mx-auto mb-5"
                        />
                        {!successMessage && <h3 className="font-semibold mb-4 text-3xl">Confirm Attendance</h3>}
                        {!successMessage && <p className={`text-sm mb-8 max-w-2xl mx-auto ${playfair.className}`}>
                            We are delighted to invite you to join us on one of the happiest days of our lives.
                            Nothing would make us happier than celebrating this special day with you.
                        </p>}

                        <AnimatePresence>
                            {!successMessage && (
                                <form
                                    className="max-w-md mx-auto space-y-6"
                                    onSubmit={handleSubmit}
                                >
                                    {/* Name */}
                                    <input
                                        type="text"
                                        placeholder="Your Name"
                                        value={rsvp.name}
                                        onChange={(e) =>
                                            setRsvp({ ...rsvp, name: e.target.value })
                                        }
                                        className="w-full p-3 rounded border focus:outline-none focus:ring-2 focus:ring-[#6d1221] transition-all focus:scale-[1.01]"
                                        required
                                    />

                                    {/* Phone Number */}
                                    <input
                                        type="tel"
                                        placeholder="Phone Number"
                                        value={rsvp.phone}
                                        onChange={(e) =>
                                            setRsvp({ ...rsvp, phone: e.target.value })
                                        }
                                        className="w-full p-3 rounded border focus:outline-none focus:ring-2 focus:ring-[#6d1221] transition-all focus:scale-[1.01]"
                                        required
                                    />

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        className="w-full bg-[#6d1221] text-white py-3 rounded hover:opacity-90 transition"
                                    >
                                        Submit RSVP
                                    </button>
                                </form>
                            )}
                        </AnimatePresence>
                        <AnimatePresence>
                            {successMessage && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.5 }}
                                    className="text-sm mb-8 max-w-2xl mx-auto"
                                >
                                    {successMessage}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.section>

                    {/* CEREMONY & RECEPTION */}
                    <section className="bg-[#6d1221] text-white py-16 px-6 min-h-[60svh] flex flex-col justify-center ">
                        <div className="max-w-5xl mx-auto grid md:grid-cols-2 md:gap-36 gap-10 text-center">
                            <motion.div
                                initial={{ opacity: 0, x: -40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <div className="flex flex-row justify-center items-center gap-0 -ml-6">
                                    <Image
                                        src='/icons/ceremony.svg'
                                        alt="Ceremony"
                                        height='0'
                                        width='0'
                                        sizes="100svh"
                                        className="md:w-16 w-16 md:h-16 h-16 md:mb-4 mb-4 mr-1"
                                    />
                                    <h3 className="font-semibold mb-3 text-4xl">Ceremony</h3>
                                </div>
                                <p>Religious ceremony<br />in Grotto Chapel</p>
                                {/* <p>14th February</p> */}
                                <p>1:00 PM</p>
                                <div className="mt-6 w-full max-w-sm mx-auto">
                                    <div className="relative aspect-square w-full overflow-hidden rounded-lg border border-white/20 shadow-lg hover:shadow-xl transition">
                                        <iframe
                                            className="absolute inset-0 w-full h-full"
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4648.844822279911!2d91.88905907632365!3d25.56815097747407!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x37507ebd35fdba2b%3A0xdff8f698878a1c8d!2sGrotto%20Chapel!5e0!3m2!1sen!2sin!4v1767597070538"
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                        />
                                    </div>
                                </div>
                                <a
                                    href="https://www.google.com/maps/dir/?api=1&destination=25.568070104437144,91.89164639022468"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-4 inline-block border px-6 py-2 rounded text-sm hover:bg-white hover:text-[#6d1221] transition"
                                >
                                    Get Directions
                                </a>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <div className="flex flex-row justify-center items-center gap-0 -ml-6">
                                    <Image
                                        src='/icons/reception.svg'
                                        alt="Reception"
                                        height='0'
                                        width='0'
                                        sizes="100svh"
                                        className="md:w-20 w-16 md:h-20 h-16 md:mb-4 mb-4 mr-3"
                                    />
                                    <h3 className="font-semibold mb-3 text-4xl">Reception</h3>
                                </div>
                                <p>Garrison Ground</p>
                                {/* <p>14th February</p> */}
                                <p>5:00 PM onwards</p><br />
                                <div className="mt-6 w-full max-w-sm mx-auto">
                                    <div className="relative aspect-square w-full overflow-hidden rounded-lg border border-white/20 shadow-lg hover:shadow-xl transition">
                                        <iframe
                                            className="absolute inset-0 w-full h-full"
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4648.86699557986!2d91.87652327632368!3d25.56757977747441!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x37507e8562e7798f%3A0x402d6805c4dc4151!2sGarrison%20Ground!5e0!3m2!1sen!2sin!4v1767597096587!5m2!1sen!2sin"
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                        />
                                    </div>
                                </div>
                                <a
                                    href="https://www.google.com/maps/dir/?api=1&destination=25.569355069199588,91.87811017998635"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-4 inline-block border px-6 py-2 rounded text-sm hover:bg-white hover:text-[#6d1221] transition"
                                >
                                    Get Directions
                                </a>
                            </motion.div>
                        </div>
                    </section>

                    {/* DRESS CODE */}
                    {/* <section className="py-16 px-6 text-center bg-[#c9a36a]">
                        <h3 className="font-semibold mb-6">Dress Code</h3>
                        <div className="bg-white inline-block px-10 py-6 rounded shadow">
                            <Image
                                src={dressCode}
                                alt="Dress Code"
                                width='0'
                                height='0'
                                sizes="100svw"
                                className="mx-auto"
                            />
                            <p className="text-sm mt-2">
                                Guidelines about the event dresscode
                            </p>
                        </div>
                    </section> */}

                    {/* GIFTS */}
                    <section className="py-12 text-center px-6 bg-[#6d1221] text-[#c9a36a]">
                        <div className="flex flex-row justify-center items-center gap-0 -ml-6">
                            <Image
                                src='/icons/gifts.svg'
                                alt="Gifts"
                                height='0'
                                width='0'
                                sizes="100svh"
                                className="md:w-20 w-12 md:h-20 h-12 md:mb-4 mb-2 mr-3"
                            />
                            <h3 className="font-semibold text-4xl">Gifts</h3>
                        </div>
                        <p className={`text-sm max-w-xl mx-auto ${playfair.className}`}>
                            Your presence is the greatest gift. Should you wish to offer a token of blessing, an envelope is appreciated
                        </p>
                    </section>

                    {/* FOOTER */}
                    <motion.footer
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="bg-[#c9a36a] text-center py-10"
                    >
                        <p className=" text-xl">
                            Thank You So Much
                        </p>
                        <Image
                            src={lukeAndLaviniaMaroon}
                            alt="Luke and Lavinia"
                            width='0'
                            height='0'
                            sizes="100svw"
                            className="md:w-[15%] w-[50%] h-auto mx-auto mt-10"
                        />
                    </motion.footer>
                </main>
            )}
        </>
    );
}