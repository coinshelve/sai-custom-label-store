"use client";

import { useState } from "react";

export function ContactForm({ whatsappNumber }: { whatsappNumber: string }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = `Hi, I'm ${name}. ${message}`;
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-12 max-w-lg space-y-4">
      <h2 className="text-lg font-semibold text-stone-900">
        Send a quick message
      </h2>
      <p className="text-xs text-stone-500">
        This opens WhatsApp with your message pre-filled — no account needed.
      </p>
      <input
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
        className="w-full rounded border border-stone-300 px-3 py-2 text-sm"
      />
      <textarea
        required
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="What do you need printed?"
        rows={4}
        className="w-full rounded border border-stone-300 px-3 py-2 text-sm"
      />
      <button
        type="submit"
        className="rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
      >
        Send via WhatsApp
      </button>
    </form>
  );
}
