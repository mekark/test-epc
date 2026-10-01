import Image from "next/image";
import ProjectCtaFormLazy from "./ProjectCtaFormLazy";

const BENEFITS = [
  "Turnkey Execution",
  "Industrial Civil Works",
  "MEP & Utilities",
  "Tanks & Infrastructure",
] as const;

const PHONE_NUMBER = "9790924754";
const WHATSAPP_MESSAGE =
  "Hello Mekark, I would like to discuss my industrial construction project.";

export default function ProjectCtaSection() {
  const whatsappHref = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(
    WHATSAPP_MESSAGE,
  )}`;

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

          <ProjectCtaFormLazy />
        </div>
      </div>
    </section>
  );
}
