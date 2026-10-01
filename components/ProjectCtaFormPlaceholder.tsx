export default function ProjectCtaFormPlaceholder() {
  return (
    <div aria-hidden="true" className="mt-4 animate-pulse space-y-4 sm:mt-[27px]">
      <div className="grid gap-x-[33px] gap-y-4 sm:grid-cols-2 sm:gap-y-[15px]">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="h-[46px] rounded-lg bg-[#F0F0F0]" />
        ))}
      </div>
      <div className="h-[46px] rounded-lg bg-[#F0F0F0]" />
      <div className="h-12 rounded-lg bg-[#C4161C]/60 sm:h-[58px]" />
    </div>
  );
}
