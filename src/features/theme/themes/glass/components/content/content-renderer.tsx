import type { JSONContent } from "@tiptap/react";
import { useMemo } from "react";
import { renderReact } from "@/features/theme/themes/glass/components/content/render";
import { cn } from "@/lib/utils";

interface ContentRendererProps {
  content: JSONContent | null;
  className?: string;
}

/**
 * Content renderer: renders Tiptap JSON content using the glass-themed
 * static React renderer. SSR renders React components; client hydration
 * activates interactive features.
 */
export function ContentRenderer({ content, className }: ContentRendererProps) {
  const renderedContent = useMemo(() => {
    if (!content) return null;
    return renderReact(content);
  }, [content]);

  if (!content) {
    return null;
  }

  return <div className={cn("ProseMirror", className)}>{renderedContent}</div>;
}
