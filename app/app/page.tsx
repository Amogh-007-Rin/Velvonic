import FluxLines from "@/components/FluxLines";
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
      <FluxLines
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          width: "100%",
          height: "100%",
        }}
        colors={["#ffffff", "#7dd3fc", "#a78bfa"]}
        speed={0.35}
        mouseInteraction
        clickSwirl
        opacity={0.8}
        dpr={1}
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
            text={"Founder - Amogh Dath\nCo-Founder - Param Patel\nCPO - Rajveer Singh"}
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
