import Image from "next/image";

type ProjectImageProps = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
};

function ProjectImage({
  src,
  alt,
  className = "",
  imageClassName = "object-cover",
}: ProjectImageProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1280px) 38vw, (min-width: 768px) 50vw, 100vw"
        className={imageClassName}
      />
    </div>
  );
}

export default function ProjectsGallerySection() {
  return (
    <section
      id="projects-gallery"
      aria-labelledby="projects-gallery-title"
      className="overflow-hidden bg-[#F9F6F7] px-5 py-8 sm:px-6 sm:py-[70px] lg:px-10"
    >
      <div className="mx-auto w-full max-w-[1760px]">
        <header className="flex max-w-[648px] flex-col gap-4 sm:block">
          <p className="text-[12px] font-bold uppercase leading-[18px] tracking-[1.598px] sm:text-[16px] sm:leading-[21.304px] text-[#ED1D23]">
            Our Work
          </p>
          <h2
            id="projects-gallery-title"
            className="mt-[10px] text-[28px] font-bold leading-[32px] sm:mt-[13px] sm:text-[clamp(2rem,5vw,4.125rem)] sm:leading-[0.98] tracking-[-0.025em] text-[#0F172A]"
          >
            Projects <span className="text-[#ED1D23]">Gallery</span>
          </h2>
          <p className="max-w-[307px] text-[14px] font-normal leading-normal text-[#64748B] sm:mt-[14px] sm:max-w-none sm:text-[clamp(1rem,2vw,1.5rem)] sm:font-medium sm:leading-relaxed">
            Completed EPC structures across Tamil Nadu and beyond.
          </p>
        </header>

        <div className="mt-6 grid min-w-0 gap-4 sm:mt-10 sm:gap-5 xl:grid-cols-[minmax(0,569fr)_minmax(0,1167fr)] xl:gap-6">
          <div className="grid gap-4 max-sm:contents sm:grid-cols-2 sm:gap-5 xl:grid-cols-1">
            <ProjectImage
              src="/projects-gallery/project-1.webp"
              alt="Topaz Market and Food Street project"
              className="aspect-[350/220] max-sm:order-1 sm:aspect-[16/11] xl:h-[643px] xl:aspect-auto"
              imageClassName="object-cover object-bottom"
            />
            <div className="relative aspect-[1.87] overflow-hidden max-sm:order-3 sm:aspect-[16/10] xl:h-[305px] xl:aspect-auto">
              <Image
                src="/projects-gallery/project-3.webp"
                alt="Completed industrial manufacturing facility"
                width={587}
                height={352}
                sizes="(min-width: 1280px) 30vw, (min-width: 768px) 50vw, 100vw"
                className="absolute left-[-0.35%] top-[-6.13%] h-[112.26%] w-[100.35%] max-w-none"
              />
            </div>
          </div>

          <div className="grid gap-4 max-sm:contents sm:gap-5">
            <div className="grid grid-cols-2 gap-3 max-sm:order-2 sm:gap-5 xl:h-[477px] xl:grid-cols-[424fr_719fr] xl:gap-6">
              <ProjectImage
                src="/projects-gallery/project-5.webp"
                alt="Aerial view of a steel industrial building under construction"
                className="aspect-[169/174] sm:aspect-[16/11] xl:h-[477px] xl:aspect-auto"
              />

              <div className="relative aspect-[169/174] overflow-hidden sm:aspect-[16/11] xl:h-[477px] xl:aspect-auto">
                <Image
                  src="/projects-gallery/project-4-base.webp"
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="(min-width: 1280px) 38vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
                <Image
                  src="/projects-gallery/project-4-overlay.webp"
                  alt="Aerial view of a completed industrial warehouse"
                  fill
                  sizes="(min-width: 1280px) 38vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover object-bottom"
                />
              </div>
            </div>

            <div className="grid gap-4 max-sm:hidden sm:grid-cols-2 sm:gap-5 xl:h-[471px] xl:grid-cols-2 xl:gap-[25px]">
              <ProjectImage
                src="/projects-gallery/project-6.webp"
                alt="Aerial view of an outdoor food court project"
                className="aspect-[16/11] xl:h-[471px] xl:aspect-auto"
              />
              <ProjectImage
                src="/projects-gallery/project-2.webp"
                alt="Aerial view of the completed TAAC institutional building"
                className="aspect-[16/11] xl:h-[471px] xl:aspect-auto"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center sm:mt-[70px]">
          <button
            type="button"
            className="inline-flex w-full items-center justify-center rounded-lg bg-[#C4161C] px-6 py-[14px] text-[14px] font-semibold leading-normal sm:w-auto sm:rounded-[8.809px] sm:px-8 sm:py-4 sm:text-[18px] sm:font-extrabold text-[#F5F5F5] shadow-[0_8.809px_17.618px_rgba(196,22,28,0.3)] transition-colors hover:bg-[#ED1D23] sm:px-[50px] sm:py-5 sm:text-[24px]"
          >
            View All →
          </button>
        </div>
      </div>
    </section>
  );
}
