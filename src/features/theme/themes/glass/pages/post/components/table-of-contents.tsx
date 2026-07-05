import { useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import type { TableOfContentsItem } from "@/features/posts/utils/toc";
import { useActiveTOC } from "@/hooks/use-active-toc";

export function TableOfContents({
  headers,
}: {
  headers: Array<TableOfContentsItem>;
}) {
  const activeId = useActiveTOC(headers);
  const [, setIndicatorTop] = useState<number>(0);
  const navRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (activeId && navRef.current) {
      const container = navRef.current;
      const activeLink = container.querySelector(
        `a[href="#${CSS.escape(activeId)}"]`,
      );

      if (activeLink instanceof HTMLElement) {
        const listRect = container
          .querySelector(".toc-root")
          ?.getBoundingClientRect();
        const linkRect = activeLink.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        if (listRect) {
          setIndicatorTop(linkRect.top - listRect.top);
        }

        const linkTop =
          container.scrollTop + (linkRect.top - containerRect.top);
        const linkBottom = linkTop + linkRect.height;
        const padding = 40;

        if (linkBottom > container.scrollTop + containerRect.height - padding) {
          container.scrollTo({
            top: linkBottom - containerRect.height + padding,
            behavior: "smooth",
          });
        } else if (linkTop < container.scrollTop + padding) {
          container.scrollTo({
            top: Math.max(0, linkTop - padding),
            behavior: "smooth",
          });
        }
      }
    }
  }, [activeId]);

  if (headers.length === 0) return null;

  return (
    <nav
      ref={navRef}
      className="glass-card p-5 sticky top-32 self-start block w-60 animate-in fade-in duration-700 delay-500 max-h-[calc(100vh-10rem)] overflow-y-auto overflow-x-hidden custom-scrollbar fill-mode-backwards"
    >
      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/50 mb-4">
        Contents
      </div>
      <div className="relative toc-root">
        <ul className="space-y-2.5 list-none m-0 p-0">
          {headers.map((node) => (
            <li key={node.id}>
              <a
                href={`#${node.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById(node.id);
                  if (element) {
                    element.scrollIntoView({
                      behavior: "smooth",
                    });
                    navigate({
                      hash: node.id,
                      replace: true,
                      hashScrollIntoView: false,
                    });
                  }
                }}
                className={`block text-[11px] transition-all duration-300 leading-relaxed relative border-l-[1.5px] py-0.5 ${
                  activeId === node.id
                    ? "text-accent border-accent pl-3 font-medium"
                    : "text-muted-foreground/60 border-border/30 pl-3 hover:text-foreground hover:border-border/60"
                }`}
                style={{ marginLeft: `${(node.level - 2) * 0.5}rem` }}
              >
                {node.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
