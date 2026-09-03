"use client";
import Navbar from "../components/Navbar";
import IndustrialServicesUnified from "../components/IndustrialServicesUnified";
import EngineeringPartnerCta from "../components/engineering-partner-cta/EngineeringPartnerCta";
import IndustriesShowcase from "../components/IndustriesShowcase";
import WhyChooseUs from "../components/WhyChooseUs";
import WhyTopIndustries from "../components/WhyTopIndustries";
import FinalProjectCTA from "../components/FinalProjectCTA";
import ContactConversionSection from "../components/ContactConversionSection";
import FAQ from "../components/FAQ";
import ProcessTimeline from "../components/ProcessTimeline";
import PremiumFooter from "../components/PremiumFooter";
import TestimonialsSpotlight from "../components/TestimonialsSpotlight";
import ClientLogos from "../components/ClientLogos";
import AboutMekark from "../components/AboutMekark";
import { ChangeEvent, FormEvent, useState } from "react";
import { Phone, MessageCircle, ArrowUpRight, Check } from "lucide-react";
import { body } from "framer-motion/client";

type FormValues = {
  name: string;
  companyName: string;
  phoneNumber: string;
  email: string;
  projectLocation: string;
  projectType: string;
  sqft: string;
  startTimeline: string;
  budget: string;
  requirements: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const INITIAL_FORM_VALUES: FormValues = {
  name: "",
  companyName: "",
  phoneNumber: "",
  email: "",
  projectLocation: "",
  projectType: "",
  sqft: "",
  startTimeline: "",
  budget: "",
  requirements: "",
};

const START_TIMELINES = [
  "Immediately",
  "Within 1 Month",
  "Within 3 Months",
  "Planning for Future",
];

const BUDGETS = [
  "Below ₹50 Lakhs",
  "₹50 Lakhs – ₹1 Crore",
  "₹1 Crore – ₹5 Crores",
  "Above ₹5 Crores",
];

const PROJECT_TYPES = [
  "Factory Construction",
  "Industrial Shed",
  "Warehouse",
  "PEB Structure",
  "Manufacturing Plant",
  "Industrial Infrastructure",
];

const HERO_HIGHLIGHTS = [
  "18+ Years of Engineering Expertise",
  "10+ States Served Across India",
  "ISO 9001:2015 Certified",
  "Dedicated Project Management for On-Time Delivery",
  "Trusted by 500+ Industrial & Manufacturing Clients",
] as const;

const FORM_ENDPOINT = "/api/enquiry-form";

const validateForm = (values: FormValues): FormErrors => {
  const errors: FormErrors = {};

  // REQUIRED FIELDS

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

  if (!values.startTimeline.trim()) {
    errors.startTimeline = "Please select a project start timeline";
  }

  if (!values.budget.trim()) {
    errors.budget = "Please select a project budget";
  }

  // OPTIONAL EMAIL VALIDATION

  if (
    values.email.trim() &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())
  ) {
    errors.email = "Enter a valid email";
  }

  return errors;
};

const LABEL_CLASSNAME = "mb-2 block text-sm font-medium text-white/80";

const FIELD_CLASSNAME =
  "h-[46px] w-full rounded-xl border border-white/10 bg-white/10 px-4 text-sm text-white outline-none backdrop-blur-md transition-all duration-300 placeholder:text-white/40 focus:border-[#C4161C] focus:bg-white/15";
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

