"use client";

import Image from "next/image";
import { ChangeEvent, FormEvent, useState } from "react";

type FormValues = {
  name: string;
  projectLocation: string;
  phoneNumber: string;
  email: string;
  projectType: string;
  sqft: string;
  requirements: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const INITIAL_VALUES: FormValues = {
  name: "",
  projectLocation: "",
  phoneNumber: "",
  email: "",
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
] as const;

const PROJECT_SIZES = [
  "10,000 - 20,000 Sq.ft",
  "20,000 - 30,000 Sq.ft",
  "30,000 - 50,000 Sq.ft",
  "50,000+ Sq.ft",
] as const;

const BENEFITS = [
  "Turnkey Execution",
  "Industrial Civil Works",
  "MEP & Utilities",
  "Tanks & Infrastructure",
] as const;

const PHONE_NUMBER = "9790924754";
const WHATSAPP_MESSAGE =
  "Hello Mekark, I would like to discuss my industrial construction project.";

const labelClass =
  "mb-1.5 block text-[14px] font-bold leading-normal tracking-[0.3px] text-[#5A5A5A] max-sm:sr-only";
const fieldClass =
  "h-[46px] w-full rounded-lg border border-[#E2E2E2] bg-[#F0F0F0] px-4 text-base text-[#2B2B2B] outline-none transition-colors sm:text-[12px] placeholder:text-[#757575] focus:border-[#C4161C] focus:bg-white";

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = "Name is required";
  if (!values.phoneNumber.trim()) {
    errors.phoneNumber = "Phone number is required";
  } else {
    const digits = values.phoneNumber.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 15) {
      errors.phoneNumber = "Enter a valid phone number";
    }
  }
  if (!values.projectType) errors.projectType = "Select an industry";
  if (!values.sqft) errors.sqft = "Select a project size";
  if (
    values.email.trim() &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())
  ) {
    errors.email = "Enter a valid email";
  }
  return errors;
}

type InputFieldProps = {
  id: keyof FormValues;
  label: string;
  placeholder: string;
  value: string;
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => void;
  error?: string;
  required?: boolean;
  type?: string;
};

