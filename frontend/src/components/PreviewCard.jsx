import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

/**
 * PreviewCard — premium cinematic frame around a live iframe embed.
 *
 * Mobile (< md): Title on top, iframe rendered inside an iPhone device frame.
 * Desktop (>= md): Asymmetric grid with desktop browser-chrome frame.
 */
const PreviewCard = ({ index, name, subtitle, url, align = "left" }) => {
  const isRight = align === "right";
  const isCenter = align === "center";
  const desktopFrameRef = useRef(null);

  // Render desktop iframe at a fixed 1440x810 viewport and scale to fit container
  useEffect(() => {
    const el = desktopFrameRef.current;
    if (!el) return;
    const update = () => {
      const w = el.clientWidth;
      if (w > 0) el.style.setProperty("--preview-scale", (w / 1440).toString());
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* ---------- Shared title block ---------- */
  const TitleBlock = ({ centered = false }) => (
    <div className={centered ? "text-center" : ""}>
      <h2
        data-testid={`project-name-${index + 1}`}
        className="font-display font-black text-white leading-[0.9] tracking-[-0.04em]
                   text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
      >
        {name}
      </h2>
      {subtitle && (
        <p
          data-testid={`project-subtitle-${index + 1}`}
          className="mt-3 md:mt-4 font-display font-medium tracking-tight text-[#A06CE0]
                     text-lg sm:text-xl md:text-2xl lg:text-3xl"
        >
          {subtitle}
        </p>
      )}
      <div
        className={`mt-5 md:mt-6 flex items-center gap-3 ${
          centered ? "justify-center" : ""
        }`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[#7B2CBF] shadow-[0_0_12px_2px_rgba(123,44,191,0.7)]" />
        <span className="font-body text-[10px] sm:text-xs tracking-[0.25em] uppercase text-white/50">
          Live preview
        </span>
      </div>
    </div>
  );

  return (
    <motion.section
      data-testid={`preview-card-${index + 1}`}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full"
    >
      {/* Index marker — top */}
      <div
        className={`flex items-center gap-3 md:gap-4 mb-6 md:mb-12 justify-center ${
          isRight ? "md:justify-end" : "md:justify-start"
        } ${isCenter ? "md:justify-center" : ""}`}
      >
        <span className="font-display text-[10px] sm:text-xs tracking-[0.35em] text-white/40 uppercase">
          {String(index + 1).padStart(2, "0")} / Selected Work
        </span>
        <span className="h-px w-10 md:w-16 bg-white/15" />
      </div>

      {/* ============ MOBILE VIEW (< md) ============ */}
      <div className="md:hidden flex flex-col items-center gap-8 text-center">
        <TitleBlock centered />

        {/* iPhone device frame */}
        <div
          data-testid={`preview-iphone-${index + 1}`}
          className="relative mx-auto w-full max-w-[300px] aspect-[9/19.5]
                     rounded-[2.75rem] bg-black
                     border border-white/15 overflow-hidden
                     shadow-[0_30px_80px_-20px_rgba(123,44,191,0.45),0_0_0_2px_rgba(255,255,255,0.04)_inset]"
        >
          {/* Side glow (rendered outside via negative z-index sibling) */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-2 rounded-[3rem]
                       bg-[radial-gradient(60%_50%_at_50%_0%,rgba(123,44,191,0.25),transparent_70%)] -z-10"
          />

          {/* Inner screen — absolutely positioned inside the bezel padding */}
          <div className="absolute inset-[8px] rounded-[2.1rem] overflow-hidden bg-black">
            {/* iOS-style status bar (time left, signal/wifi/battery right) */}
            <div
              aria-hidden
              className="absolute top-0 inset-x-0 z-20 h-[34px] flex items-center justify-between px-6 text-white text-[11px] font-semibold tracking-wide pointer-events-none"
            >
              <span className="font-display">9:41</span>
              <div className="flex items-center gap-1">
                {/* Signal bars */}
                <svg width="16" height="10" viewBox="0 0 16 10" fill="currentColor">
                  <rect x="0" y="7" width="2.5" height="3" rx="0.4" />
                  <rect x="3.5" y="5" width="2.5" height="5" rx="0.4" />
                  <rect x="7" y="3" width="2.5" height="7" rx="0.4" />
                  <rect x="10.5" y="0" width="2.5" height="10" rx="0.4" />
                </svg>
                {/* Wifi */}
                <svg width="14" height="10" viewBox="0 0 14 10" fill="currentColor">
                  <path d="M7 9.5a1 1 0 100-2 1 1 0 000 2zM2.4 5.5l1.1 1.1a4.5 4.5 0 017 0l1.1-1.1a6 6 0 00-9.2 0zM0 3.1l1.1 1.1a7.7 7.7 0 0111.8 0L14 3.1a9.2 9.2 0 00-14 0z" />
                </svg>
                {/* Battery */}
                <svg width="22" height="11" viewBox="0 0 22 11" fill="none">
                  <rect x="0.5" y="0.5" width="18" height="10" rx="2.5" stroke="currentColor" strokeOpacity="0.55" />
                  <rect x="2" y="2" width="15" height="7" rx="1.5" fill="currentColor" />
                  <rect x="19.5" y="3.5" width="1.5" height="4" rx="0.6" fill="currentColor" fillOpacity="0.55" />
                </svg>
              </div>
            </div>

            {/* Dynamic Island */}
            <div
              aria-hidden
              className="absolute top-2 left-1/2 -translate-x-1/2 z-30
                         h-[22px] w-[90px] rounded-full bg-black border border-white/10"
            />

            <iframe
              data-testid={`iframe-embed-mobile-${index + 1}`}
              src={url}
              title={`${name} (mobile)`}
              loading="lazy"
              className="absolute left-0 top-0 origin-top-left border-0"
              style={{
                width: "390px",
                height: "calc((100% - 34px) / 0.73)",
                transform: "scale(0.73)",
                top: "34px",
              }}
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              referrerPolicy="no-referrer"
            />

            {/* Home indicator */}
            <div
              aria-hidden
              className="absolute bottom-1.5 left-1/2 -translate-x-1/2 z-10
                         h-1 w-24 rounded-full bg-white/70"
            />
          </div>
        </div>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          data-testid={`open-external-mobile-${index + 1}`}
          className="inline-flex items-center gap-2 rounded-full
                     border border-white/15 bg-black/40 backdrop-blur-md px-4 py-2
                     font-display text-[10px] tracking-[0.25em] uppercase text-white/80
                     transition-all duration-300 hover:border-[#7B2CBF]/60 hover:text-white"
        >
          Open <ArrowUpRight size={12} />
        </a>
      </div>

      {/* ============ DESKTOP VIEW (>= md) ============ */}
      <div
        className={`hidden md:grid grid-cols-12 gap-12 items-center ${
          isCenter ? "gap-6" : ""
        }`}
      >
        {/* TEXT block */}
        <div
          className={`${
            isRight
              ? "order-2 col-span-4 pl-4"
              : isCenter
              ? "order-1 col-span-12 text-center"
              : "order-1 col-span-4 pr-4"
          }`}
        >
          <TitleBlock centered={isCenter} />
        </div>

        {/* IFRAME block */}
        <div
          className={`${
            isRight
              ? "order-1 col-span-8"
              : isCenter
              ? "order-2 col-span-12"
              : "order-2 col-span-8"
          }`}
        >
          <div
            data-testid={`preview-frame-${index + 1}`}
            className="group relative rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden
                       shadow-[0_30px_80px_-30px_rgba(123,44,191,0.35),0_0_0_1px_rgba(255,255,255,0.04)_inset]
                       transition-all duration-500
                       hover:border-white/20 hover:shadow-[0_40px_120px_-30px_rgba(123,44,191,0.55),0_0_0_1px_rgba(255,255,255,0.08)_inset]"
          >
            {/* Faux browser chrome */}
            <div className="flex items-center gap-2 px-5 py-3 border-b border-white/5 bg-black/40 backdrop-blur-xl">
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <div className="ml-4 flex-1 truncate font-body text-[11px] tracking-wide text-white/35">
                {url}
              </div>
              <span className="font-display text-[10px] tracking-[0.3em] uppercase text-[#A06CE0]/80">
                Akron
              </span>
            </div>

            {/* The iframe itself — rendered at 1440x810 and scaled to fit container width */}
            <div ref={desktopFrameRef} className="relative aspect-[16/9] w-full bg-black overflow-hidden">
              <iframe
                data-testid={`iframe-embed-${index + 1}`}
                src={url}
                title={name}
                loading="lazy"
                className="absolute left-0 top-0 origin-top-left border-0"
                style={{
                  width: "1440px",
                  height: "810px",
                  transform: "scale(var(--preview-scale, 0.5))",
                }}
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                referrerPolicy="no-referrer"
              />
              <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.55)]" />
              <div className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-700
                              bg-[radial-gradient(60%_50%_at_100%_0%,rgba(123,44,191,0.25),transparent_60%),radial-gradient(60%_50%_at_0%_100%,rgba(123,44,191,0.18),transparent_60%)]" />
            </div>

            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              data-testid={`open-external-${index + 1}`}
              className="absolute right-5 bottom-5 inline-flex items-center gap-2 rounded-full
                         border border-white/10 bg-black/60 backdrop-blur-md px-4 py-2
                         font-display text-[11px] tracking-[0.25em] uppercase text-white/80
                         opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0
                         transition-all duration-500 hover:border-[#7B2CBF]/60 hover:text-white"
            >
              Open <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default PreviewCard;
