"use client";

import Image from "next/image";
import { ChangeEvent, FormEvent, useState } from "react";

type FormValues = {
  name: string;
  phoneNumber: string;
  email: string;
  projectLocation: string;
  projectType: string;
  sqft: string;
  requirements: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const INITIAL_FORM_VALUES: FormValues = {
  name: "",
  phoneNumber: "",
  email: "",
  projectLocation: "",
  projectType: "",
  sqft: "",
  requirements: "",
};

const PROJECT_TYPES = [
  "Factory Construction",
  "Industrial Shed",
  "Warehouse",
  "PEB Structure",
  "Manufacturing Plant",
  "Industrial Infrastructure",
];

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

const FORM_ENDPOINT = "/api/enquiry-form";

const WHATSAPP_MESSAGE =
  "Hello Mekark, I would like to discuss my industrial construction project.";

const PHONE_NUMBER = "9790924754";

const validateForm = (values: FormValues): FormErrors => {
  const errors: FormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Name is required";
  }

  if (!values.phoneNumber.trim()) {
    errors.phoneNumber = "Phone number is required";
  } else {
    const phoneDigits = values.phoneNumber.replace(/\D/g, "");

    if (phoneDigits.length < 10 || phoneDigits.length > 15) {
      errors.phoneNumber = "Enter a valid phone number";
    }
  }

  if (!values.projectType.trim()) {
    errors.projectType = "Select project type";
  }

  if (!values.sqft.trim()) {
    errors.sqft = "Select project size";
  }

  if (
    values.email.trim() &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())
  ) {
    errors.email = "Enter a valid email";
  }

  return errors;
};

const LABEL_CLASSNAME =
  "mb-2 block text-sm font-medium text-white/80 max-sm:sr-only";

const FIELD_CLASSNAME =
  "h-[46px] w-full rounded-lg border border-[#E2E2E2] bg-[#F0F0F0] px-[18px] text-base text-[#2B2B2B] outline-none transition-colors sm:text-xs placeholder:text-[#757575] focus:border-[#C4161C] focus:bg-white";

