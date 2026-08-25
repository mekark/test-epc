import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-10rem)] max-w-3xl items-center justify-center">
        <section className="w-full rounded-[2rem] border border-[#E4E4E7] bg-white p-8 text-center shadow-[0_32px_90px_-56px_rgba(9,9,11,0.22)] sm:p-10 md:p-14">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#C4161C]/10 text-[#C4161C]">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <div className="mt-6 text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-[#C4161C]">
            Enquiry Submitted
          </div>
          <h1 className="mt-4 text-[2rem] font-semibold tracking-[-0.04em] text-[#09090B] sm:text-[2.5rem] md:text-[3rem]">
            Thank you. Our team will contact you shortly.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-[1rem] leading-8 text-[#52525B] sm:text-[1.05rem]">
            Your project enquiry has been received successfully. We will review the details and get back to you for the next discussion.
          </p>
          <div className="mt-10 flex justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C4161C] px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors duration-200 hover:bg-[#A31217]"
            >
              <span>Back To Home</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
