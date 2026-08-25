import type { ReactNode } from "react";
import {
  renderBoldPhrases,
  SERVICE_DESCRIPTION_PHRASES,
} from "./boldPhrases";

export function renderServiceDescription(description: string): ReactNode {
  return renderBoldPhrases(description, SERVICE_DESCRIPTION_PHRASES);
}
