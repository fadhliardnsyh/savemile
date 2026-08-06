"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import type { JobListing } from "@/lib/payload";

interface JobOpeningsProps {
  jobs: JobListing[];
  hrEmail: string;
  defaultCtaUrl?: string;
}

export function JobOpenings({ jobs, hrEmail, defaultCtaUrl }: JobOpeningsProps) {
  const [selectedJob, setSelectedJob] = useState<{
    job: JobListing;
    email: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedJob(null);
      }
    };
    if (selectedJob) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedJob]);

  const handleApplyClick = (job: JobListing) => {
    const rawUrl = job.applyUrl || defaultCtaUrl || hrEmail;
    if (rawUrl.startsWith("http://") || rawUrl.startsWith("https://")) {
      window.open(rawUrl, "_blank", "noopener,noreferrer");
      return;
    }

    const cleanEmail = rawUrl.replace(/^mailto:/i, "").trim() || hrEmail;
    setSelectedJob({ job, email: cleanEmail });
    setCopied(false);
  };

  const handleCopy = () => {
    if (!selectedJob) return;
    navigator.clipboard.writeText(selectedJob.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="border-t border-line/60 bg-paper/40 py-20 sm:py-28">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal delay={60}>
            <span className="text-xs font-bold tracking-widest text-orange uppercase">
              Lowongan Kerja
            </span>
            <h2 className="mt-2 font-display text-4xl font-bold tracking-tight text-ink text-balance sm:text-5xl">
              Posisi yang sedang <span className="text-orange">terbuka</span>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-4 text-muted">
              Mari bergabung dan berkembang bersama tim SaveMile.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 mx-auto max-w-3xl space-y-4">
          {jobs.map((job, index) => (
            <Reveal key={job.id} delay={index * 80}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 rounded-2xl bg-card p-6 shadow-(--shadow-soft) ring-1 ring-inset ring-line/70 transition-all duration-300 hover:shadow-(--shadow-lift)">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-orange/10 px-3 py-0.5 text-xs font-semibold text-orange">
                      {job.department}
                    </span>
                    <span className="rounded-full bg-paper-2 px-3 py-0.5 text-xs font-medium text-muted">
                      {job.type}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-ink">
                    {job.title}
                  </h3>
                  <p className="text-xs text-muted flex items-center gap-1">
                    <Icon name="route" className="h-3.5 w-3.5" />
                    {job.location}
                  </p>
                  {job.description && (
                    <p className="mt-2 text-sm text-muted leading-relaxed">
                      {job.description}
                    </p>
                  )}
                </div>
                <div className="shrink-0">
                  <Button
                    onClick={() => handleApplyClick(job)}
                    variant="primary"
                    size="md"
                  >
                    Lamar Sekarang
                  </Button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>

      {/* Interactive Prompt Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Modal Backdrop */}
          <button
            type="button"
            aria-label="Tutup modal"
            className="fixed inset-0 bg-ink/50 backdrop-blur-xs transition-opacity duration-200 border-0 p-0 w-full h-full cursor-default"
            onClick={() => setSelectedJob(null)}
            tabIndex={-1}
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="relative z-10 w-full max-w-md rounded-3xl bg-card p-6 sm:p-8 shadow-2xl ring-1 ring-line/60 transition-transform duration-200"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedJob(null)}
              className="absolute right-5 top-5 grid h-8 w-8 place-items-center rounded-full text-muted transition-colors hover:bg-paper hover:text-ink"
              aria-label="Tutup"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Icon & Title */}
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-orange/10 text-orange ring-1 ring-inset ring-orange/20">
              <Icon name="mail" className="h-6 w-6" />
            </div>

            <h3 id="modal-title" className="mt-4 font-display text-2xl font-bold text-ink">
              Lamar {selectedJob.job.title}
            </h3>
            <p className="mt-1 text-xs text-muted font-medium">
              {selectedJob.job.department} • {selectedJob.job.location}
            </p>

            <p className="mt-4 text-sm text-muted leading-relaxed">
              Silakan kirimkan CV dan Surat Lamaran Anda ke alamat email HR berikut:
            </p>

            {/* Email Box & Copy Button */}
            <div className="mt-4 flex items-center justify-between gap-2 rounded-xl bg-paper px-4 py-3 ring-1 ring-line/60">
              <span className="text-sm font-semibold text-ink select-all truncate">
                {selectedJob.email}
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="shrink-0 flex items-center gap-1.5 rounded-lg bg-orange/10 px-3 py-1.5 text-xs font-semibold text-orange transition-colors hover:bg-orange hover:text-white"
              >
                {copied ? (
                  <>
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Tersalin!
                  </>
                ) : (
                  <>
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <rect x="9" y="9" width="13" height="13" rx="2" strokeLinecap="round" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" strokeLinecap="round" />
                    </svg>
                    Salin
                  </>
                )}
              </button>
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-col gap-2.5">
              <a
                href={`mailto:${selectedJob.email}?subject=Lamaran Pekerjaan: ${encodeURIComponent(selectedJob.job.title)}`}
                className="w-full text-center rounded-xl bg-orange px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Buka di Email Client
              </a>
              <button
                type="button"
                onClick={() => setSelectedJob(null)}
                className="w-full text-center rounded-xl bg-paper px-4 py-2.5 text-sm font-semibold text-muted transition-colors hover:bg-paper-2 hover:text-ink"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
