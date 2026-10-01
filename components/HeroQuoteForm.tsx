"use client";

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

const FORM_ENDPOINT = "/api/enquiry-form";

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
  "h-[46px] w-full rounded-lg border border-[#E2E2E2] bg-[#F0F0F0] px-[18px] text-[14px] text-[#2B2B2B] outline-none transition-colors sm:text-xs placeholder:text-[#757575] focus:border-[#C4161C] focus:bg-white";

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

export default function HeroQuoteForm() {
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

  return (
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
                  className={`${FIELD_CLASSNAME} ${formValues.projectType ? "" : "text-[#757575]"} ${
                    formErrors.projectType ? "border-[#FF6B6B]" : ""
                  }`}
                >
                  <option value="" className="text-[#2B2B2B]">Select your Industry type</option>
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
                  className={`${FIELD_CLASSNAME} ${formValues.sqft ? "" : "text-[#757575]"} ${
                    formErrors.sqft ? "border-[#FF6B6B]" : ""
                  }`}
                >
                  <option value="" className="text-[#2B2B2B]">Select Sq.ft Requirement</option>
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
                className="w-full resize-none rounded-lg border border-[#E2E2E2] bg-[#F0F0F0] px-[18px] py-3 text-[14px] max-sm:h-[46px] sm:px-4 text-[#2B2B2B] outline-none sm:text-xs placeholder:text-[#757575] focus:border-[#C4161C] focus:bg-white"
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
  );
}
