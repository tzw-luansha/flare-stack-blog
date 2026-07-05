import { useRouteContext } from "@tanstack/react-router";

export function BackgroundLayer() {
  const { siteConfig } = useRouteContext({ from: "__root__" });
  const accentHue = siteConfig.theme.glass.accentHue;

  return (
    <div
      className="fixed inset-0 -z-10 glass-bg-gradient"
      style={
        {
          "--accent-h": String(accentHue),
        } as React.CSSProperties
      }
    >
      {/* Floating decorative blobs */}
      <div
        className="glass-blob glass-blob-1 w-[500px] h-[500px] -top-40 -left-40"
        style={{
          background: `hsla(${accentHue}, 70%, 55%, 0.12)`,
        }}
      />
      <div
        className="glass-blob glass-blob-2 w-[400px] h-[400px] top-1/3 -right-32"
        style={{
          background: `hsla(${accentHue + 30}, 70%, 55%, 0.08)`,
        }}
      />
      <div
        className="glass-blob glass-blob-3 w-[350px] h-[350px] -bottom-20 left-1/4"
        style={{
          background: `hsla(${accentHue - 40}, 70%, 55%, 0.10)`,
        }}
      />
    </div>
  );
}
