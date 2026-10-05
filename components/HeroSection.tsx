import dynamic from "next/dynamic";
import Image from "next/image";
import HeroQuoteFormSkeleton from "./HeroQuoteFormSkeleton";

const HeroQuoteForm = dynamic(() => import("./HeroQuoteForm"), {
  loading: () => <HeroQuoteFormSkeleton />,
});

const HERO_HIGHLIGHTS = [
  "On-Time Delivery Rate: 98%",
  "8+ States served across India",
  "In-House PEB Manufacturing",
  "Single-Point Contract Accountability",
] as const;

const HERO_CLIENT_LOGOS = [
  { src: "/hero/logos/volkswagen.webp", alt: "Volkswagen" },
  { src: "/hero/logos/voltas.webp", alt: "Voltas" },
  { src: "/hero/logos/tvs-motor.webp", alt: "TVS Motor" },
  { src: "/hero/logos/tata-electronics.webp", alt: "Tata Electronics" },
  { src: "/hero/logos/schwing-stetter.webp", alt: "Schwing Stetter" },
  { src: "/hero/logos/srf.webp", alt: "SRF" },
] as const;

const HERO_STATS = [
  { value: "200", suffix: "+", label: "Projects" },
  { value: "18", suffix: "+", label: "Years Experience" },
  { value: "40,000", suffix: " MT", label: "Annual Production" },
  { value: "175", suffix: "+", label: "Engineering Team" },
] as const;

const WHATSAPP_MESSAGE =
  "Hello Mekark, I would like to discuss my industrial construction project.";

const PHONE_NUMBER = "9790924754";