function InputField({
  id,
  label,
  placeholder,
  value,
  onChange,
  error,
  required,
  type = "text",
}: InputFieldProps) {
  return (
    <div>
      <label className={labelClass} htmlFor={`project-cta-${id}`}>
        {label}{required ? "*" : ""}
      </label>
      <input
        id={`project-cta-${id}`}
        name={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        autoComplete="off"
        aria-invalid={Boolean(error)}
        className={`${fieldClass} ${error ? "border-[#C4161C]" : ""}`}
      />
      {error ? <p className="mt-1 text-[11px] text-[#C4161C]">{error}</p> : null}
    </div>
  );
}

export default function ProjectCtaSection() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const whatsappHref = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(
    WHATSAPP_MESSAGE,
  )}`;

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => {
      if (!current[name as keyof FormValues]) return current;
      const next = { ...current };
      delete next[name as keyof FormValues];
      return next;
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      setStatus("Please correct the highlighted fields.");
      return;
    }

    setErrors({});
    setStatus(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/enquiry-form", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          phone: values.phoneNumber.trim(),
          location: values.projectLocation.trim(),
          sqf: values.sqft,
          message: values.requirements.trim(),
          service: values.projectType,
          sourceUrl: window.location.href,
          pageUrl: window.location.href,
        }),
      });
      const payload = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(payload?.message || "We could not submit your enquiry.");
      }
      setValues(INITIAL_VALUES);
      window.location.assign("/thank-you");
    } catch (error) {
      setStatus(
        error instanceof Error
          ? error.message
          : "We could not submit your enquiry. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="project-cta" className="relative isolate overflow-hidden bg-[#090909] text-white xl:min-h-[1059px]">
      <Image
        src="/project-cta/construction-background.webp"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="-z-30 object-cover object-center opacity-10 sm:opacity-30"
      />
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(63deg,#080B0F_17%,rgba(16,21,25,0)_99%)] max-sm:bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,#000_54%)]" />
      <div className="pointer-events-none absolute left-[180px] top-[-61px] -z-10 h-[274px] w-[274px] rounded-full sm:left-auto sm:-right-[214px] sm:-top-[267px] sm:h-[1035px] sm:w-[1035px] bg-[rgba(228,0,21,0.3)] opacity-90 blur-[62px]" />

      <div className="mx-auto grid w-full min-w-0 max-w-[1507px] gap-[22px] px-5 py-8 sm:gap-14 sm:px-6 sm:py-20 lg:px-10 xl:min-h-[1059px] xl:grid-cols-[minmax(0,837px)_clamp(480px,31.25vw,600px)] xl:items-center xl:gap-[69px] xl:py-[82px] min-[1588px]:px-0">
        <div className="min-w-0 xl:self-start">
          <h2 className="max-w-[837px] text-[28px] font-extrabold leading-[30px] tracking-[-0.03em] sm:text-[clamp(2.55rem,5vw,5rem)] sm:leading-[1.02]">
            Start Your Factory Construction Project
          </h2>

          <div className="mt-3 max-w-[837px] space-y-[14px] text-[14px] font-normal leading-normal text-white/65 sm:mt-[21px] sm:space-y-[24px] sm:text-[clamp(1rem,1.25vw,1.5rem)] sm:font-medium sm:leading-[1.555]">
            <p>
              Speak with our team about your manufacturing facility, industrial
              plant, utility infrastructure, or heavy engineering project
              requirements. We deliver turnkey solutions with a focus on execution
              quality, safety, and long-term operational value.
            </p>
            <p>
              Discuss your manufacturing facility, industrial plant, or heavy
              infrastructure requirement with our team.
            </p>
          </div>

          <ul className="mt-[34px] grid max-w-[625px] grid-cols-2 gap-x-5 gap-y-[18.667px] sm:mt-[22px] sm:gap-x-[30px] sm:gap-y-[18px]">
            {BENEFITS.map((benefit) => (
              <li
                key={benefit}
                className="flex items-center gap-[10px] whitespace-nowrap text-[14px] font-normal leading-normal sm:gap-[13px] sm:whitespace-normal sm:text-[20px] sm:font-semibold sm:leading-[27px]"
              >
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[rgba(196,22,28,0.5)] text-[15px] sm:size-[37px] sm:text-[18px] sm:font-bold">
                  ✓
                </span>
                {benefit}
              </li>
            ))}
          </ul>

          <div className="mt-[22px] flex max-w-[693px] flex-col gap-3 sm:mt-[39px] sm:gap-[21px]">
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="group flex items-center gap-4 rounded-[20px] border border-black/40 bg-[#212121] px-4 py-[10px] sm:h-[120px] sm:gap-[21px] sm:rounded-[29px] sm:px-[27px] sm:py-4 transition-colors hover:bg-[#292929]"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#CC000A] sm:size-16 sm:rounded-3xl sm:bg-[#E40015]">
                <Image
                  src="/project-cta/phone.svg"
                  alt=""
                  width={27}
                  height={27}
                  className="size-6 sm:size-[27px]"
                />
              </span>
              <span className="flex min-w-0 flex-1 flex-col gap-[2px] sm:flex-none sm:gap-0">
                <span className="text-[10px] font-bold uppercase leading-4 text-[#A9A9A9] sm:text-[16px] sm:leading-[21px]">
                  Call Now
                </span>
                <span className="whitespace-nowrap text-[14px] font-extrabold leading-6 sm:text-[21px] sm:leading-8">+91 97909 24754</span>
              </span>
              <Image
                src="/project-cta/arrow.svg"
                alt=""
                width={27}
                height={26}
                className="ml-auto h-[26px] w-6 shrink-0 transition-transform sm:w-[27px] group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-[20px] border border-black/40 bg-[#212121] px-4 py-[10px] sm:h-[120px] sm:gap-[21px] sm:rounded-[29px] sm:px-[27px] sm:py-4 transition-colors hover:bg-[#292929]"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#CC000A] sm:size-16 sm:rounded-3xl sm:bg-[#E40015]">
                <Image
                  src="/project-cta/whatsapp.webp"
                  alt=""
                  width={39}
                  height={39}
                  className="size-[30px] rounded-full sm:size-[39px]"
                />
              </span>
              <span className="min-w-0 flex-1 text-[14px] font-bold leading-6 sm:flex-none sm:text-[26px] sm:leading-normal">
                WhatsApp Us Now
              </span>
              <Image
                src="/project-cta/arrow.svg"
                alt=""
                width={27}
                height={26}
                className="ml-auto h-[26px] w-6 shrink-0 transition-transform sm:w-[27px] group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>
          </div>
        </div>

        <div className="mx-auto w-full min-w-0 max-w-[640px] rounded-[24px] border border-[#E2E2E2] bg-white p-5 text-[#080808] shadow-[0_24px_40px_rgba(0,0,0,0.06)] sm:rounded-[29px] sm:px-[46px] sm:py-[42px] xl:max-w-none xl:-translate-y-[22px] xl:self-center">
          <div className="text-center">
            <h3 className="text-[18px] font-extrabold leading-normal sm:text-[21px]">
              Request Your Project Blueprint
            </h3>
            <p className="mt-2 text-[12px] font-medium text-[#9A9A9A] sm:text-[13px]">
              Get a custom layout, cost range &amp; 150-day timeline
            </p>
          </div>

          <form className="mt-4 sm:mt-[27px]" onSubmit={handleSubmit} noValidate>
            <div className="grid gap-x-[33px] gap-y-4 sm:grid-cols-2 sm:gap-y-[15px]">
              <InputField
                id="name"
                label="Full Name"
                placeholder="Enter Your name"
                value={values.name}
                onChange={handleChange}
                error={errors.name}
                required
              />
              <InputField
                id="projectLocation"
                label="Project Location"
                placeholder="Enter project location"
                value={values.projectLocation}
                onChange={handleChange}
              />
              <InputField
                id="phoneNumber"
                label="Mobile Number"
                placeholder="Mobile Number*"
                type="tel"
                value={values.phoneNumber}
                onChange={handleChange}
                error={errors.phoneNumber}
                required
              />
              <InputField
                id="email"
                label="Email Address"
                placeholder="Enter Email Address"
                type="email"
                value={values.email}
                onChange={handleChange}
                error={errors.email}
              />

              <div>
                <label className={labelClass} htmlFor="project-cta-projectType">
                  Industry Type*
                </label>
                <select
                  id="project-cta-projectType"
                  name="projectType"
                  value={values.projectType}
                  onChange={handleChange}
                  className={`${fieldClass} ${errors.projectType ? "border-[#C4161C]" : ""}`}
                >
                  <option value="">Select your Industry</option>
                  {PROJECT_TYPES.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
                {errors.projectType ? <p className="mt-1 text-[11px] text-[#C4161C]">{errors.projectType}</p> : null}
              </div>

              <div>
                <label className={labelClass} htmlFor="project-cta-sqft">
                  Project Sq. Ft*
                </label>
                <select
                  id="project-cta-sqft"
                  name="sqft"
                  value={values.sqft}
                  onChange={handleChange}
                  className={`${fieldClass} ${errors.sqft ? "border-[#C4161C]" : ""}`}
                >
                  <option value="">Select Sq. Ft Requirement</option>
                  {PROJECT_SIZES.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
                {errors.sqft ? <p className="mt-1 text-[11px] text-[#C4161C]">{errors.sqft}</p> : null}
              </div>
            </div>

            <div className="mt-4 sm:mt-[15px]">
              <label className={labelClass} htmlFor="project-cta-requirements">
                Requirement Details
              </label>
              <textarea
                id="project-cta-requirements"
                name="requirements"
                rows={1}
                value={values.requirements}
                onChange={handleChange}
                placeholder="Enter requirement details"
                className={`${fieldClass} min-h-[46px] resize-y py-[13px]`}
              />
            </div>

            {status ? (
              <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-[12px] text-[#C4161C]">
                {status}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 flex h-12 w-full items-center justify-center rounded-lg bg-[#C4161C] px-9 text-[14px] font-semibold text-[#F5F5F5] sm:mt-[21px] sm:h-[58px] sm:text-[16px] sm:font-extrabold shadow-[0_8px_16px_rgba(196,22,28,0.3)] transition-colors hover:bg-[#E40015] disabled:cursor-wait disabled:opacity-70"
            >
              {isSubmitting ? "Submitting..." : "Get My Free Quote →"}
            </button>
            <p className="mt-4 text-center text-xs font-medium text-[#5A5A5A] sm:mt-[13px] sm:text-[10.667px] sm:tracking-[0.3px]">
              100% Transparent Consultation with single point project support
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
