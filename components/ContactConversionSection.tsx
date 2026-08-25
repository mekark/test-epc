"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  Mail,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const CAPABILITY_CHIPS = [
  "Turnkey Execution",
  "Industrial Civil Works",
  "MEP & Utilities",
  "Tanks & Infrastructure",
] as const;

const TRUST_POINTS = [
  "Execution-led delivery for industrial projects from concept to commissioning.",
  "Quality, safety, and project coordination structured for long-term operational value.",
  "Built for manufacturing facilities, industrial plants, and heavy infrastructure requirements.",
] as const;

const PROJECT_TYPES = [
  "Factory Construction",
  "Industrial Civil Works",
  "MEP & Utility Systems",
  "Industrial Tanks",
  "Turnkey Industrial Project",
  "Other",
] as const;

const START_TIMELINES = [
  "Immediately",
  "Within 1 Month",
  "Within 3 Months",
  "Planning for Future",
] as const;

const BUDGETS = [
  "Below ₹50 Lakhs",
  "₹50 Lakhs – ₹1 Crore",
  "₹1 Crore – ₹5 Crores",
  "Above ₹5 Crores",
] as const;

const EASE_OUT = [0.215, 0.61, 0.355, 1] as const;
const FORM_ENDPOINT = "/api/enquiry-form";
const THANK_YOU_URL = "https://www.mekark.com/thank-you";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LABEL_CLASSNAME =
  "mb-3 block text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#18181B]";
const FIELD_CLASSNAME =
  "h-[3.6rem] w-full rounded-xl border border-[#E4E4E7] bg-[#FAFAFA]/78 px-4.5 text-[0.98rem] text-[#18181B] shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] outline-none transition-[border-color,box-shadow,background-color] duration-300 placeholder:text-[#52525B]/88 hover:border-[#C4161C]/35 focus:border-[#C4161C] focus:bg-[#FFFFFF] focus:shadow-[0_0_0_4px_rgba(196,22,28,0.16)]";

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

function FormField({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  maxLength,

}: 
{
  id: keyof FormValues;
  label: React.ReactNode;
  type?: "text" | "email" | "tel";
  placeholder: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  maxLength?: number;

}) {
  return (
    <div>
      <label htmlFor={id} className={LABEL_CLASSNAME}>
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        maxLength={maxLength}
        value={value}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        className={`${FIELD_CLASSNAME} ${error
          ? "border-[#C4161C] bg-[#FFF5F5] focus:shadow-[0_0_0_4px_rgba(196,22,28,0.12)]"
          : ""
          }`}
      />
      {error ? <p className="mt-2 text-sm text-[#C4161C]">{error}</p> : null}
    </div>
  );
}

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

