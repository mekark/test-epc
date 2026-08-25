import type { ReactNode } from "react";

const STRONG_CLASS = "font-semibold text-zinc-800";

export function renderBoldPhrases(
  text: string,
  phrases: readonly string[],
  phraseIndex = 0,
): ReactNode {
  if (phraseIndex >= phrases.length) return text;

  const phrase = phrases[phraseIndex];
  const start = text.indexOf(phrase);

  if (start === -1) {
    return renderBoldPhrases(text, phrases, phraseIndex + 1);
  }

  return (
    <>
      {renderBoldPhrases(text.slice(0, start), phrases, phraseIndex + 1)}
      <strong className={STRONG_CLASS}>{phrase}</strong>
      {renderBoldPhrases(text.slice(start + phrase.length), phrases, phraseIndex)}
    </>
  );
}

export const SERVICE_DESCRIPTION_PHRASES = [
  "factory construction services",
  "manufacturing facilities",
] as const;

export const SERVICE_INTRO_PHRASES = [
  "factory construction and manufacturing plant construction",
] as const;

export const FAQ_BOLD_PHRASES = [
  "manufacturing facility construction company",
  "industrial RCC building contractors",
  "industrial civil construction companies",
  "industrial civil construction company",
  "industrial infrastructure construction",
  "industrial civil work contractors",
  "industrial foundation contractors",
  "factory construction contractors",
  "industrial building construction",
  "industrial factory construction",
  "industrial facility construction",
  "factory building construction",
  "turnkey factory construction",
  "industrial turnkey contractors",
  "RCC construction contractors",
  "industrial civil contractors",
  "RCC building contractors",
] as const;
