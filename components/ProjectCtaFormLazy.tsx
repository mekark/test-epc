"use client";

import dynamic from "next/dynamic";
import LazyHydrateWhenVisible from "./LazyHydrateWhenVisible";
import ProjectCtaFormPlaceholder from "./ProjectCtaFormPlaceholder";

const ProjectCtaForm = dynamic(() => import("./ProjectCtaForm"), {
  ssr: false,
  loading: () => <ProjectCtaFormPlaceholder />,
});

export default function ProjectCtaFormLazy() {
  return (
    <LazyHydrateWhenVisible
      fallback={<ProjectCtaFormPlaceholder />}
      rootMargin="300px 0px"
      minHeight={420}
    >
      <ProjectCtaForm />
    </LazyHydrateWhenVisible>
  );
}
