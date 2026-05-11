"use client";

import { useState } from "react";

export default function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: wire up to an email service (Resend, Formspree, etc.)
    setSent(true);
  }

  return (
    <section id="contact" className="py-32 px-6 max-w-6xl mx-auto">
      <div className="max-w-xl">
        <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-medium leading-tight mb-4">
          Let's talk
        </h2>
        <p className="text-[16px] text-neutral-500 mb-12">
          Have a project in mind or just want to say hi? I'm always happy to chat.
        </p>

        {sent ? (
          <div className="rounded-2xl bg-neutral-900 border border-neutral-700 px-8 py-10 text-center">
            <p className="text-[18px] font-medium text-[#f4f4f4] mb-2">Message sent 🎉</p>
            <p className="text-[14px] text-neutral-400">I'll get back to you within a day or two.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-[13px] font-medium text-neutral-400">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Your name"
                className="rounded-xl border border-neutral-700 bg-transparent px-4 py-3 text-[15px] text-[#f4f4f4] outline-none focus:border-[#a1ff62] transition-colors placeholder:text-neutral-600"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-[13px] font-medium text-neutral-400">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="rounded-xl border border-neutral-700 bg-transparent px-4 py-3 text-[15px] text-[#f4f4f4] outline-none focus:border-[#a1ff62] transition-colors placeholder:text-neutral-600"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="text-[13px] font-medium text-neutral-400">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="What's on your mind?"
                className="rounded-xl border border-neutral-700 bg-transparent px-4 py-3 text-[15px] text-[#f4f4f4] outline-none focus:border-[#a1ff62] transition-colors placeholder:text-neutral-600 resize-none"
              />
            </div>

            <button
              type="submit"
              className="self-start bg-white text-black text-[15px] font-medium rounded-full px-6 py-3 hover:bg-neutral-200 transition-colors"
            >
              Send message
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
