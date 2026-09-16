"use client";

import { useState, useTransition } from "react";
import { CheckCircle2, Circle, Clock, Sparkles } from "lucide-react";
import { cn } from "cn";
import { ConceptModal } from "@/components/concept/concept-modal";
import { getConceptDetailAction, type ConceptDetail } from "@/lib/actions/content";

const FLIP_MS = 420;

export function ConceptCard({
  slug,
  cardLabel,
  oneLiner,
  estimatedMinutes,
  status,
}: {
  slug: string;
  cardLabel: string;
  oneLiner: string;
  estimatedMinutes: number;
  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
}) {
  const [flipped, setFlipped] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [detail, setDetail] = useState<ConceptDetail | null>(null);
  const [pending, startTransition] = useTransition();

  function fetchDetail(targetSlug: string) {
    setDetail(null);
    startTransition(async () => {
      const result = await getConceptDetailAction(targetSlug);
      setDetail(result);
    });
  }

  function openModal() {
    setModalOpen(true);
    fetchDetail(slug);
  }

  function handleOpen() {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      openModal();
      return;
    }
    setFlipped(true);
    window.setTimeout(openModal, FLIP_MS);
  }

  function handleOpenChange(open: boolean) {
    setModalOpen(open);
    if (!open) setFlipped(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        aria-haspopup="dialog"
        aria-label={`${cardLabel} — ${oneLiner}`}
        title={oneLiner}
        className="block w-full cursor-pointer text-left [perspective:1200px]"
      >
        <div
          className="relative h-32 w-full transition-transform duration-[420ms] ease-[cubic-bezier(.4,.2,.2,1)] will-change-transform [transform-style:preserve-3d]"
          style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
        >
          {/* Front */}
          <div
            className={cn(
              "absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 text-center transition-shadow hover:shadow-md [backface-visibility:hidden]",
              status === "COMPLETED" && "bg-success/5"
            )}
          >
            <div className="absolute top-2.5 right-2.5">
              {status === "COMPLETED" ? (
                <CheckCircle2 className="size-4 text-success" />
              ) : status === "IN_PROGRESS" ? (
                <Circle className="size-4 fill-primary/20 text-primary" />
              ) : (
                <Circle className="size-4 text-muted-foreground/40" />
              )}
            </div>
            <h3 className="line-clamp-2 font-heading text-lg font-semibold leading-snug">{cardLabel}</h3>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="size-3.5" /> {estimatedMinutes} min
            </div>
          </div>

          {/* Back */}
          <div
            aria-hidden="true"
            className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-xl border border-primary/30 bg-primary/10 p-4 [backface-visibility:hidden]"
            style={{ transform: "rotateY(180deg)" }}
          >
            <Sparkles className="size-5 text-primary" />
            <p className="text-center text-sm font-medium text-primary">Opening {cardLabel}…</p>
          </div>
        </div>
      </button>

      <ConceptModal
        open={modalOpen}
        onOpenChange={handleOpenChange}
        detail={detail}
        loading={pending}
        onNavigate={fetchDetail}
      />
    </>
  );
}