export default function HeroSection() {
  const whatsappHref = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(
    WHATSAPP_MESSAGE,
  )}`;

  const renderCtaButtons = (wrapperClassName: string) => (
    <div className={wrapperClassName}>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-12 min-w-0 max-w-[140px] flex-1 items-center justify-center gap-2 rounded-full bg-white px-3 text-[14px] font-bold leading-5 text-[#E5091F] transition-transform hover:-translate-y-0.5 sm:h-[55.333px] sm:w-auto sm:max-w-none sm:flex-none sm:gap-[9.6px] sm:px-[24px] sm:text-[16px] sm:leading-6"
      >
        WhatsApp
        <span
          aria-hidden="true"
          className="relative h-[18px] w-[18px] overflow-hidden [mask-position:center] [mask-repeat:no-repeat] [mask-size:18px_18px]"
          style={{
            maskImage: 'url("/hero/whatsapp-mask.svg")',
            WebkitMaskImage: 'url("/hero/whatsapp-mask.svg")',
          }}
        >
          <Image
            src="/hero/whatsapp.svg"
            alt=""
            fill
            sizes="18px"
            className="object-contain"
          />
        </span>
      </a>
      <a
        href={`tel:${PHONE_NUMBER}`}
        className="inline-flex h-12 min-w-0 max-w-[140px] flex-1 items-center justify-center gap-2 rounded-full border border-white px-3 text-[14px] font-bold leading-5 text-white transition-colors hover:bg-white hover:text-[#060606] sm:h-[55.333px] sm:w-auto sm:max-w-none sm:flex-none sm:gap-[9.6px] sm:px-[24px] sm:text-[16px] sm:leading-6"
      >
        Call Now
        <Image
          src="/hero/phone-call.svg"
          alt=""
          aria-hidden="true"
          width={18}
          height={18}
        />
      </a>
    </div>
  );

  return (
    <section className="hero-section relative isolate w-full overflow-visible bg-[#060606] pb-10 pt-24 text-white sm:pb-12 sm:pt-28 lg:pb-10 lg:pt-32">
      <div className="hero-mobile-background sm:hidden" aria-hidden="true">
        {/* Bottom to top. The two large layers are the mobile LCP candidates: eager + high priority
            so they are discoverable in the initial HTML. `sizes` keeps desktop from fetching full files. */}
        <Image
          src="/hero/mobile-layer.webp"
          alt=""
          width={393}
          height={699}
          sizes="(max-width: 639px) 200px, 1px"
          priority
          fetchPriority="high"
          className="absolute right-0 top-[90px] max-w-none"
        />
        <Image
          src="/hero/mobile-image22.webp"
          alt=""
          width={941}
          height={1672}
          sizes="(max-width: 639px) 400px, 1px"
          quality={50}
          loading="eager"
          className="absolute left-1/2 top-[15px] max-w-none -translate-x-1/2"
        />
        <Image
          src="/hero/mobile-image23.webp"
          alt=""
          width={505}
          height={1556}
          sizes="(max-width: 639px) 220px, 1px"
          quality={50}
          className="absolute left-1/2 top-[419px] max-w-none -translate-x-1/2"
        />
        <div className="absolute inset-x-0 top-[284px] h-[1691px] bg-[rgba(15,15,15,.4)]" />
        <Image
          src="/hero/mobile-overlay.webp"
          alt=""
          width={1028}
          height={1826}
          sizes="(max-width: 639px) 400px, 1px"
          quality={50}
          loading="eager"
          className="absolute left-1/2 top-[-8px] max-w-none -translate-x-1/2"
        />
        <Image
          src="/hero/mobile-shade.svg"
          alt=""
          width={1028}
          height={1826}
          className="absolute left-1/2 top-0 h-full w-[1028px] max-w-none -translate-x-1/2"
        />
      </div>
      <Image
        src="/hero/industrial-crane-bg.webp"
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="(max-width: 639px) 1px, 100vw"
        className="hero-sky absolute inset-0 -z-30 h-full w-full object-cover object-center blur-[2px]"
      />
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,#060606_24.831%,rgba(6,6,6,0.8)_42.674%,rgba(6,6,6,0)_88.021%)] max-sm:bg-none max-sm:bg-[rgba(6,6,6,0.65)]" />
      {/* Keep the building within the right column on laptops; wide-screen CSS expands it. */}
      <Image
        src="/hero/industrial-building.webp"
        alt=""
        aria-hidden="true"
        width={1244}
        height={867}
        priority
        sizes="(max-width: 1023px) 1px, 72vw"
        className="hero-building pointer-events-none absolute bottom-0 right-0 -z-10 hidden w-[580px] max-w-none object-contain xl:block"
      />

      <div className="hero-layout mx-auto grid w-full min-w-0 max-w-[1760px] gap-[13px] px-5 sm:gap-10 sm:px-6 lg:px-10 xl:grid-cols-[minmax(0,1fr)_minmax(18rem,540px)] xl:items-start xl:gap-10 2xl:gap-14">
        <div className="hero-copy min-w-0 max-w-[891px]">
          <div className="hero-heading-stage flex flex-col items-start gap-[10px]">
            <h1 className="w-full whitespace-nowrap font-sans text-[min(5.8cqi,3rem)] font-bold leading-[1.2] tracking-[-0.025em] text-white">
              Stop Coordinating With Six Vendors.
            </h1>

            <Image
              src="/hero/mobile-building.webp"
              alt=""
              aria-hidden="true"
              width={420}
              height={293}
              sizes="(max-width: 639px) 420px, 1px"
              className="hero-mobile-building sm:hidden"
            />

            <p className="flex flex-wrap items-center gap-y-1 font-sans leading-none max-sm:hidden">
              <span className="inline-flex items-center bg-[#ED1D23] px-1 py-1 text-[clamp(1.75rem,8vw,3.375rem)] font-bold leading-none text-white">
                150 Days
              </span>
              <span className="pl-2 text-[clamp(1.15rem,4.5vw,2.375rem)] font-medium leading-none text-[#ED1D23]">
                not 9-12 months.
              </span>
            </p>
          </div>

          <div className="mt-6 flex flex-col items-start gap-[6px] max-sm:mt-0 sm:gap-3">
            <h2 className="text-[14px] font-bold leading-normal text-white sm:text-[clamp(1.25rem,3vw,1.625rem)] sm:font-semibold sm:leading-tight">
              One EPC Company Builds It All
            </h2>
            <p className="max-w-[891px] text-[14px] leading-normal text-[#A9A9A9] sm:text-[clamp(1rem,2.2vw,1.25rem)] sm:leading-[1.3]">
              Mekark is an EPC company across South India. Manufacturing, pharma
              and data infrastructure owners choose Mekark when their design has
              to be right and the shed has to be standing on schedule. Design,
              fabrication, civil and erection — run as a single turnkey
              construction company, under one contract, with one number to call.
            </p>
          </div>

          <ul className="hero-highlights mt-[13px] grid gap-x-6 gap-y-[6px] sm:mt-6 sm:grid-cols-2 sm:gap-y-5">
            {HERO_HIGHLIGHTS.map((highlight) => (
              <li
                key={highlight}
                className="flex min-w-0 items-center gap-2 px-3 text-[12px] leading-normal text-white/70 sm:items-start sm:px-0 sm:text-[16px] sm:leading-5"
              >
                <Image
                  src="/hero/highlight-arrow.svg"
                  alt=""
                  aria-hidden="true"
                  width={24}
                  height={24}
                  className="size-[15px] shrink-0 sm:size-6"
                />
                {highlight}
              </li>
            ))}
          </ul>

          <div className="hero-trust relative z-10 mt-[13px] w-full max-w-[847px] overflow-hidden rounded-[18px] max-sm:rounded-[10px] max-sm:bg-[linear-gradient(175.67deg,#08090A_1.29%,#654528_91.18%)] max-sm:py-6 sm:mt-6 bg-[linear-gradient(180deg,#060606_0.18%,rgba(105,63,29,0.5)_99.82%)] px-4 py-5 backdrop-blur-[500px] max-sm:backdrop-blur-none sm:px-8">
            <p className="text-[14px] font-semibold uppercase leading-5 text-[#ED1D23] sm:text-[#FA7783]">
              Trusted across India
            </p>
            <div className="hero-logo-marquee mt-4 sm:overflow-hidden">
              <div className="hero-logo-track grid grid-cols-4 gap-2 sm:flex sm:w-max sm:gap-0">
                {/* Desktop: list is doubled and the track slides -50% for a seamless CSS-only loop. */}
                {[...HERO_CLIENT_LOGOS, ...HERO_CLIENT_LOGOS].map((logo, i) => {
                  const index = i % HERO_CLIENT_LOGOS.length;
                  const isClone = i >= HERO_CLIENT_LOGOS.length;
                  return (
                    <div
                      key={`${logo.src}-${i}`}
                      aria-hidden={isClone || undefined}
                      className={`flex h-10 min-w-0 items-center justify-center rounded-md bg-[#F9F6F7] px-1 sm:mr-4 sm:w-[90px] sm:shrink-0 sm:rounded-lg ${
                        index > 3 || isClone ? "max-sm:hidden" : ""
                      }`}
                    >
                      <span className="relative block h-7 w-full max-w-[76px]">
                        <picture>
                          {index < 4 && (
                            <source media="(max-width: 639px)" srcSet={logo.src.replace('/logos/', '/logos/mobile-')} />
                          )}
                          <Image
                            src={logo.src}
                            alt={isClone ? "" : logo.alt}
                            fill
                            sizes="76px"
                            className="object-contain"
                          />
                        </picture>
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="hero-stats">
            {HERO_STATS.map((stat) => (
              <div key={stat.label} className="hero-stat">
                <p className="hero-stat-value">
                  {stat.value}
                  <span className={stat.suffix === " MT" ? "text-[0.65em] text-[#ED1D23]" : "text-[#C4161C]"}>{stat.suffix}</span>
                </p>
                <p className="hero-stat-label">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {renderCtaButtons("mt-6 hidden sm:flex sm:flex-wrap sm:items-center sm:gap-[30px]")}
        </div>

        <div id="consultation" className="mx-auto w-full min-w-0 max-w-[659px] rounded-[32px] bg-white/10 p-4 shadow-[0_26px_88px_rgba(0,0,0,0.45)] backdrop-blur-[15px] max-sm:mt-[11px] max-sm:rounded-[24px] max-sm:bg-black/30 max-sm:px-5 max-sm:py-6 sm:p-8">
          <div className="text-left sm:text-center">
            <h2 className="text-[24px] font-extrabold leading-normal sm:text-[1.35rem] sm:font-bold">Request Your Project Blueprint</h2>
            <p className="mt-[6px] text-[14px] font-medium text-white sm:mt-2 sm:text-xs sm:font-normal sm:text-white/90">
              Get a custom layout, cost range &amp; 150-day* timeline
            </p>
          </div>

          <HeroQuoteForm />
        </div>

        {renderCtaButtons("flex justify-center gap-[14px] sm:hidden")}
      </div>
    </section>
  );
}
