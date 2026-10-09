"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { FaTimes, FaArrowRight } from "react-icons/fa";
import { StarRatingInput } from "./star-rating";
import { MultiSelectField } from "@/components/ui/multi-select";
import { useToast } from "@/components/ui/toast";
import { Review, ReviewState, SERVICE_TYPES } from "@/db/types";
import { createReview } from "@/db/actions/reviews";

interface AddReviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const emptyState: ReviewState = { message: null, errors: {}, success: false };

const inputClasses =
  "w-full rounded-xl border border-neutral-300 bg-white px-4 py-2.5 text-[0.92rem] text-neutral-900 placeholder:text-neutral-400 outline-none transition-colors focus:border-blue-600 focus:ring-2 focus:ring-blue-600/15";

export function AddReviewDialog({ open, onOpenChange }: AddReviewDialogProps) {
  const { showToast } = useToast();
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [service, setService] = useState<Review["services"]>([]);
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");
  const [state, setState] = useState<ReviewState>(emptyState);
  const [isPending, setIsPending] = useState(false);

  function resetForm() {
    setName("");
    setTitle("");
    setLocation("");
    setService([]);
    setRating(5);
    setMessage("");
    setState(emptyState);
  }

  function validate(): ReviewState["errors"] {
    const errors: ReviewState["errors"] = {};
    if (!name.trim()) errors.name = ["Please enter your name."];
    if (!location.trim()) errors.location = ["Please tell us your city or region."];
    if (service.length === 0)
      errors.service = ["Please select at least one service."];
    if (!message.trim() || message.trim().length < 10)
      errors.message = ["Please share a few more words about your experience."];
    return errors;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setState({ ...emptyState, errors });
      showToast({
        title: "Missing a few details",
        description: "Please fill in the highlighted fields before submitting.",
        variant: "error",
      });
      return;
    }

    setIsPending(true);
    const result = await createReview({
      name: name.trim(),
      title: title.trim() || undefined,
      location: location.trim(),
      services: service,
      rating,
      message: message.trim(),
    });
    setIsPending(false);

    if (!result.success) {
      setState({ message: result.message, errors: result.errors ?? {}, success: false });
      showToast({
        title: "Review not submitted",
        description: result.message,
        variant: "error",
      });
      return;
    }

    setState({ message: result.message, errors: {}, success: true });
    showToast({
      title: "Review submitted",
      description: "Thanks for taking the time to share your experience.",
      variant: "success",
    });
    resetForm();
    onOpenChange(false);
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[min(95vw,44rem)] max-h-[90vh] -translate-x-1/2 -translate-y-1/2 overflow-y-auto no-scrollbar rounded-[1.5rem] border border-neutral-200 bg-neutral-100 p-5 shadow-2xl md:p-7">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <Dialog.Title className="font-display text-xl font-semibold text-neutral-900 md:text-2xl">
                Share Your Experience
              </Dialog.Title>
            </div>
            <Dialog.Close className="rounded-full p-2 text-neutral-400 hover:bg-white hover:text-neutral-700 transition-colors">
              <FaTimes className="h-3.5 w-3.5" />
            </Dialog.Close>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex flex-col gap-2">
              <label className="text-[0.85rem] font-semibold text-neutral-700">Your Rating</label>
              <StarRatingInput value={rating} onChange={setRating} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label className="text-[0.85rem] font-semibold text-neutral-700">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Mrs. Ama Owusu"
                  disabled={isPending}
                  maxLength={100}
                  className={inputClasses}
                />
                {state.errors.name?.[0] && (
                  <p className="text-xs text-red-500">{state.errors.name[0]}</p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[0.85rem] font-semibold text-neutral-700">City / Region</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., Tema, Greater Accra"
                  disabled={isPending}
                  maxLength={100}
                  className={inputClasses}
                />
                {state.errors.location?.[0] && (
                  <p className="text-xs text-red-500">{state.errors.location[0]}</p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[0.85rem] font-semibold text-neutral-700">
                Role / Company <span className="text-neutral-400 font-normal">(optional)</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Operations Director — Green Farms Ghana"
                disabled={isPending}
                maxLength={100}
                className={inputClasses}
              />
            </div>

            <MultiSelectField
              label="Service(s) Used"
              placeholder="Select one or more services"
              values={service}
              onChange={(v) => setService(v as Review["services"])}
              items={SERVICE_TYPES}
              error={state.errors.service?.[0]}
            />

            <div className="flex flex-col gap-1.5">
              <label className="text-[0.85rem] font-semibold text-neutral-700">Your Review</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us how the project went, start to finish..."
                rows={4}
                disabled={isPending}
                maxLength={500}
                className={`${inputClasses} resize-none`}
              />
              {state.errors.message?.[0] && (
                <p className="text-xs text-red-500">{state.errors.message[0]}</p>
              )}
            </div>

            <TurnstileField action="review" onToken={setTurnstileToken} />
            <button
              type="submit"
              disabled={isPending || !turnstileToken || !formStartedAt}
              className="mt-2 flex w-fit items-center justify-center gap-3 rounded-2xl bg-blue-600 py-1.5 pl-6 pr-1.5 text-base font-medium text-white transition-all duration-300 ease-out hover:bg-blue-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? "Submitting..." : "Submit Review"}
              <span className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-white text-blue-600">
                <FaArrowRight className="h-3.5 w-3.5" />
              </span>
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}