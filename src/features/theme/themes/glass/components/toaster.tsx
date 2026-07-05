import type React from "react";
import type { ToasterProps } from "sonner";
import { Toaster as Sonner } from "sonner";

const Toaster: React.FC<ToasterProps> = (props) => {
  return (
    <Sonner
      className="toaster group"
      position="bottom-right"
      visibleToasts={3}
      duration={4000}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "group relative w-full max-w-[350px] flex items-start justify-between gap-4 p-5 rounded-2xl border border-white/20 dark:border-white/10 shadow-glass-lg backdrop-blur-xl transition-all duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-right-10 data-[state=open]:slide-in-from-bottom-4 [&:has([data-button])]:pr-10",
          title: "text-sm font-medium text-foreground tracking-tight",
          description: "text-xs text-muted-foreground mt-1",
          content: "flex flex-col gap-0.5 flex-1 min-w-0 pr-2",
          actionButton:
            "shrink-0 bg-accent text-white text-xs font-medium px-4 py-2 rounded-xl hover:opacity-90 transition-opacity backdrop-blur-sm",
          cancelButton:
            "shrink-0 border border-white/20 dark:border-white/10 bg-transparent text-muted-foreground text-xs font-medium px-4 py-2 rounded-xl hover:bg-white/10 transition-colors backdrop-blur-sm",
        },
      }}
      {...props}
    />
  );
};

export default Toaster;
