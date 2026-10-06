"use client";

import { useState } from "react";
import * as Select from "@radix-ui/react-select";
import * as RadioGroup from "@radix-ui/react-radio-group";
import * as Checkbox from "@radix-ui/react-checkbox";
import { FaChevronDown, FaCheck, FaArrowRight } from "react-icons/fa";
import { MultiSelectField } from "@/components/ui/multi-select";
import { useToast } from "@/components/ui/toast";

const REGIONS = [
  "Greater Accra",
  "Ashanti",
  "Western",
  "Central",
  "Eastern",
  "Volta",
  "Northern",
  "Bono",
  "Bono East",
  "Upper East",
  "Upper West",
  "Ahafo",
  "Savannah",
  "North East",
  "Oti",
  "Western North",
];

const SERVICES = [
  "New Borehole Drilling",
  "Pump Installation",
  "Borehole Rehabilitation",
  "Hydro-fracturing",
  "Geological Survey Only",
  "Water Treatment",
  "Air Lifting / Developing of Borehole",
  "Water Quality Analysis",
  "Not Sure Yet",
];

const PROPERTY_TYPES = [
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
  { value: "institutional", label: "Institutional" },
  { value: "agricultural", label: "Agricultural" },
];

const CONTACT_METHODS = [
  { value: "call", label: "Phone Call" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "email", label: "Email" },
];

const inputClasses =
  "w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-[0.92rem] text-neutral-900 placeholder:text-neutral-400 outline-none transition-colors focus:border-blue-600 focus:ring-2 focus:ring-blue-600/15";

interface FormState {
  name: string;
  phone: string;
  email: string;
  region: string;
  service: string[];
  propertyType: string;
  contactMethod: string;
  message: string;
  consent: boolean;
}

const initialForm: FormState = {
  name: "",
  phone: "",
  email: "",
  region: "",
  service: [],
  propertyType: "residential",
  contactMethod: "call",
  message: "",
  consent: false,
};

