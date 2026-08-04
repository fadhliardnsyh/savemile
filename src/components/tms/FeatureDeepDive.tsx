"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { tms } from "@/lib/content";

interface FeatureItem {
  title: string;
  desc: string;
  image?: string;
  video?: string;
}

interface FeatureDeepDiveProps {
  features?: {
    eyebrow?: string;
    titleLead?: string;
    titleAccent?: string;
    items?: FeatureItem[];
  };
}

export function FeatureDeepDive({ features }: FeatureDeepDiveProps = {}) {
  const f = features || tms.features;
  const items: FeatureItem[] = f.items || [];
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="fitur" className="scroll-mt-20 py-20 sm:py-28 bg-paper">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal delay={60}>
            <h2 className="font-display text-4xl font-bold tracking-tight text-ink text-balance sm:text-5xl">
              {f.titleLead}
              <span className="text-orange">{f.titleAccent}</span>
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-12 items-stretch">
          {/* Left Column: Interactive Feature Cards */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-3.5">
            {items.map((item, i) => {
              const isActive = activeTab === i;
              return (
                <Reveal key={item.title} delay={i * 50}>
                  <button
                    type="button"
                    onClick={() => setActiveTab(i)}
                    className={`w-full text-left rounded-2xl p-5 sm:p-6 transition-all duration-300 ${
                      isActive
                        ? "bg-white border-2 border-orange shadow-md shadow-orange/10"
                        : "bg-white/80 border border-line/80 hover:border-line hover:bg-white shadow-xs cursor-pointer group"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h3
                        className={`font-display text-lg font-bold leading-snug transition-colors ${
                          isActive
                            ? "text-orange"
                            : "text-ink group-hover:text-orange"
                        }`}
                      >
                        {item.title}
                      </h3>
                      <div className="shrink-0">
                        {isActive ? (
                          <ChevronDown className="h-5 w-5 text-orange transition-transform duration-300" />
                        ) : (
                          <ChevronRight className="h-5 w-5 text-muted/60 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-ink" />
                        )}
                      </div>
                    </div>

                    <div className="mt-2.5">
                      <p
                        className={`text-sm sm:text-base leading-relaxed font-normal transition-all duration-300 ${
                          isActive
                            ? "text-ink-soft opacity-100"
                            : "text-muted line-clamp-1 opacity-80"
                        }`}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </button>
                </Reveal>
              );
            })}
          </div>

          {/* Right Column: Edge-to-edge Feature Image/Video Card (Smooth Crossfade) */}
          <div className="lg:col-span-6 flex flex-col">
            <Reveal delay={120} className="h-full flex flex-col">
              <div className="relative w-full h-full min-h-80 sm:min-h-96 rounded-3xl overflow-hidden shadow-xl border border-line/80 bg-white">
                {items.map((item, i) => {
                  const mediaUrl = item.video || item.image;
                  const isVideo = Boolean(
                    item.video ||
                      (item.image &&
                        /\.(mp4|webm|ogg|mov|m4v)$/i.test(item.image))
                  );

                  return (
                    <div
                      key={item.title}
                      className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                        activeTab === i
                          ? "opacity-100 z-10 pointer-events-auto"
                          : "opacity-0 z-0 pointer-events-none"
                      }`}
                    >
                      {isVideo && mediaUrl ? (
                        <video
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="h-full w-full object-cover"
                        >
                          <source src={mediaUrl} />
                        </video>
                      ) : mediaUrl ? (
                        <Image
                          src={mediaUrl}
                          alt={item.title}
                          fill
                          className="object-cover"
                          priority={i === 0}
                        />
                      ) : null}
                    </div>
                  );
                })}

                {/* Floating Feature Badge */}
                {items[activeTab] && (
                  <div className="absolute bottom-5 left-5 z-20 flex items-center gap-2.5 rounded-full bg-white/90 px-4 py-2 shadow-md backdrop-blur-md border border-white/60">
                    <span className="h-2 w-2 rounded-full bg-orange animate-pulse" />
                    <span className="font-display text-xs sm:text-sm font-semibold text-ink">
                      {items[activeTab].title}
                    </span>
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
