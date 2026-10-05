import Image from "next/image";

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We study your manufacturing process, production targets, site constraints, and future expansion needs so the project begins with a clear operational foundation.",
    icon: "/process/discovery.svg",
    iconWidth: 33,
    iconHeight: 33,
    textColor: "text-[#64748B]",
  },
  {
    number: "02",
    title: "Planning",
    description:
      "We shape layout logic, structural direction, service coordination, and delivery planning into a build-ready engineering path for efficient industrial execution.",
    icon: "/process/planning.svg",
    iconWidth: 36,
    iconHeight: 36,
    textColor: "text-[#9A9A9A]",
  },
  {
    number: "03",
    title: "Execution",
    description:
      "Civil works, foundations, steel framing, and primary infrastructure are executed with disciplined sequencing to create a strong operational base.",
    icon: "/process/execution.svg",
    iconWidth: 36,
    iconHeight: 28,
    textColor: "text-[#9A9A9A]",
  },
  {
    number: "04",
    title: "Integration",
    description:
      "Electrical systems, piping, mechanical services, and water treatment infrastructure are integrated so the facility works as one coordinated plant environment.",
    icon: "/process/integration.svg",
    iconWidth: 36,
    iconHeight: 36,
    textColor: "text-[#9A9A9A]",
  },
  {
    number: "05",
    title: "Handover",
    description:
      "Testing, commissioning, final checks, and closeout are completed so the facility is handed over ready for safe and stable manufacturing operations.",
    icon: "/process/handover.svg",
    iconWidth: 33,
    iconHeight: 34,
    textColor: "text-[#9A9A9A]",
  },
  {
    number: "06",
    title: "-",
    description: "-",
    icon: null,
    iconWidth: 0,
    iconHeight: 0,
    textColor: "text-[#9A9A9A]",
  },
] as const;

export default function ManagedProcessSection() {
  return (
    <section
      aria-labelledby="managed-process-title"
      className="overflow-hidden bg-[#F9F6F7] px-5 py-8 sm:px-6 sm:py-14 lg:px-10 lg:py-20"
    >
      <div className="mx-auto w-full max-w-[1760px]">
        <header className="flex flex-col items-start gap-3 sm:gap-[10px]">
          <h2
            id="managed-process-title"
            className="max-w-[1204px] text-[28px] font-bold leading-[30px] sm:text-[clamp(2rem,5vw,4.125rem)] sm:leading-[1.05] tracking-[-0.025em] text-[#0F172A]"
          >
            From Idea to Operation{" "}
            <span className="text-[#ED1D23]">Fully Managed</span>
          </h2>
          <p className="w-full text-left text-[14px] leading-5 text-[#64748B] sm:w-auto sm:text-[clamp(1rem,2vw,1.5rem)] sm:leading-snug">
            Text
          </p>
        </header>

        <div className="relative mt-6 sm:mt-[50px]">
          <Image
            src="/process/timeline.svg"
            alt=""
            aria-hidden="true"
            width={1707}
            height={2}
            className="pointer-events-none absolute left-0 top-[47px] hidden h-[2px] w-[calc(100%_-_53px)] 2xl:block"
          />

          <ol className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-3 2xl:grid-cols-6 2xl:gap-y-0">
            {PROCESS_STEPS.map((step) => (
              <li
                key={step.number}
                className="relative flex min-w-0 flex-row items-start gap-4 not-last:after:absolute not-last:after:left-[25px] not-last:after:top-[25px] not-last:after:-bottom-5 not-last:after:w-px not-last:after:bg-[#E4DFE0] sm:flex-col sm:gap-0 sm:after:hidden"
              >
                <div className="relative z-10 flex size-[50px] shrink-0 items-center justify-center rounded-lg sm:h-[92px] sm:w-[100px] sm:rounded-[18px] border-[0.917px] border-[#E4DFE0] bg-white">
                  {step.icon ? (
                    <Image
                      src={step.icon}
                      alt=""
                      aria-hidden="true"
                      width={step.iconWidth}
                      height={step.iconHeight}
                      className="h-auto w-6 sm:w-auto"
                    />
                  ) : null}
                </div>

                <div className="flex min-w-0 flex-1 flex-col items-start gap-2 sm:mt-6 sm:gap-3 2xl:mt-[53px]">
                  <p className="text-[18px] font-bold leading-normal text-[#FF8F92] sm:text-[26px] sm:leading-[21.333px] sm:text-[#ED1D23]">
                    {step.number}
                  </p>
                  <h3 className="text-[18px] font-bold sm:text-[21px] leading-normal text-[#080808]">
                    {step.title}
                  </h3>
                  <p
                    className={`max-w-md text-[14px] font-normal leading-normal sm:text-[18px] sm:leading-6 2xl:max-w-[270px] ${step.textColor}`}
                  >
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
