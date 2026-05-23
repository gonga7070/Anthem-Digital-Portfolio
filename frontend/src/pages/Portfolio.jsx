import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import PreviewCard from "../components/PreviewCard";

/**
 * Akron Digital — Selected Work
 * Single-page cinematic portfolio for cold outreach.
 * Three live iframe previews stacked in an asymmetric vertical sequence.
 *
 * Replace the `url` values in PROJECTS below with your live preview URLs.
 */
const PROJECTS = [
  {
    name: "Website I",
    subtitle: "SkyForge",
    url: "/skyforge/",
    align: "left",
  },
  {
    name: "Website II",
    subtitle: "Jag Renovations",
    url: "/jag/",
    align: "right",
  },
  {
    name: "Website III",
    subtitle: "Blue Haven",
    url: "/bluehaven/",
    align: "left",
  },
];

const CONTACT_EMAIL = "Goncalo@akrondigital.ca";
const BACKDROP_URL =
  "https://static.prod-images.emergentagent.com/jobs/8c1a93c1-fbf0-4331-9564-21242e177d70/images/76c13ac2a039223de8ed4e5469334325e0b1d3b6d28b0d777e2a066af4e39de0.png";
const SHARDS_URL =
  "https://static.prod-images.emergentagent.com/jobs/8c1a93c1-fbf0-4331-9564-21242e177d70/images/d4d88b5879ff19ed5cacc670b1a42d0efb248c9a684c42bcfedc23ab63c4317f.png";

const Portfolio = () => {
  const [scrolled, setScrolled] = useState(false);
  const auraRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Smooth cursor-following purple aura
  useEffect(() => {
    let raf;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let curX = targetX;
    let curY = targetY;

    const onMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const tick = () => {
      curX += (targetX - curX) * 0.12;
      curY += (targetY - curY) * 0.12;
      if (auraRef.current) {
        auraRef.current.style.transform = `translate3d(${curX - 140}px, ${curY - 140}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="App grain relative min-h-screen bg-[#030305] text-white overflow-x-hidden">
      {/* Cursor-following purple aura */}
      <div
        ref={auraRef}
        aria-hidden
        data-testid="cursor-aura"
        className="pointer-events-none fixed top-0 left-0 z-0 h-[280px] w-[280px] rounded-full
                   blur-2xl will-change-transform mix-blend-screen opacity-40"
        style={{
          background:
            "radial-gradient(circle at center, rgba(123,44,191,0.28) 0%, rgba(123,44,191,0.10) 40%, rgba(123,44,191,0) 70%)",
        }}
      />

      {/* Fixed cinematic backdrop */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-cover bg-center opacity-[0.22]"
        style={{ backgroundImage: `url(${BACKDROP_URL})` }}
      />
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 violet-vignette" />

      {/* ===== HEADER ===== */}
      <header
        data-testid="site-header"
        className={`sticky top-0 z-50 w-full border-b border-white/10 transition-all duration-500 ${
          scrolled
            ? "bg-black/70 backdrop-blur-2xl border-white/15"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-14 h-20 md:h-24 flex items-center justify-between">
          <a
            href="/"
            data-testid="header-logo"
            aria-label="Akron Digital"
            className="group inline-flex items-center h-20 md:h-24"
          >
            <img
              src="https://customer-assets.emergentagent.com/job_my-portfolio-887/artifacts/4c1qgkeq_20f4df93-b61c-45dc-a561-02bd7f8001bb.png"
              alt="Akron Digital"
              className="h-[150%] w-auto object-contain select-none transition-opacity duration-300 group-hover:opacity-90"
              draggable={false}
            />
          </a>

          <a
            href="https://akrondigital.ca/"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="cta-contact-us"
            className="group inline-flex items-center justify-center gap-2 h-9 md:h-10 rounded-full
                       bg-white text-black font-display font-bold tracking-tight
                       text-xs md:text-sm px-5 md:px-6
                       transition-all duration-300
                       hover:bg-[#7B2CBF] hover:text-white hover:shadow-[0_0_40px_-8px_rgba(123,44,191,0.8)]"
          >
            Contact us
            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover:rotate-45"
            />
          </a>
        </div>
      </header>

      {/* Decorative purple shards — top right */}
      <img
        src={SHARDS_URL}
        alt=""
        aria-hidden
        className="pointer-events-none absolute right-0 top-32 w-[55vw] md:w-[38vw] opacity-25 mix-blend-screen -z-10"
      />

      {/* ===== TAGLINE ===== */}
      <section
        data-testid="tagline-section"
        className="relative mx-auto max-w-7xl px-6 md:px-10 lg:px-14 pt-8 md:pt-12 pb-4 md:pb-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-4"
        >
          <span className="h-px w-10 md:w-16 bg-white/20" />
          <span className="font-display text-[10px] md:text-xs tracking-[0.4em] text-white/50 uppercase whitespace-nowrap">
            Selected Work
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          data-testid="tagline-quote"
          className="mt-6 font-display font-black text-white tracking-[-0.03em] leading-[1.1]
                     md:whitespace-nowrap"
          style={{ fontSize: "clamp(1.5rem, 4.2vw, 3.75rem)" }}
        >
          Designed in silence<span className="text-[#A06CE0]">.</span>
          <span className="italic font-medium text-white/55"> Built to be remembered.</span>
        </motion.h1>
      </section>

      {/* ===== PREVIEWS ===== */}
      <main
        data-testid="previews-main"
        className="relative mx-auto max-w-7xl px-6 md:px-10 lg:px-14 pt-12 md:pt-16 pb-24 md:pb-48 space-y-20 md:space-y-48"
      >
        {PROJECTS.map((p, i) => (
          <PreviewCard
            key={p.name + i}
            index={i}
            name={p.name}
            subtitle={p.subtitle}
            url={p.url}
            align={p.align}
          />
        ))}
      </main>

      {/* ===== FOOTER ===== */}
      <footer
        data-testid="site-footer"
        className="relative border-t border-white/5 mt-8"
      >
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-14 pt-16 md:pt-20 pb-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
            <div>
              <p className="font-display text-xs tracking-[0.35em] text-white/40 uppercase mb-6">
                Let&rsquo;s talk
              </p>
              <div className="flex flex-col gap-3 md:gap-4">
                <a
                  href="mailto:Goncalo@akrondigital.ca"
                  data-testid="footer-email-goncalo"
                  className="group font-display font-black text-white tracking-tight leading-none
                             text-xl sm:text-3xl md:text-5xl break-all
                             inline-flex items-center gap-3 transition-colors duration-300
                             hover:text-[#A06CE0]"
                >
                  Goncalo@akrondigital.ca
                  <ArrowUpRight
                    className="shrink-0 opacity-50 group-hover:opacity-100 transition-opacity duration-300"
                    size={20}
                  />
                </a>
              </div>
            </div>

            <a
              href="https://akrondigital.ca/"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="footer-cta"
              className="self-start md:self-auto inline-flex items-center gap-2 rounded-full
                         border border-white/15 bg-black/40 backdrop-blur
                         px-5 py-3 font-display text-xs tracking-[0.25em] uppercase text-white/80
                         transition-all duration-300
                         hover:border-[#7B2CBF]/60 hover:text-white hover:shadow-[0_0_40px_-8px_rgba(123,44,191,0.6)]"
            >
              Contact us <ArrowUpRight size={14} />
            </a>
          </div>

          <div className="mt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-white/35 font-body text-xs">
            <span>© {new Date().getFullYear()} Akron Digital. All rights reserved.</span>
            <span className="tracking-[0.25em] uppercase">
              Crafted in the dark — designed for the spotlight.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
