"use client";

import { useState } from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { FaCheck, FaArrowRight } from "react-icons/fa";
import { MultiSelectField } from "@/components/ui/multi-select";
import { submitContactForm } from "@/db/actions/contact";

const serviceOptions = [
  "Borehole Drilling",
  "Pump Installation",
  "Borehole Rehabilitation",
  "Hydro-fracturing",
  "Geological Survey",
  "Pumping Test",
  "Air Lifting / Developing",
  "Not sure yet",
  "Air Lifting / Developing of Borehole",
];

const inputClasses =
  "w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-[0.95rem] text-neutral-900 placeholder:text-neutral-400 transition-colors focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15";

function Field({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <LabelPrimitive.Root
        htmlFor={id}
        className="text-[0.85rem] font-semibold text-neutral-700"
      >
        {label}
      </LabelPrimitive.Root>
      {children}
    </div>
  );
}

export default function ContactForm() {
  const [service, setService] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("We'll get back to you within 24 hours.");
  const [toastTitle, setToastTitle] = useState("Message sent");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const result = await submitContactForm({
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      location: String(formData.get("location") ?? ""),
      services: service,
      message: String(formData.get("message") ?? ""),
    });

    setSubmitting(false);
    setToastTitle(result.success ? "Message sent" : "Message not sent");
    setToastMessage(result.message);
    setToastOpen(true);

    if (result.success) {
      form.reset();
      setService([]);
    }
  }

  return (
    <ToastPrimitive.Provider swipeDirection="right">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="name" label="Full Name">
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Kwame Mensah"
              className={inputClasses}
            />
          </Field>
          <Field id="phone" label="Phone Number">
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              placeholder="024 000 0000"
              className={inputClasses}
            />
          </Field>
        </div>

        <Field id="email" label="Email Address">
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@email.com"
            className={inputClasses}
          />
        </Field>

        <Field id="location" label="Property Location">
          <input
            id="location"
            name="location"
            type="text"
            required
            placeholder="Town / area, region"
            className={inputClasses}
          />
        </Field>

        <MultiSelectField
          label="Service(s) Needed"
          placeholder="Select one or more services"
          values={service}
          onChange={setService}
          items={serviceOptions}
          name="service"
        />

        <Field id="message" label="Tell us about your water problem">
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder="E.g. no existing borehole yet, land is about half an acre, need water for a small farm..."
            className={`${inputClasses} resize-none`}
          />
        </Field>

        <button
          type="submit"
          disabled={submitting}
          className="mt-2 inline-flex w-fit items-center gap-3 rounded-2xl bg-blue-600 py-1.5 pl-5 pr-1.5 text-base font-medium text-white transition-all duration-300 ease-out hover:bg-blue-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Sending..." : "Send Message"}
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-blue-600">
            <FaArrowRight className="h-3.5 w-3.5" />
          </span>
        </button>
      </form>

      <ToastPrimitive.Root
        open={toastOpen}
        onOpenChange={setToastOpen}
        duration={4000}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white px-5 py-4 shadow-[0_18px_50px_rgba(15,23,42,0.12)] data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out"
      >
        <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-blue-600/10 text-blue-600">
          <FaCheck className="h-3.5 w-3.5" />
        </span>
        <div>
          <ToastPrimitive.Title className="text-[0.92rem] font-semibold text-neutral-900">
            {toastTitle}
          </ToastPrimitive.Title>
          <ToastPrimitive.Description className="text-[0.85rem] text-neutral-500">
            {toastMessage}
          </ToastPrimitive.Description>
        </div>
      </ToastPrimitive.Root>
      <ToastPrimitive.Viewport />
    </ToastPrimitive.Provider>
  );
}