"use client";

import { useState } from "react";

import Image from "next/image";

// Assets
import weddingImg from "@/assets/wedding.jpg";
import lukeAndLavinia from "@/assets/typo/luke_lavinia.svg"

export default function WeddingInvite() {

  const [rsvp, setRsvp] = useState({
    name: "",
    company: "",
    attendance: "",
  });

  return (
    <main className="bg-[#c9a36a] text-[#5a1a24]">
      {/* HERO */}
      <section className="grid md:grid-cols-2 gap-0 min-h-screen">
        <div className="relative w-full h-[60vh] md:h-auto">
          <Image
            src={weddingImg}
            alt="Wedding Couple"
            fill
            className="object-cover"
          />
        </div>

        <div className="bg-[#6d1221] text-white flex flex-col justify-center items-center text-center p-10">
          <h1 className="hidden font-serif text-4xl md:text-5xl mb-4">
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
        </div>
      </section>

      {/* COUNTDOWN */}
      <section className="text-center py-16 px-4 min-h-screen flex flex-col justify-center">
        <h2 className="font-semibold mb-6 text-5xl">It’s our wedding!</h2>
        <p className="text-xl leading-6">Two are better than one…</p>
        <p className="text-xl leading-6">If either of them falls, one can help the other up - Ecclesiastes 4:9–10</p>
        <p className="mb-6 mt-28 text-2xl font-bold">The Wedding begins in…</p>

        <div className="flex justify-center gap-4 flex-wrap">
          {[
            { label: "Days", value: "48" },
            { label: "Hours", value: "4" },
            { label: "Minutes", value: "15" },
            { label: "Seconds", value: "39" },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-white text-[#6d1221] w-24 py-4 rounded shadow"
            >
              <p className="text-2xl font-bold">{item.value}</p>
              <p className="text-xs uppercase">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CEREMONY & RECEPTION */}
      <section className="bg-[#6d1221] text-white py-16 px-6 min-h-screen flex flex-col justify-center ">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 text-center">
          <div>
            <h3 className="font-semibold mb-3 text-4xl">Ceremony</h3>
            <p>Religious ceremony in Grotto Chapel at 1:00 PM</p>
            <p>14th February</p>
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
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-4xl">Reception</h3>
            <p>Garrison Ground</p>
            <p>14th February</p>
            <p>5:00 PM onwards</p>
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
          </div>
        </div>
      </section>

      {/* RSVP */}
      {/* RSVP */}
      <section className="py-16 px-6 text-center min-h-[80svh] flex flex-col justify-center">
        <h3 className="font-semibold mb-4 text-3xl">Confirm Attendance</h3>
        <p className="text-sm mb-8">
          We are delighted to invite you to join us on the happiest days of our lives. Nothing would make us happier than to celebrate this special day surrounded by those we love.
        </p>

        <form
          className="max-w-md mx-auto space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            console.log("RSVP DATA:", rsvp); // process later
          }}
        >
          {/* Attendance */}
          <div className="flex flex-col justify-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="attendance"
                value="yes"
                checked={rsvp.attendance === "yes"}
                onChange={() =>
                  setRsvp({ ...rsvp, attendance: "yes" })
                }
                className="accent-[#6d1221]"
              />
              <span>Will Attend</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="attendance"
                value="maybe"
                checked={rsvp.attendance === "maybe"}
                onChange={() =>
                  setRsvp({ ...rsvp, attendance: "maybe" })
                }
                className="accent-[#6d1221]"
              />
              <span>Maybe</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="attendance"
                value="no"
                checked={rsvp.attendance === "no"}
                onChange={() =>
                  setRsvp({ ...rsvp, attendance: "no" })
                }
                className="accent-[#6d1221]"
              />
              <span>Will Not Attend</span>
            </label>
          </div>

          {/* Name */}
          <input
            type="text"
            placeholder="Your Name"
            value={rsvp.name}
            onChange={(e) =>
              setRsvp({ ...rsvp, name: e.target.value })
            }
            className="w-full p-3 rounded border focus:outline-none focus:ring-2 focus:ring-[#6d1221]"
            required
          />

          {/* Company / +1 */}
          <input
            type="text"
            placeholder="Company / Guests (+1)"
            value={rsvp.company}
            onChange={(e) =>
              setRsvp({ ...rsvp, company: e.target.value })
            }
            className="w-full p-3 rounded border focus:outline-none focus:ring-2 focus:ring-[#6d1221]"
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={!rsvp.attendance}
            className="w-full bg-[#6d1221] text-white py-3 rounded disabled:opacity-50 hover:opacity-90 transition"
          >
            Submit RSVP
          </button>
        </form>
      </section>

      {/* GALLERY */}
      <section className="bg-[#6d1221] py-16 px-6">
        <h3 className="text-white text-4xl font-bold text-center mb-2">
          Our Sweet Love
        </h3>
        <p className="text-white text-center mb-8 max-w-2xl mx-auto">
          Love creates moments that last a lifetime. We are honored to share these unforgettable memories with you.
        </p>

        <div className="relative">
          {/* Slider */}
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 px-2 w-screen mx-auto">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((i) => (
              <div
                key={i}
                className="relative min-w-[80%] sm:min-w-[45%] md:min-w-[30%] h-100 snap-center"
              >
                <Image
                  src={`/gallery/gallery${i}.jpg`}
                  alt="Couple"
                  fill
                  className="object-cover rounded-none"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DRESS CODE */}
      <section className="py-16 px-6 text-center">
        <h3 className="font-semibold mb-6">Dress Code</h3>
        <div className="bg-white inline-block px-10 py-6 rounded shadow">
          <p className="font-medium">Formal / Traditional</p>
          <p className="text-sm mt-2">
            Please avoid white outfits
          </p>
        </div>
      </section>

      {/* GIFTS */}
      <section className="py-12 text-center px-6">
        <h3 className="font-semibold mb-4">Gifts</h3>
        <p className="text-sm max-w-xl mx-auto">
          Your presence is the greatest gift. However, if you wish to bless us,
          we would be truly grateful.
        </p>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#c9a36a] text-center py-10">
        <p className="font-serif text-xl">
          Thank You So Much
        </p>
        <p className="mt-2">Luke & Lavinia</p>
      </footer>
    </main>
  );
}