export default function Home() {
  const [formValues, setFormValues] = useState<FormValues>(INITIAL_FORM_VALUES);

  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const [statusMessage, setStatusMessage] = useState<{
    tone: "success" | "error";
    text: string;
  } | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

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
    console.log("FORM VALUES:", formValues);

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
        company: formValues.companyName.trim(),
        sqf: formValues.sqft.trim(),
        startTimeline: formValues.startTimeline.trim(),
        budget: formValues.budget.trim(),
        message: formValues.requirements.trim(),
        service: formValues.projectType.trim(),
        sourceUrl: window.location.href,
        pageUrl: window.location.href,
      };

      console.log("REQUEST PAYLOAD:", requestPayload);
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },

        // FIXED API PAYLOAD
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

  const WHATSAPP_MESSAGE =
    "Hello Mekark, I would like to discuss my industrial construction project.";

  const PHONE_NUMBER = "9790924754";

  const whatsappHref = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(
    WHATSAPP_MESSAGE,
  )}`;

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#18181B]">
      <Navbar />
      {/* Hero Section */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 sm:min-h-screen sm:pt-20">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 z-0 h-full w-full object-cover object-[50%_38%]"
        >
          <source src="/hero/hero-video-bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,rgba(9,9,11,0.9)_0%,rgba(9,9,11,0.84)_28%,rgba(9,9,11,0.58)_54%,rgba(9,9,11,0.24)_78%,rgba(9,9,11,0.22)_100%)] sm:bg-[linear-gradient(90deg,rgba(9,9,11,0.96)_0%,rgba(9,9,11,0.92)_32%,rgba(9,9,11,0.8)_48%,rgba(9,9,11,0.54)_66%,rgba(9,9,11,0.34)_82%,rgba(9,9,11,0.28)_100%)]" />
        <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,rgba(196,22,28,0.18),transparent_34%),linear-gradient(180deg,rgba(9,9,11,0.28)_0%,rgba(9,9,11,0.08)_46%,rgba(9,9,11,0)_72%)] sm:inset-y-0 sm:left-0 sm:right-auto sm:w-2/3 sm:bg-[radial-gradient(circle_at_top_left,rgba(196,22,28,0.18),transparent_34%),linear-gradient(90deg,rgba(9,9,11,0.56)_0%,rgba(9,9,11,0.3)_48%,rgba(9,9,11,0)_68%)] lg:w-3/5 xl:w-1/2" />
        <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_bottom_right,rgba(9,9,11,0.78),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(196,22,28,0.12),transparent_22%)] sm:bg-[radial-gradient(circle_at_bottom_right,rgba(9,9,11,0.9),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(196,22,28,0.1),transparent_18%)]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-1/3 bg-[linear-gradient(90deg,rgba(9,9,11,0)_0%,rgba(9,9,11,0.18)_24%,rgba(9,9,11,0.56)_62%,rgba(9,9,11,0.82)_100%)] lg:block" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-44 bg-[linear-gradient(180deg,transparent,rgba(9,9,11,0.82))]" />

        <div className="relative z-20 mx-auto grid w-full max-w-7xl grid-cols-1 px-4 pb-10 sm:px-6 sm:pb-14 lg:grid-cols-2 lg:items-center lg:px-8">
          <div className="flex min-w-0 flex-col items-center justify-center py-8 text-center sm:items-start sm:text-left lg:max-w-2xl lg:py-12">
          {/* <div className="text-[0.72rem] font-semibold uppercase tracking-[0.38em] text-[#C4161C]">
              India&apos;s Trusted Factory &amp; EPC Partner
            </div> */}
            <h1 className="hero-heading mt-5 drop-shadow-[0_14px_40px_rgba(9,9,11,0.46)]">
              <span className="hero-heading-line text-[clamp(2.35rem,7.2vw,4.75rem)] leading-[0.92]">
                <span className="hero-heading-main inline-block !font-bold !text-[#C4161C]">
                  Stop Coordinating
                  <br />
                  with Six Vendors.
                </span>
              </span>
              <span className="hero-heading-line mt-3 text-[clamp(1.2rem,3.4vw,2.15rem)] leading-[1.05] tracking-[0.04em] text-white/92">
                <span className="hero-heading-support inline-block !font-semibold">
                  One EPC Company Builds It All.
                </span>
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-[0.96rem] leading-7 text-white/84 md:text-[1rem] md:leading-8">
              Mekark is an EPC company across South India. Manufacturing, pharma
              and data infrastructure owners choose Mekark when their design has
              to be right and the shed has to be standing on schedule. Design,
              fabrication, civil and erection — run as a single turnkey
              construction company, under one contract, with one number to call.
            </p>

            <ul className="mt-6 w-full max-w-xl space-y-2.5 text-left">
              {HERO_HIGHLIGHTS.map((highlight) => (
                <li key={highlight} className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-4 w-4 flex-none items-center justify-center text-[#C4161C]">
                    <Check className="h-4 w-4" strokeWidth={2.5} />
                  </span>
                  <span className="text-[0.88rem] leading-6 text-white/88 sm:text-[0.92rem]">
                    {highlight}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex w-full max-w-xl items-center justify-center gap-3 sm:justify-start">
              <span
                aria-hidden="true"
                className="h-8 w-px flex-none bg-[#C4161C] sm:h-9"
              />
              <p className="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-white/90 sm:text-[0.88rem]">
                One Team. One Contract. One Responsible Partner.
              </p>
            </div>
            {/* REVIEW BADGE */}

            <div className="mt-8 flex flex-col items-center gap-4 text-center sm:flex-row sm:items-center sm:text-left">
              {/* CLIENT LOGOS */}

              <div className="flex -space-x-3">
                <img
                  src="/Clients/komatsu.png"
                  alt="Komatsu"
                  className="h-10 w-10 rounded-full border-2 border-white bg-white object-cover p-1 sm:h-12 sm:w-12"
                />

                <img
                  src="/Clients/orbittal.png"
                  alt="Orbittal"
                  className="h-10 w-10 rounded-full border-2 border-white bg-white object-cover p-1 sm:h-12 sm:w-12"
                />

                <img
                  src="/Clients/srf.png"
                  alt="SRF"
                  className="h-10 w-10 rounded-full border-2 border-white bg-white object-cover p-1 sm:h-12 sm:w-12"
                />
              </div>

              {/* REVIEW CONTENT */}

              <div className="flex flex-col items-center sm:items-start">
                {/* STARS */}

                <div className="flex items-center gap-1 leading-none">
                  <span className="text-[16px] text-[#FFD54A] sm:text-[18px]">
                    ★
                  </span>
                  <span className="text-[16px] text-[#FFD54A] sm:text-[18px]">
                    ★
                  </span>
                  <span className="text-[16px] text-[#FFD54A] sm:text-[18px]">
                    ★
                  </span>
                  <span className="text-[16px] text-[#FFD54A] sm:text-[18px]">
                    ★
                  </span>
                  <span className="text-[16px] text-[#FFD54A] sm:text-[18px]">
                    ★
                  </span>
                </div>

                <p className="mt-1 text-sm font-medium leading-tight text-white sm:text-[15px]">
                  Trusted by 500+ Industrial Clients
                </p>

                <p className="mt-1 text-[11px] font-bold leading-tight text-white/65 sm:text-xs">
                  Rated 4.7/5 for execution quality
                </p>
              </div>
            </div>

            {/* DESKTOP BUTTONS */}

            <div className="mt-8 hidden sm:flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:items-center">
              {/* WHATSAPP BUTTON */}

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full max-w-[19rem] items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 text-[0.96rem] font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:bg-[#1ebe5d] hover:shadow-xl sm:w-auto sm:max-w-none sm:px-9 sm:text-base"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp Us
              </a>

              {/* CALL BUTTON */}

              <a
                href={`tel:${PHONE_NUMBER}`}
                className="inline-flex w-full max-w-[19rem] items-center justify-center gap-2 rounded-full border border-white/18 bg-white/10 px-7 py-3.5 text-[0.96rem] font-semibold text-white shadow-[0_16px_34px_rgba(9,9,11,0.18)] backdrop-blur-[2px] transition-colors duration-300 hover:bg-white hover:text-[#09090B] sm:w-auto sm:max-w-none sm:px-8 sm:text-base"
              >
                <Phone className="h-5 w-5" />
                Call Us
              </a>
            </div>
          </div>
          <div className="relative mt-10 lg:mt-0 flex justify-center lg:justify-end">
            <div className="w-full max-w-[490px] rounded-[26px] border border-white/10 bg-white/8 p-4 backdrop-blur-xl shadow-[0_24px_60px_rgba(0,0,0,0.4)] sm:p-5">
              <div className="mb-4">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-[#C4161C]">
                  Request Consultation
                </p>

                <h3 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
                  Start Your Industrial Project
                </h3>

                <p className="mt-2 text-[13px] leading-6 text-white/70">
                  {" "}
                  Share your requirement and our EPC specialists will contact
                  you with planning, budgeting, and execution support.
                </p>
              </div>

              <form
                className="space-y-3"
                onSubmit={handleSubmit}
                noValidate
                autoComplete="off"
              >
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    id="name"
                    label="Name"
                    placeholder="Your name"
                    value={formValues.name}
                    onChange={handleInputChange}
                    error={formErrors.name}
                    required
                  />

                  <FormField
                    id="companyName"
                    label="Company"
                    placeholder="Company / organization"
                    value={formValues.companyName}
                    onChange={handleInputChange}
                    error={formErrors.companyName}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    id="phoneNumber"
                    label="Phone"
                    type="tel"
                    maxLength={10}
                    placeholder="Phone number"
                    value={formValues.phoneNumber}
                    onChange={handleInputChange}
                    error={formErrors.phoneNumber}
                    required
                  />

                  <FormField
                    id="email"
                    label="Email"
                    type="email"
                    placeholder="name@company.com"
                    value={formValues.email || ""}
                    onChange={handleInputChange}
                    error={formErrors.email}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    id="projectLocation"
                    label="Project Location"
                    placeholder="City / site location"
                    value={formValues.projectLocation}
                    onChange={handleInputChange}
                    error={formErrors.projectLocation}
                  />

                  <div>
                    <label
                      htmlFor="projectType"
                      className="mb-2 block text-sm font-medium text-white/80"
                    >
                      Project Type
                      <span className="ml-1 text-[#FF6B6B]">*</span>
                    </label>

                    <select
                      id="projectType"
                      name="projectType"
                      value={formValues.projectType}
                      onChange={handleInputChange}
                      className={`h-[46px] w-full rounded-xl border border-white/10 bg-white/10 px-4 text-sm text-white outline-none backdrop-blur-md transition-all duration-300 focus:border-[#C4161C] focus:bg-white/15 ${
                        formErrors.projectType
                          ? "border-[#FF6B6B] focus:border-[#FF6B6B]"
                          : ""
                      }`}
                    >
                      <option value="" className="text-black">
                        Select Project Type
                      </option>

                      {PROJECT_TYPES.map((projectType) => (
                        <option
                          key={projectType}
                          value={projectType}
                          className="text-black"
                        >
                          {projectType}
                        </option>
                      ))}
                    </select>

                    {formErrors.projectType ? (
                      <p className="mt-1 text-xs text-[#FF6B6B]">
                        {formErrors.projectType}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="sqft"
                    className="mb-2 block text-sm font-medium text-white/80"
                  >
                    Project sq.ft
                    <span className="ml-1 text-[#FF6B6B]">*</span>
                  </label>

                  <select
                    id="sqft"
                    name="sqft"
                    value={formValues.sqft}
                    onChange={handleInputChange}
                    className={`h-[46px] w-full rounded-xl border border-white/10 bg-white/10 px-4 text-sm text-white outline-none backdrop-blur-md transition-all duration-300 focus:border-[#C4161C] focus:bg-white/15 ${
                      formErrors.sqft
                        ? "border-[#FF6B6B] focus:border-[#FF6B6B]"
                        : ""
                    }`}
                  >
                    <option value="" className="text-black">
                      Select Project Size
                    </option>

                    <option
                      value="10,000 - 20,000 Sq.ft"
                      className="text-black"
                    >
                      10,000 - 20,000 Sq.ft
                    </option>

                    <option
                      value="20,000 - 30,000 Sq.ft"
                      className="text-black"
                    >
                      20,000 - 30,000 Sq.ft
                    </option>

                    <option
                      value="30,000 - 50,000 Sq.ft"
                      className="text-black"
                    >
                      30,000 - 50,000 Sq.ft
                    </option>

                    <option value="50,000+ Sq.ft" className="text-black">
                      50,000+ Sq.ft
                    </option>
                  </select>

                  {formErrors.sqft ? (
                    <p className="mt-1 text-xs text-[#FF6B6B]">
                      {formErrors.sqft}
                    </p>
                  ) : null}
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="startTimeline"
                      className="mb-2 block text-sm font-medium text-white/80"
                    >
                      Project Start Timeline
                      <span className="ml-1 text-[#FF6B6B]">*</span>
                    </label>

                    <select
                      id="startTimeline"
                      name="startTimeline"
                      value={formValues.startTimeline}
                      onChange={handleInputChange}
                      className={`h-[46px] w-full rounded-xl border border-white/10 bg-white/10 px-4 text-sm text-white outline-none backdrop-blur-md transition-all duration-300 focus:border-[#C4161C] focus:bg-white/15 ${
                        formErrors.startTimeline
                          ? "border-[#FF6B6B] focus:border-[#FF6B6B]"
                          : ""
                      }`}
                    >
                      <option value="" className="text-black">
                        Select timeline
                      </option>
                      {START_TIMELINES.map((option) => (
                        <option
                          key={option}
                          value={option}
                          className="text-black"
                        >
                          {option}
                        </option>
                      ))}
                    </select>

                    {formErrors.startTimeline ? (
                      <p className="mt-1 text-xs text-[#FF6B6B]">
                        {formErrors.startTimeline}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label
                      htmlFor="budget"
                      className="mb-2 block text-sm font-medium text-white/80"
                    >
                      Project Budget
                      <span className="ml-1 text-[#FF6B6B]">*</span>
                    </label>

                    <select
                      id="budget"
                      name="budget"
                      value={formValues.budget}
                      onChange={handleInputChange}
                      className={`h-[46px] w-full rounded-xl border border-white/10 bg-white/10 px-4 text-sm text-white outline-none backdrop-blur-md transition-all duration-300 focus:border-[#C4161C] focus:bg-white/15 ${
                        formErrors.budget
                          ? "border-[#FF6B6B] focus:border-[#FF6B6B]"
                          : ""
                      }`}
                    >
                      <option value="" className="text-black">
                        Select budget range
                      </option>
                      {BUDGETS.map((option) => (
                        <option
                          key={option}
                          value={option}
                          className="text-black"
                        >
                          {option}
                        </option>
                      ))}
                    </select>

                    {formErrors.budget ? (
                      <p className="mt-1 text-xs text-[#FF6B6B]">
                        {formErrors.budget}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="requirements"
                    className="mb-2 block text-sm font-medium text-white/80"
                  >
                    Requirements
                  </label>

                  <textarea
                    id="requirements"
                    name="requirements"
                    rows={3}
                    placeholder="Describe your industrial project requirements..."
                    value={formValues.requirements || ""}
                    onChange={handleInputChange}
                    className="w-full rounded-2xl border border-white/10 bg-white/10 p-4 text-sm text-white outline-none backdrop-blur-md transition-all duration-300 placeholder:text-white/40 focus:border-[#C4161C] focus:bg-white/15"
                  />

                  {formErrors.requirements ? (
                    <p className="mt-2 text-sm text-[#FF6B6B]">
                      {formErrors.requirements}
                    </p>
                  ) : null}
                </div>

                {statusMessage ? (
                  <div
                    className={`rounded-xl border px-4 py-3 text-sm ${
                      statusMessage.tone === "success"
                        ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-200"
                        : "border-red-400/30 bg-red-500/10 text-red-200"
                    }`}
                  >
                    {statusMessage.text}
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex h-[46px] w-full items-center justify-center rounded-full bg-[#C4161C] px-7 text-sm font-semibold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:bg-white hover:text-black"
                >
                  {isSubmitting ? "Submitting..." : "Submit Project Request"}
                </button>
              </form>
              {/* MOBILE CTA BUTTONS */}

              <div className="mt-4 flex flex-col gap-3 sm:hidden">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-[46px] w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 text-sm font-semibold text-white"
                >
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp Us
                </a>

                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="inline-flex h-[46px] w-full items-center justify-center gap-2 rounded-full border border-white/18 bg-white/10 px-6 text-sm font-semibold text-white"
                >
                  <Phone className="h-5 w-5" />
                  Call Us
                </a>
              </div>
            </div>
          </div>{" "}
        </div>
      </section>

      <ClientLogos />

      <AboutMekark />

      <IndustrialServicesUnified />

      {/* <FinalProjectCTA /> */}

      <EngineeringPartnerCta />

      <IndustriesShowcase />

      <ProcessTimeline />

      <WhyChooseUs />

      <WhyTopIndustries />

      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[#18181B] mb-8">
            Our Factories
          </h2>
          <div className="flex flex-col items-center space-y-8">
            <div className="flex flex-row flex-wrap justify-center gap-4">
              <img
                src="/factories/lct/lct1.jpg"
                alt="Factory 1"
                className="w-64 h-40 object-cover rounded-lg shadow-md"
              />
              <img
                src="/factories/lct/lct2.jpg"
                alt="Factory 2"
                className="w-64 h-40 object-cover rounded-lg shadow-md"
              />
              <img
                src="/factories/lct/lct3.jpg"
                alt="Factory 3"
                className="w-64 h-40 object-cover rounded-lg shadow-md"
              />
              <img
                src="/factories/lct/lct4.jpg"
                alt="Factory 4"
                className="w-64 h-40 object-cover rounded-lg shadow-md"
              />
            </div>
            <div className="flex flex-row flex-wrap justify-center gap-4">
              <img
                src="/factories/lct/lct5.jpg"
                alt="Factory 5"
                className="w-64 h-40 object-cover rounded-lg shadow-md"
              />
              <img
                src="/factories/lct/lct6.jpg"
                alt="Factory 6"
                className="w-64 h-40 object-cover rounded-lg shadow-md"
              />
              <img
                src="/factories/lct/lct7.jpg"
                alt="Factory 7"
                className="w-64 h-40 object-cover rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </section>

      <TestimonialsSpotlight />

      {/* FAQ */}
      <FAQ />

      <ContactConversionSection />

      <PremiumFooter />
    </div>
  );
}