function FieldSelect({
  label,
  placeholder,
  value,
  onChange,
  items,
  error,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  items: string[];
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[0.85rem] font-semibold text-neutral-700">{label}</label>
      <Select.Root value={value} onValueChange={onChange}>
        <Select.Trigger
          className={`flex w-full items-center justify-between rounded-xl border border-neutral-300 bg-white px-4 py-3 text-[0.92rem] outline-none focus:ring-2 focus:ring-blue-600/15 focus:border-blue-600 ${
            value ? "text-neutral-900" : "text-neutral-400"
          }`}
        >
          <Select.Value placeholder={placeholder} />
          <Select.Icon>
            <FaChevronDown className="h-2.5 w-2.5 text-neutral-400" />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            position="popper"
            sideOffset={8}
            className="z-50 w-(--radix-select-trigger-width) overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-xl max-h-72"
          >
            <Select.Viewport className="p-1.5">
              {items.map((item) => (
                <Select.Item
                  key={item}
                  value={item}
                  className="flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2 text-[0.88rem] text-neutral-800 outline-none data-highlighted:bg-blue-600/10 data-highlighted:text-blue-600"
                >
                  <Select.ItemText>{item}</Select.ItemText>
                  <Select.ItemIndicator>
                    <FaCheck className="h-2.5 w-2.5 text-blue-600" />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

export default function QuoteForm() {
  const { showToast } = useToast();
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [isPending, setIsPending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function validate() {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.phone.trim()) next.phone = "Please enter a phone number we can reach you on.";
    if (!form.region) next.region = "Please select your region.";
    if (form.service.length === 0) next.service = "Please select at least one service.";
    if (form.contactMethod === "email" && !form.email.trim()) next.email = "Please enter an email address when email is your preferred contact method.";
    if (!form.consent) next.consent = "Please confirm you're okay with us contacting you.";
    return next;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) {
      showToast({
        title: "Missing a few details",
        description: "Please fill in the highlighted fields before submitting.",
        variant: "error",
      });
      return;
    }

    setIsPending(true);
    // Placeholder for a real API call / server action, e.g.:
    // await submitQuoteRequest(form);
    await new Promise((r) => setTimeout(r, 800));
    setIsPending(false);
    setSubmitted(true);
    showToast({
      title: "Request received",
      description: "We'll reach out within 24 hours to schedule your free survey.",
      variant: "success",
    });
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600/10">
          <FaCheck className="h-5 w-5 text-blue-600" />
        </div>
        <h3 className="font-display text-xl font-semibold text-neutral-900">
          Thanks, {form.name.split(" ")[0]}. We&apos;ve got it.
        </h3>
        <p className="max-w-sm text-[0.92rem] leading-relaxed text-neutral-500">
          A member of our team will reach out within 24 hours to schedule your
          free site survey. No payment, no obligation — just a straight
          answer about your land.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className="text-[0.85rem] font-semibold text-neutral-700">Full Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="e.g., Kwame Asante"
            disabled={isPending}
            maxLength={100}
            className={inputClasses}
          />
          {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[0.85rem] font-semibold text-neutral-700">Phone Number</label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="e.g., +233 24 000 0000"
            disabled={isPending}
            maxLength={30}
            className={inputClasses}
          />
          {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[0.85rem] font-semibold text-neutral-700">
          Email <span className="text-neutral-400 font-normal">(optional)</span>
        </label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          placeholder="e.g., you@example.com"
          disabled={isPending}
          maxLength={120}
          className={inputClasses}
        />
        {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FieldSelect
          label="Region"
          placeholder="Select your region"
          value={form.region}
          onChange={(v) => update("region", v)}
          items={REGIONS}
          error={errors.region}
        />
        <MultiSelectField
          label="What Do You Need?"
          placeholder="Select one or more services"
          values={form.service}
          onChange={(v) => update("service", v)}
          items={SERVICES}
          error={errors.service}
          exclusiveItems={["Not Sure Yet"]}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[0.85rem] font-semibold text-neutral-700">Property Type</label>
        <RadioGroup.Root
          value={form.propertyType}
          onValueChange={(v) => update("propertyType", v)}
          className="flex flex-wrap gap-2"
        >
          {PROPERTY_TYPES.map((p) => (
            <RadioGroup.Item
              key={p.value}
              value={p.value}
              className="rounded-full border border-neutral-300 bg-white px-4 py-2 text-[0.82rem] font-medium text-neutral-500 outline-none transition-colors data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600/10 data-[state=checked]:text-blue-600 focus-visible:ring-2 focus-visible:ring-blue-600/15"
            >
              {p.label}
            </RadioGroup.Item>
          ))}
        </RadioGroup.Root>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[0.85rem] font-semibold text-neutral-700">Preferred Contact Method</label>
        <RadioGroup.Root
          value={form.contactMethod}
          onValueChange={(v) => update("contactMethod", v)}
          className="flex flex-wrap gap-2"
        >
          {CONTACT_METHODS.map((c) => (
            <RadioGroup.Item
              key={c.value}
              value={c.value}
              className="rounded-full border border-neutral-300 bg-white px-4 py-2 text-[0.82rem] font-medium text-neutral-500 outline-none transition-colors data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600/10 data-[state=checked]:text-blue-600 focus-visible:ring-2 focus-visible:ring-blue-600/15"
            >
              {c.label}
            </RadioGroup.Item>
          ))}
        </RadioGroup.Root>
        {form.contactMethod === "whatsapp" && (
          <p className="text-xs leading-relaxed text-blue-600">
            Please make sure the phone number above is active on WhatsApp so we can reach you there.
          </p>
        )}
        {errors.contactMethod && <p className="text-xs text-red-500">{errors.contactMethod}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[0.85rem] font-semibold text-neutral-700">
          Tell Us About Your Land <span className="text-neutral-400 font-normal">(optional)</span>
        </label>
        <textarea
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder="Existing water access, site access for a rig, timeline — anything that helps us prepare."
          rows={4}
          disabled={isPending}
          maxLength={600}
          className={`${inputClasses} resize-none`}
        />
      </div>

      <div className="flex items-start gap-3">
        <Checkbox.Root
          checked={form.consent}
          onCheckedChange={(v) => update("consent", v === true)}
          className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-md border border-neutral-300 bg-white outline-none data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 focus-visible:ring-2 focus-visible:ring-blue-600/15"
        >
          <Checkbox.Indicator>
            <FaCheck className="h-2.5 w-2.5 text-white" />
          </Checkbox.Indicator>
        </Checkbox.Root>
        <label className="text-[0.82rem] leading-relaxed text-neutral-500">
          I consent to being contacted about this request, in line with the{" "}
          <a href="/privacy-policy" className="font-medium text-blue-600 underline underline-offset-2">
            Privacy Policy
          </a>
          .
        </label>
      </div>
      {errors.consent && <p className="-mt-3 text-xs text-red-500">{errors.consent}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="mt-2 flex w-fit items-center justify-center gap-3 rounded-2xl bg-blue-600 py-1.5 pl-6 pr-1.5 text-base font-medium text-white transition-all duration-300 ease-out hover:bg-blue-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Submitting..." : "Request My Free Survey"}
        <span className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-white text-blue-600">
          <FaArrowRight className="h-3.5 w-3.5" />
        </span>
      </button>
    </form>
  );
}