import LightTunnel from "@/components/LightTunnel";
import ShinyText from "@/components/ShinyText";
import TechText from "@/components/TechText";

export default function Home() {
  return (
    <main
      style={{
        width: "100%",
        minHeight: "100svh",
        position: "relative",
        overflow: "hidden",
        background: "#030303",
      }}
    >
      <LightTunnel
        dpr={1}
        style={{ width: "100%", height: "100svh" }}
        cableColor="#ffffff"
        pulseColor="#ffffff"
        cableCount={56}
        pulseDensity={0.5}
        flowDirection="inward"
        mouseInteraction
        clickSurge
        tunnelColor="#ffffff"
        tunnelOpacity={0}
        speed={0.1}
        pulseSpeed={2}
        pulseLength={0.28}
        pulseBlend={0.6}
        pulseWidth={1}
        thickness={0.35}
        rimWidth={0.15}
        waviness={0.3}
        sway={0.5}
        bend={0.4}
        glow={1}
        size={1}
        fadeNear={0.5}
        fadeFar={2}
        brightness={1}
        colorVariance
        grain={false}
        mouseStrength={0.1}
        intro
        lightMode={false}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          display: "grid",
          placeItems: "center",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            width: "min(90vw, 1000px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.25rem",
            pointerEvents: "auto",
          }}
        >
          <TechText
            text="VELVONIC"
            color="#ffffff"
            accentColor="#7dd3fc"
            fontSize={150}
            intro="assemble"
            style={{ width: "100%", height: "280px" }}
          />
          <ShinyText
            text="India's Biggest Frontier Intelligence Lab - Launching Soon"
            color="#b5b5b5"
            shineColor="#ffffff"
            speed={2}
            style={{
              maxWidth: "90vw",
              fontSize: "clamp(0.75rem, 2vw, 1.15rem)",
              lineHeight: 1.4,
              textAlign: "center",
            }}
          />
          <ShinyText
            text={"Founder - Amogh Dath\nCo-Founder - Rajveer Singh"}
            color="#8f8f8f"
            shineColor="#d7f3ff"
            speed={2.4}
            style={{
              maxWidth: "90vw",
              fontSize: "clamp(0.7rem, 1.7vw, 1rem)",
              lineHeight: 1.6,
              textAlign: "center",
              whiteSpace: "pre-line",
            }}
          />
        </div>
      </div>
    </main>
  );
}