type FormFieldProps = {
  id: keyof FormValues;
  label: string;
  placeholder?: string;
  type?: string;
  value: string;
  onChange: (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
  error?: string;
  required?: boolean;
  maxLength?: number;
};

function FormField({
  id,
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  error,
  required = false,
  maxLength,
}: FormFieldProps) {
  return (
    <div>
      <label htmlFor={id} className={LABEL_CLASSNAME}>
        {label}

        {required && <span className="ml-1 text-[#FF6B6B]">*</span>}
      </label>

      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        maxLength={maxLength}
        value={value || ""}
        onChange={onChange}
        autoComplete="off"
        aria-invalid={Boolean(error)}
        className={`${FIELD_CLASSNAME} ${
          error ? "border-[#FF6B6B] focus:border-[#FF6B6B]" : ""
        }`}
      />

      {error ? <p className="mt-1 text-xs text-[#FF6B6B]">{error}</p> : null}
    </div>
  );
}

export default function HeroSection() {
  const [formValues, setFormValues] = useState<FormValues>(INITIAL_FORM_VALUES);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [statusMessage, setStatusMessage] = useState<{
    tone: "success" | "error";
    text: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const whatsappHref = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(
    WHATSAPP_MESSAGE,
  )}`;

  const handleInputChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = event.target;

    setFormValues((current) => ({
      ...current,
      [name]: value,
    }));

    setFormErrors((current) => {
      if (!current[name as keyof FormValues]) {
        return current;
      }

      const nextErrors = { ...current };
      delete nextErrors[name as keyof FormValues];
      return nextErrors;
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateForm(formValues);

    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      setStatusMessage({
        tone: "error",
        text: "Please correct the highlighted fields before submitting.",
      });
      return;
    }

    setFormErrors({});
    setStatusMessage(null);
    setIsSubmitting(true);

    try {
      const requestPayload = {
        name: formValues.name.trim(),
        email: formValues.email.trim(),
        phone: formValues.phoneNumber.trim(),
        location: formValues.projectLocation.trim(),
        sqf: formValues.sqft.trim(),
        message: formValues.requirements.trim(),
        service: formValues.projectType.trim(),
        sourceUrl: window.location.href,
        pageUrl: window.location.href,
      };

      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(requestPayload),
      });

      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          payload?.message ||
            "We could not submit your enquiry right now. Please try again.",
        );
      }

      setFormValues(INITIAL_FORM_VALUES);
      window.location.assign("/thank-you");
    } catch (error) {
      setStatusMessage({
        tone: "error",
        text:
          error instanceof Error
            ? error.message
            : "We could not submit your enquiry right now. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderCtaButtons = (wrapperClassName: string) => (
    <div className={wrapperClassName}>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-12 w-[140px] items-center justify-center gap-2 rounded-full bg-white px-5 text-[14px] font-bold leading-5 text-[#E5091F] transition-transform hover:-translate-y-0.5 sm:h-[55.333px] sm:w-auto sm:gap-[9.6px] sm:px-[24px] sm:text-[16px] sm:leading-6"
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
        className="inline-flex h-12 w-[140px] items-center justify-center gap-2 rounded-full border border-white px-5 text-[14px] font-bold leading-5 text-white transition-colors hover:bg-white hover:text-[#060606] sm:h-[55.333px] sm:w-auto sm:gap-[9.6px] sm:px-[24px] sm:text-[16px] sm:leading-6"
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
      {/* Background images can't take fetchpriority, so preload the mobile LCP layers (hoisted to <head> by React 19). */}
      <link
        rel="preload"
        as="image"
        href="/hero/mobile-image22.webp"
        media="(max-width: 639px)"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        href="/hero/mobile-overlay.webp"
        media="(max-width: 639px)"
        fetchPriority="high"
      />
      <div className="hero-mobile-background" aria-hidden="true" />
      <Image
        src="/hero/industrial-crane-bg.webp"
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        className="hero-sky absolute inset-0 -z-30 h-full w-full object-cover object-center blur-[2px]"
      />
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,#060606_24.831%,rgba(6,6,6,0.8)_42.674%,rgba(6,6,6,0)_88.021%)] max-sm:bg-none max-sm:bg-[rgba(6,6,6,0.65)]" />
      <Image
        src="/hero/industrial-building.webp"
        alt=""
        aria-hidden="true"
        width={1244}
        height={867}
        priority
        sizes="72vw"
        className="hero-building pointer-events-none absolute -bottom-[7%] right-[-6%] -z-10 hidden w-[72%] max-w-none object-contain lg:block"
      />

      <div className="hero-layout mx-auto grid w-full min-w-0 max-w-[1760px] gap-[13px] px-5 sm:gap-10 sm:px-6 lg:px-10 xl:grid-cols-[minmax(0,1fr)_minmax(18rem,540px)] xl:items-start xl:gap-10 2xl:gap-14">
        <div className="hero-copy min-w-0 max-w-[891px]">
          <div className="hero-heading-stage flex flex-col items-start gap-[10px]">
            <h1 className="max-w-[288px] font-sans text-[25px] font-bold leading-[30px] tracking-[-0.025em] text-white sm:max-w-[891px] sm:text-[clamp(2.35rem,7vw,3rem)] sm:leading-none">
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

          <div className="hero-trust relative z-10 mt-[13px] w-full max-w-[847px] overflow-hidden rounded-[18px] max-sm:rounded-[10px] max-sm:bg-[linear-gradient(175.67deg,#08090A_1.29%,#654528_91.18%)] max-sm:py-6 sm:mt-6 bg-[linear-gradient(180deg,#060606_0.18%,rgba(105,63,29,0.5)_99.82%)] px-4 py-5 backdrop-blur-[500px] sm:px-8">
            <p className="text-[14px] font-semibold uppercase leading-5 text-[#ED1D23] sm:text-[#FA7783]">
              Trusted across India
            </p>
            <div className="mt-4 flex flex-wrap justify-between gap-y-2 sm:grid sm:grid-cols-6 sm:gap-3">
              {HERO_CLIENT_LOGOS.map((logo, index) => (
                <div
                  key={logo.src}
                  className={`flex h-10 w-16 min-w-0 items-center justify-center rounded-md bg-[#F9F6F7] px-1 sm:w-auto sm:rounded-lg ${
                    index > 3 ? "max-sm:hidden" : ""
                  }`}
                >
                  <span className="relative block h-7 w-full max-w-[76px]">
                    <picture>
                      {index < 4 && (
                        <source media="(max-width: 639px)" srcSet={logo.src.replace('/logos/', '/logos/mobile-')} />
                      )}
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      fill
                      sizes="76px"
                      className="object-contain"
                    />
                    </picture>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-stats">
            {HERO_STATS.map((stat) => (
              <div key={stat.label} className="hero-stat">
                <p className="hero-stat-value">
                  {stat.value}
                  <span className={stat.suffix === " MT" ? "text-[#ED1D23]" : "text-[#C4161C]"}>{stat.suffix}</span>
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

          <form
            className="mt-4 space-y-3 sm:mt-7 sm:space-y-4"
            onSubmit={handleSubmit}
            noValidate
            autoComplete="off"
          >
            <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
              <FormField
                id="name"
                label="Full Name"
                placeholder="Enter Your name"
                value={formValues.name}
                onChange={handleInputChange}
                error={formErrors.name}
                required
              />
              <FormField
                id="projectLocation"
                label="Project Location"
                placeholder="Enter Project Location"
                value={formValues.projectLocation}
                onChange={handleInputChange}
                error={formErrors.projectLocation}
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
              <FormField
                id="phoneNumber"
                label="Mobile Number"
                type="tel"
                maxLength={15}
                placeholder="Mobile Number*"
                value={formValues.phoneNumber}
                onChange={handleInputChange}
                error={formErrors.phoneNumber}
                required
              />
              <FormField
                id="email"
                label="Email Address"
                type="email"
                placeholder="Enter Email Address"
                value={formValues.email}
                onChange={handleInputChange}
                error={formErrors.email}
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
              <div>
                <label htmlFor="projectType" className={LABEL_CLASSNAME}>
                  Industry Type<span className="ml-1 text-white">*</span>
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formValues.projectType}
                  onChange={handleInputChange}
                  className={`${FIELD_CLASSNAME} ${
                    formErrors.projectType ? "border-[#FF6B6B]" : ""
                  }`}
                >
                  <option value="">Select your Industry type</option>
                  {PROJECT_TYPES.map((projectType) => (
                    <option key={projectType} value={projectType}>
                      {projectType}
                    </option>
                  ))}
                </select>
                {formErrors.projectType ? (
                  <p className="mt-1 text-xs text-[#FFE0E0]">
                    {formErrors.projectType}
                  </p>
                ) : null}
              </div>

              <div>
                <label htmlFor="sqft" className={LABEL_CLASSNAME}>
                  Project Sq. Ft<span className="ml-1 text-white">*</span>
                </label>
                <select
                  id="sqft"
                  name="sqft"
                  value={formValues.sqft}
                  onChange={handleInputChange}
                  className={`${FIELD_CLASSNAME} ${
                    formErrors.sqft ? "border-[#FF6B6B]" : ""
                  }`}
                >
                  <option value="">Select Sq.ft Requirement</option>
                  <option value="10,000 - 20,000 Sq.ft">10,000 - 20,000 Sq.ft</option>
                  <option value="20,000 - 30,000 Sq.ft">20,000 - 30,000 Sq.ft</option>
                  <option value="30,000 - 50,000 Sq.ft">30,000 - 50,000 Sq.ft</option>
                  <option value="50,000+ Sq.ft">50,000+ Sq.ft</option>
                </select>
                {formErrors.sqft ? (
                  <p className="mt-1 text-xs text-[#FFE0E0]">{formErrors.sqft}</p>
                ) : null}
              </div>
            </div>

            <div>
              <label htmlFor="requirements" className={LABEL_CLASSNAME}>
                Requirement Details
              </label>
              <textarea
                id="requirements"
                name="requirements"
                rows={4}
                placeholder="Enter Requirement Details"
                value={formValues.requirements}
                onChange={handleInputChange}
                className="w-full resize-none rounded-lg border border-[#E2E2E2] bg-[#F0F0F0] px-[18px] py-3 text-base max-sm:h-[46px] sm:px-4 text-[#2B2B2B] outline-none sm:text-xs placeholder:text-[#757575] focus:border-[#C4161C] focus:bg-white"
              />
            </div>

            {statusMessage ? (
              <div
                className={`rounded-lg border px-4 py-3 text-sm ${
                  statusMessage.tone === "success"
                    ? "border-emerald-200/50 bg-emerald-950/35 text-emerald-50"
                    : "border-red-200/50 bg-red-950/35 text-red-50"
                }`}
              >
                {statusMessage.text}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex h-12 w-full items-center justify-center rounded-[10px] bg-[#C4161C] px-8 text-[14px] font-bold sm:h-16 sm:rounded-[9px] sm:text-base text-white shadow-[0_9px_18px_rgba(196,22,28,0.3)] transition-colors hover:bg-[#ED1D23] disabled:cursor-wait disabled:opacity-70"
            >
              {isSubmitting ? "Submitting..." : "Get My Free Quote →"}
            </button>
            <p className="text-center text-[0.68rem] tracking-[0.03em] text-white/80 max-sm:text-xs max-sm:font-medium max-sm:tracking-normal max-sm:text-[#8a8a8a]">
              100% Transparent Consultation with single point project support
            </p>
          </form>
        </div>

        {renderCtaButtons("flex justify-center gap-[14px] sm:hidden")}
      </div>
    </section>
  );
}
