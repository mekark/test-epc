"use client";

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

const labelClass =
  "mb-1.5 block text-[14px] font-bold leading-normal tracking-[0.3px] text-[#5A5A5A] max-sm:sr-only";
const fieldClass =
  "h-[46px] w-full rounded-lg border border-[#E2E2E2] bg-[#F0F0F0] px-4 text-[14px] text-[#2B2B2B] outline-none transition-colors sm:text-[12px] placeholder:text-[#757575] focus:border-[#C4161C] focus:bg-white";

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

export default function ProjectCtaForm() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
                  className={`${fieldClass} ${values.projectType ? "" : "text-[#757575]"} ${errors.projectType ? "border-[#C4161C]" : ""}`}
                >
                  <option value="" className="text-[#2B2B2B]">Select your Industry</option>
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
                  className={`${fieldClass} ${values.sqft ? "" : "text-[#757575]"} ${errors.sqft ? "border-[#C4161C]" : ""}`}
                >
                  <option value="" className="text-[#2B2B2B]">Select Sq. Ft Requirement</option>
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
  );
}
