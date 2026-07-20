"use client";

import { useState } from "react";
import * as Select from "@radix-ui/react-select";
import * as RadioGroup from "@radix-ui/react-radio-group";
import * as Checkbox from "@radix-ui/react-checkbox";
import { FaChevronDown, FaCheck } from "react-icons/fa";
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
      <label className="text-sm font-medium text-foreground">{label}</label>
      <Select.Root value={value} onValueChange={onChange}>
        <Select.Trigger
          className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-[0.92rem] outline-none focus:ring-2 focus:ring-blue-600 ${
            value ? "text-foreground" : "text-muted-foreground"
          } border-[rgba(10,10,10,0.08)] bg-[rgba(36,35,35,0.5)]`}
        >
          <Select.Value placeholder={placeholder} />
          <Select.Icon>
            <FaChevronDown className="h-2.5 w-2.5 text-muted-foreground" />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            position="popper"
            sideOffset={8}
            className="z-50 w-(--radix-select-trigger-width) overflow-hidden rounded-xl border border-[rgba(10,10,10,0.08)] bg-background shadow-xl max-h-72"
          >
            <Select.Viewport className="p-1.5">
              {items.map((item) => (
                <Select.Item
                  key={item}
                  value={item}
                  className="flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2 text-[0.88rem] text-foreground outline-none data-highlighted:bg-blue-600/10 data-highlighted:text-blue-600"
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
      {error && <p className="text-xs text-red-400">{error}</p>}
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
        <h3 className="font-display text-xl font-semibold text-foreground">
          Thanks, {form.name.split(" ")[0]}. We&apos;ve got it.
        </h3>
        <p className="max-w-sm text-[0.92rem] leading-relaxed text-muted-foreground">
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
          <label className="text-sm font-medium text-foreground">Full Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="e.g., Kwame Asante"
            disabled={isPending}
            maxLength={100}
            className="w-full rounded-xl border border-[rgba(10,10,10,0.08)] bg-[rgba(36,35,35,0.5)] px-4 py-3 text-[0.92rem] text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-blue-600"
          />
          {errors.name && <p className="text-xs text-red-400">{errors.name}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground">Phone Number</label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="e.g., +233 24 000 0000"
            disabled={isPending}
            maxLength={30}
            className="w-full rounded-xl border border-[rgba(10,10,10,0.08)] bg-[rgba(36,35,35,0.5)] px-4 py-3 text-[0.92rem] text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-blue-600"
          />
          {errors.phone && <p className="text-xs text-red-400">{errors.phone}</p>}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-foreground">
          Email <span className="text-muted-foreground font-normal">(optional)</span>
        </label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          placeholder="e.g., you@example.com"
          disabled={isPending}
          maxLength={120}
          className="w-full rounded-xl border border-[rgba(10,10,10,0.08)] bg-[rgba(36,35,35,0.5)] px-4 py-3 text-[0.92rem] text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-blue-600"
        />
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
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-foreground">Property Type</label>
        <RadioGroup.Root
          value={form.propertyType}
          onValueChange={(v) => update("propertyType", v)}
          className="flex flex-wrap gap-2"
        >
          {PROPERTY_TYPES.map((p) => (
            <RadioGroup.Item
              key={p.value}
              value={p.value}
              className="rounded-full border px-4 py-2 text-[0.82rem] font-medium outline-none transition-colors border-[rgba(10,10,10,0.08)] bg-[rgba(36,35,35,0.5)] text-muted-foreground data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600/10 data-[state=checked]:text-blue-600 focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              {p.label}
            </RadioGroup.Item>
          ))}
        </RadioGroup.Root>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-foreground">Preferred Contact Method</label>
        <RadioGroup.Root
          value={form.contactMethod}
          onValueChange={(v) => update("contactMethod", v)}
          className="flex flex-wrap gap-2"
        >
          {CONTACT_METHODS.map((c) => (
            <RadioGroup.Item
              key={c.value}
              value={c.value}
              className="rounded-full border px-4 py-2 text-[0.82rem] font-medium outline-none transition-colors border-[rgba(10,10,10,0.08)] bg-[rgba(36,35,35,0.5)] text-muted-foreground data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600/10 data-[state=checked]:text-blue-600 focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              {c.label}
            </RadioGroup.Item>
          ))}
        </RadioGroup.Root>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-foreground">
          Tell Us About Your Land <span className="text-muted-foreground font-normal">(optional)</span>
        </label>
        <textarea
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder="Existing water access, site access for a rig, timeline — anything that helps us prepare."
          rows={4}
          disabled={isPending}
          maxLength={600}
          className="w-full resize-none rounded-xl border border-[rgba(10,10,10,0.08)] bg-[rgba(36,35,35,0.5)] px-4 py-3 text-[0.92rem] text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div className="flex items-start gap-3">
        <Checkbox.Root
          checked={form.consent}
          onCheckedChange={(v) => update("consent", v === true)}
          className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-md border border-[rgba(10,10,10,0.15)] bg-[rgba(36,35,35,0.5)] outline-none data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 focus-visible:ring-2 focus-visible:ring-blue-600"
        >
          <Checkbox.Indicator>
            <FaCheck className="h-2.5 w-2.5 text-white" />
          </Checkbox.Indicator>
        </Checkbox.Root>
        <label className="text-[0.82rem] leading-relaxed text-muted-foreground">
          I consent to being contacted about this request, in line with the{" "}
          <a href="/privacy-policy" className="font-medium text-blue-600 underline underline-offset-2">
            Privacy Policy
          </a>
          .
        </label>
      </div>
      {errors.consent && <p className="-mt-3 text-xs text-red-400">{errors.consent}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-xl bg-blue-600 py-3.5 text-[0.95rem] font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? "Submitting..." : "Request My Free Survey"}
      </button>
    </form>
  );
}