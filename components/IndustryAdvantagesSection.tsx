const INDUSTRY_ADVANTAGES = [
  {
    number: "01",
    title: "40,000+ MT High-Capacity Fabrication",
    description:
      "One of the highest PEB manufacturing capacities in the region for massive scale industrial demands.",
    featured: true,
    numberAccent: false,
    cornerClass: "xl:rounded-tl-[33px]",
  },
  {
    number: "02",
    title: "Fully Automated Steel Production",
    description:
      "Latest automation technology ensuring consistency and eliminates human error.",
    featured: false,
    numberAccent: true,
    cornerClass: "",
  },
  {
    number: "03",
    title: "Advanced CNC-Based Precision Engineering",
    description:
      "High-accuracy fabrication for complex structural components, backed by in-house EPC construction expertise.",
    featured: false,
    numberAccent: false,
    cornerClass: "xl:rounded-tr-[33px]",
  },
  {
    number: "04",
    title: "ISO-Certified Quality Systems",
    description:
      "Rigorous quality protocols ensuring durability and safety compliance.",
    featured: false,
    numberAccent: false,
    cornerClass: "xl:rounded-bl-[33px]",
  },
  {
    number: "05",
    title: "30–40% Faster Project Delivery",
    description:
      "Optimized workflows and in-house execution for rapid turnkey facility handover — from EPC contractor to client, under one roof.",
    featured: false,
    numberAccent: true,
    cornerClass: "",
  },
] as const;

const SUSTAINABLE_ITEM = {
  number: "06",
  title: "Sustainable & Green Certified",
  description:
    "Eco-conscious processes delivering future-ready PEB industrial and commercial building",
} as const;

const MOBILE_ITEMS = [...INDUSTRY_ADVANTAGES, SUSTAINABLE_ITEM];

export default function IndustryAdvantagesSection() {
  return (
    <section
      aria-labelledby="industry-advantages-title"
      className="overflow-hidden bg-[#0a0a0a] px-5 pb-4 pt-8 text-white sm:bg-[#040303] sm:px-6 sm:py-16 lg:px-10 lg:py-20"
    >
      <div className="mx-auto w-full max-w-[1706px]">
        <header className="mx-auto flex max-w-[1488px] flex-col items-start gap-[10px] sm:items-center sm:gap-0 sm:text-center">
          <p className="text-[12px] font-bold uppercase leading-normal text-[#E50818] sm:text-[16px] sm:leading-[21.333px]">
            Market Advantage
          </p>
          <h2
            id="industry-advantages-title"
            className="text-[32px] font-extrabold leading-[38px] sm:mt-[10px] sm:text-[clamp(2rem,6vw,5.5rem)] sm:font-bold sm:leading-[0.98] sm:tracking-[-0.035em]"
          >
            Why Top Industries{" "}
            <span className="block text-[#ED1D23] max-sm:uppercase sm:inline sm:text-[#E50818]">
              Choose Mekark
            </span>
          </h2>
          <p className="max-w-[1488px] text-[14px] font-normal leading-normal text-[#888] sm:mt-[21px] sm:text-[clamp(1rem,2vw,1.5rem)] sm:leading-relaxed sm:text-[#E8E8E8]">
            Leading EPC companies trust Mekark for the industrial construction
            sector&apos;s unmatched capacity and precision as a PEB manufacturer
            and turnkey construction company.
          </p>
        </header>

        <ul className="mt-1.5 flex flex-col sm:hidden">
          {MOBILE_ITEMS.map((item, index) => (
            <li
              key={item.number}
              className="flex items-start gap-[10px] border-b border-white/10 py-4"
            >
              <span
                className={`w-[50px] shrink-0 text-[26px] font-extrabold leading-[25px] ${
                  index % 2 === 0 ? "text-[#E53935]" : "text-[#CCC]"
                }`}
              >
                {item.number}
              </span>
              <div className="flex min-w-0 flex-1 flex-col gap-[10px]">
                <h3 className="text-[18px] font-bold leading-normal text-[#F0F0F0]">
                  {item.title}
                </h3>
                <p className="text-[14px] font-medium leading-normal text-[#64748B]">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-10 hidden gap-4 sm:grid sm:grid-cols-2 sm:gap-6 xl:grid-cols-4 xl:gap-x-8 xl:gap-y-9">
          {INDUSTRY_ADVANTAGES.map((item) => (
            <article
              key={item.number}
              className={`min-w-0 overflow-hidden rounded-[24px] border-[1.333px] border-black bg-[#1E1E1E] p-6 sm:p-8 xl:min-h-[307px] xl:rounded-none xl:p-10 ${
                item.featured ? "xl:col-span-2" : ""
              } ${item.cornerClass}`}
            >
              <p
                className={`text-[28px] font-bold uppercase leading-5 sm:text-[34px] tracking-[1.6px] ${
                  item.numberAccent ? "text-[#FB2C36]" : "text-white"
                }`}
              >
                {item.number}
              </p>
              <div className={item.featured ? "mt-8 xl:mt-[56px]" : "mt-6 sm:mt-8"}>
                <h3
                  className={`font-bold text-[#F0F0F0] ${
                    item.featured
                      ? "text-[22px] leading-[30px] sm:text-[26px] sm:leading-[36px] xl:text-[30px] xl:leading-10"
                      : "text-[21px] leading-[28px] sm:text-[24px] sm:leading-[30px]"
                  }`}
                >
                  {item.title}
                </h3>
                <p
                  className={`mt-3 font-medium text-[#D6D6D6] ${
                    item.featured
                      ? "max-w-[681px] text-[17px] leading-[26px] sm:text-[21px] sm:leading-[30px] xl:text-[24px] xl:leading-[33.333px]"
                      : "text-[16px] leading-[24px] sm:text-[18px] sm:leading-[26px]"
                  }`}
                >
                  {item.description}
                </p>
              </div>
            </article>
          ))}

          <article className="min-w-0 overflow-hidden rounded-[24px] border-[1.333px] border-black bg-[#E50818] p-6 sm:col-span-2 sm:p-8 xl:col-span-2 xl:min-h-[307px] xl:rounded-none xl:rounded-br-[33px] xl:p-10">
            <p className="text-[28px] font-bold uppercase leading-5 tracking-[1.6px] text-white sm:text-[34px]">
              06
            </p>
            <h3 className="mt-8 text-[32px] font-bold leading-tight text-white">
              {SUSTAINABLE_ITEM.title}
            </h3>
            <p className="mt-3 max-w-[681px] text-[18px] font-medium leading-[26px] text-white/90 xl:text-[21px] xl:leading-[30px]">
              {SUSTAINABLE_ITEM.description}
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
