"use client";

import { createContext, useContext } from "react";

/**
 * When `true`, the template is rendered inside the fullscreen dialog preview.
 * Hooks like `useLenis` check this to avoid hijacking the dialog's scroll.
 */
const PreviewDialogContext = createContext(false);

export const PreviewDialogProvider = PreviewDialogContext.Provider;

export function useIsInsidePreviewDialog() {
  return useContext(PreviewDialogContext);
}