export default function ContactConversionSection() {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const [formValues, setFormValues] = useState<FormValues>(INITIAL_FORM_VALUES);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [statusMessage, setStatusMessage] = useState<{
    tone: "success" | "error";
    text: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
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
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formValues.name.trim(),
          email: formValues.email.trim(),
          phone: formValues.phoneNumber.trim(),
          location: formValues.projectLocation.trim(),
          company: formValues.companyName.trim(),
          service: formValues.projectType.trim(),
          sqf: formValues.sqft.trim(),
          startTimeline: formValues.startTimeline.trim(),
          budget: formValues.budget.trim(),
          message: formValues.requirements.trim(),
        }),
      });

      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          payload?.message || "We could not submit your enquiry right now. Please try again."
        );
      }

      setFormValues(INITIAL_FORM_VALUES);
      window.location.assign(THANK_YOU_URL);
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

  return (
    <section className="relative overflow-hidden border-t border-[#E4E4E7]/10 bg-[#09090B] pb-24 pt-20 md:pb-32 md:pt-40">
      {/* Engineered Technical Background */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.35] mix-blend-screen">
        <svg className="absolute h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="tech-grid-sm"
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 24 0 L 0 0 0 24"
                fill="none"
                stroke="#A1A1AA"
                strokeWidth="0.5"
                strokeOpacity="0.25"
              />
            </pattern>
            <pattern
              id="tech-grid-lg"
              width="144"
              height="144"
              patternUnits="userSpaceOnUse"
            >
              <rect width="144" height="144" fill="url(#tech-grid-sm)" />
              <path
                d="M 144 0 L 0 0 0 144"
                fill="none"
                stroke="#52525B"
                strokeWidth="1"
                strokeOpacity="0.3"
              />
              {/* Corner Registration Marks */}
              <path
                d="M 0 0 L 8 0 M 0 0 L 0 8 M 144 144 L 136 144 M 144 144 L 144 136 M 144 0 L 136 0 M 144 0 L 144 8 M 0 144 L 8 144 M 0 144 L 0 136"
                fill="none"
                stroke="#C4161C"
                strokeWidth="1.5"
                strokeOpacity="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#tech-grid-lg)" />

          {/* Structural Guideline Dashes */}
          <g stroke="#C4161C" strokeOpacity="0.15" strokeWidth="1" fill="none" strokeDasharray="4 6">
            <line x1="33%" y1="0" x2="33%" y2="100%" />
            <line x1="66%" y1="0" x2="66%" y2="100%" />
            <line x1="0" y1="33%" x2="100%" y2="33%" />
            <line x1="0" y1="66%" x2="100%" y2="66%" />
          </g>

          {/* Elevation / Scale Marking Element */}
          <g stroke="#E4E4E7" strokeOpacity="0.4" strokeWidth="1" fill="none">
            <path d="M 20 40 L 20 280" />
            <path d="M 14 40 L 26 40 M 14 100 L 26 100 M 14 160 L 26 160 M 14 220 L 26 220 M 14 280 L 26 280" />
            <path d="M 17 70 L 23 70 M 17 130 L 23 130 M 17 190 L 23 190 M 17 250 L 23 250" strokeOpacity="0.2" />
          </g>
        </svg>

        {/* Dynamic vignette to draw focus to content and darken edges */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(9,9,11,0.96)_100%)]" />
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-4">
        <div className="flex flex-col gap-12 lg:gap-14">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.65,
              ease: EASE_OUT,
            }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="text-[0.72rem] font-semibold uppercase tracking-[0.38em] text-[#C4161C]">
              Project Consultation
            </div>
            <h2 className="mt-5 text-[2.6rem] font-semibold tracking-[-0.03em] text-[#FFFFFF] md:text-[3.35rem] md:leading-[1.04]">
              Start Your Factory Construction Project
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-[0.98rem] leading-7 text-[#E4E4E7] md:text-lg md:leading-8">
              Speak with our team about your manufacturing facility, industrial plant, utility infrastructure, or heavy engineering project requirements. We deliver turnkey solutions with a focus on execution quality, safety, and long-term operational value.
            </p>

            <p className="mx-auto mt-7 max-w-2xl text-[0.98rem] leading-7 text-[#E4E4E7] md:text-lg md:leading-8">
              Discuss your manufacturing facility, industrial plant, or heavy infrastructure requirement with our team.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {CAPABILITY_CHIPS.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-[#E4E4E7]/14 bg-[#18181B]/46 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#E4E4E7]"
                >
                  {chip}
                </span>
              ))}
            </div>

            <div className="mx-auto mt-10 max-w-xl space-y-4 text-left">
              <div className="rounded-[1rem] border border-[#E4E4E7]/12 bg-[#18181B]/48 p-5">
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 flex-none text-[#C4161C]" />
                  <div>
                    <div className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[#A1A1AA]">
                      Email
                    </div>
                    <div className="mt-2 text-sm leading-6 text-[#E4E4E7]">
                      admin@mekark.com
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div className="mx-auto mt-10 max-w-2xl border-t border-[#E4E4E7]/12 pt-8 text-left">
              <div className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-[#C4161C]">
                Why Teams Enquire
              </div>
              <ul className="mt-5 space-y-4">
                {TRUST_POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-[#C4161C]" />
                    <span className="text-sm leading-7 text-[#E4E4E7]">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            id="contact"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.65,
              delay: prefersReducedMotion ? 0 : 0.08,
              ease: EASE_OUT,
            }}
            className="relative w-full scroll-mt-28 md:scroll-mt-32"
          >
            <div className="absolute inset-x-8 top-5 h-10 rounded-full bg-[#C4161C]/12 blur-2xl" />
            <div className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-[1.35rem] border border-[#E4E4E7] bg-[#FFFFFF] p-5 shadow-[0_34px_90px_-52px_rgba(24,24,27,0.22)] sm:p-6 md:rounded-[1.5rem] md:p-10 lg:p-12">
              <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#C4161C,rgba(196,22,28,0.16),transparent)]" />
              <div className="relative">
                <div className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-[#C4161C]">
                  Submit Requirements
                </div>
                <h3 className="mt-4 text-[1.7rem] font-semibold tracking-[-0.03em] text-[#09090B] md:text-[2.2rem]">
                  Request a Project Consultation
                </h3>
                <p className="mt-3 max-w-lg text-sm leading-7 text-[#52525B]">
                  Share your project details and our team will contact you to discuss execution scope, timelines, and industrial infrastructure requirements.
                </p>

                <div className="mt-8 rounded-[1.15rem] border border-[#E4E4E7]/80 bg-[#FAFAFA]/72 p-5 md:p-7 lg:p-8">
                  <div className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[#52525B]">
                    Project Intake Form
                  </div>
                  <form className="mt-7 space-y-7" onSubmit={handleSubmit} noValidate>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-7">
                      <FormField
                        id="name"
                        label={
                          <>
                            Name
                            <span className="ml-1 text-[#FF6B6B]">*</span>
                          </>
                        }
                        placeholder="Your name"
                        value={formValues.name}
                        onChange={handleInputChange}
                        error={formErrors.name}
                      />
                      <FormField
                        id="companyName"
                        label="Company Name"
                        placeholder="Company / organization"
                        value={formValues.companyName}
                        onChange={handleInputChange}
                        error={formErrors.companyName}
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-7">
                      <FormField
                        id="phoneNumber"
                        label={
                          <>
                            Phone Number
                            <span className="ml-1 text-[#FF6B6B]">*</span>
                          </>
                        }
                        type="tel"
                        placeholder="Phone number"
                        maxLength={10}
                        value={formValues.phoneNumber}
                        onChange={handleInputChange}
                        error={formErrors.phoneNumber}
                      />
                      <FormField
                        id="email"
                        label="Email"
                        type="email"
                        placeholder="name@company.com"
                        value={formValues.email}
                        onChange={handleInputChange}
                        error={formErrors.email}
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-7">
                      <FormField
                        id="projectLocation"
                        label="Project Location"
                        placeholder="City / site location"
                        value={formValues.projectLocation}
                        onChange={handleInputChange}
                        error={formErrors.projectLocation}
                      />
                      <div>
                        <label htmlFor="projectType" className={LABEL_CLASSNAME}>
                          Project Type
                          <span className="ml-1 text-[#FF6B6B]">*</span>

                        </label>
                        <select
                          id="projectType"
                          name="projectType"
                          className={`${FIELD_CLASSNAME} ${formErrors.projectType
                            ? "border-[#C4161C] bg-[#FFF5F5] focus:shadow-[0_0_0_4px_rgba(196,22,28,0.12)]"
                            : ""
                            }`}
                          value={formValues.projectType}
                          onChange={handleInputChange}
                          aria-invalid={Boolean(formErrors.projectType)}
                        >
                          <option value="" disabled>
                            Select Project Type
                          </option>
                          {PROJECT_TYPES.map((projectType) => (
                            <option key={projectType} value={projectType}>
                              {projectType}
                            </option>
                          ))}
                        </select>
                        {formErrors.projectType ? (
                          <p className="mt-2 text-sm text-[#C4161C]">{formErrors.projectType}</p>
                        ) : null}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="sqft"
                        className="mb-2 block text-sm font-medium text-black/80"
                      >
                        Project sq.ft
                        <span className="ml-1 text-[#FF6B6B]">*</span>
                      </label>

                      <select
                        id="sqft"
                        name="sqft"
                        value={formValues.sqft}
                        onChange={handleInputChange}
                        className={`h-[46px] w-full rounded-xl border border-white/10 bg-white/10 px-4 text-sm text-black outline-none backdrop-blur-md transition-all duration-300 focus:border-[#C4161C] focus:bg-white/15 ${formErrors.sqft
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

                        <option
                          value="50,000+ Sq.ft"
                          className="text-black"
                        >
                          50,000+ Sq.ft
                        </option>
                      </select>

                      {formErrors.sqft ? (
                        <p className="mt-1 text-xs text-[#FF6B6B]">
                          {formErrors.sqft}
                        </p>
                      ) : null}
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-7">
                      <div>
                        <label htmlFor="startTimeline" className={LABEL_CLASSNAME}>
                          Project Start Timeline
                          <span className="ml-1 text-[#FF6B6B]">*</span>
                        </label>
                        <select
                          id="startTimeline"
                          name="startTimeline"
                          className={`${FIELD_CLASSNAME} ${formErrors.startTimeline
                            ? "border-[#C4161C] bg-[#FFF5F5] focus:shadow-[0_0_0_4px_rgba(196,22,28,0.12)]"
                            : ""
                            }`}
                          value={formValues.startTimeline}
                          onChange={handleInputChange}
                          aria-invalid={Boolean(formErrors.startTimeline)}
                        >
                          <option value="" disabled>
                            Select timeline
                          </option>
                          {START_TIMELINES.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        {formErrors.startTimeline ? (
                          <p className="mt-2 text-sm text-[#C4161C]">
                            {formErrors.startTimeline}
                          </p>
                        ) : null}
                      </div>

                      <div>
                        <label htmlFor="budget" className={LABEL_CLASSNAME}>
                          Project Budget
                          <span className="ml-1 text-[#FF6B6B]">*</span>
                        </label>
                        <select
                          id="budget"
                          name="budget"
                          className={`${FIELD_CLASSNAME} ${formErrors.budget
                            ? "border-[#C4161C] bg-[#FFF5F5] focus:shadow-[0_0_0_4px_rgba(196,22,28,0.12)]"
                            : ""
                            }`}
                          value={formValues.budget}
                          onChange={handleInputChange}
                          aria-invalid={Boolean(formErrors.budget)}
                        >
                          <option value="" disabled>
                            Select budget range
                          </option>
                          {BUDGETS.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        {formErrors.budget ? (
                          <p className="mt-2 text-sm text-[#C4161C]">
                            {formErrors.budget}
                          </p>
                        ) : null}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="requirements" className={LABEL_CLASSNAME}>
                        Message / Requirements
                      </label>
                      <textarea
                        id="requirements"
                        name="requirements"
                        rows={7}
                        placeholder="Outline your project scope, facility type, timelines, and utility requirements."
                        value={formValues.requirements}
                        onChange={handleInputChange}
                        aria-invalid={Boolean(formErrors.requirements)}
                        className={`w-full rounded-xl border border-[#E4E4E7] bg-[#FAFAFA]/78 p-4.5 text-[0.98rem] text-[#18181B] shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] outline-none transition-[border-color,box-shadow,background-color] duration-300 placeholder:text-[#52525B]/88 hover:border-[#C4161C]/35 focus:border-[#C4161C] focus:bg-[#FFFFFF] focus:shadow-[0_0_0_4px_rgba(196,22,28,0.16)] ${formErrors.requirements
                          ? "border-[#C4161C] bg-[#FFF5F5] focus:shadow-[0_0_0_4px_rgba(196,22,28,0.12)]"
                          : ""
                          }`}
                      />
                      {formErrors.requirements ? (
                        <p className="mt-2 text-sm text-[#C4161C]">{formErrors.requirements}</p>
                      ) : null}
                    </div>

                    {statusMessage ? (
                      <div
                        className={`rounded-xl border px-4 py-3 text-sm leading-6 ${statusMessage.tone === "success"
                          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                          : "border-[#FECACA] bg-[#FEF2F2] text-[#B91C1C]"
                          }`}
                      >
                        {statusMessage.text}
                      </div>
                    ) : null}

                    <div className="flex flex-col gap-4 border-t border-[#E4E4E7]/80 pt-7 md:flex-row md:items-center md:justify-end">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#C4161C] px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#FFFFFF] shadow-[0_18px_34px_-20px_rgba(196,22,28,0.72)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#09090B] disabled:cursor-not-allowed disabled:opacity-70 md:w-auto md:min-w-[16rem]"
                      >
                        <span>{isSubmitting ? "Submitting..." : "Submit Project Request"}</span>
                        <ArrowUpRight className="h-4 w-4" />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
