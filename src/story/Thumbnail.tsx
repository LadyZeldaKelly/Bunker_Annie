import { CanvasImage, Interactive, staticFile } from "remotion";
import { loadFont } from "@remotion/fonts";

// Anton (SIL Open Font License), bundled in public/fonts.
const thumbFont = "Anton";
loadFont({ family: thumbFont, url: staticFile("fonts/Anton-Regular.woff2"), weight: "400" });

// YouTube thumbnail (1280x720): episode art + "NIGHT 2"-style label + a short hook line.
const ThumbnailInner = ({
  image,
  zoom,
  brightness,
  focusX,
  focusY,
  label,
  number,
  hook,
  hookColor,
  textSide,
  hookAtBottom,
}: {
  readonly image: string;
  readonly zoom: number;
  readonly brightness: number;
  readonly focusX: number;
  readonly focusY: number;
  readonly label: string;
  readonly number: string;
  readonly hook: string;
  readonly hookColor: string;
  readonly textSide: "left" | "right";
  readonly hookAtBottom?: boolean;
}) => {
  const outline = "0 0 0 #000";
  const textStyle: React.CSSProperties = {
    fontFamily: thumbFont,
    textTransform: "uppercase",
    lineHeight: 0.92,
    WebkitTextStroke: "14px #000",
    paintOrder: "stroke fill",
    textShadow: `${outline}, 6px 8px 0 rgba(0,0,0,0.85)`,
  };
  return (
    <>
      <CanvasImage
        src={staticFile(image)}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transformOrigin: `${focusX * 100}% ${focusY * 100}%`,
          scale: zoom,
          filter: `brightness(${brightness}) saturate(1.15) contrast(1.08)`,
        }}
      />
      {/* Darken behind the text so it reads at small sizes */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(${textSide === "left" ? "90deg" : "270deg"}, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 38%, rgba(0,0,0,0) 60%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 34,
          [textSide]: 44,
          display: "flex",
          flexDirection: "column",
          alignItems: textSide === "left" ? "flex-start" : "flex-end",
          gap: 10,
          maxWidth: 640,
        }}
      >
        <div style={{ ...textStyle, fontSize: 150, color: "#FFFFFF" }}>
          {label} <span style={{ color: "#E62E2E" }}>{number}</span>
        </div>
        {hookAtBottom ? null : (
        <div
            style={{
              ...textStyle,
              fontSize: 112,
              color: hookColor,
              rotate: textSide === "left" ? "-3deg" : "3deg",
              textAlign: textSide,
            }}
          >
            {hook}
          </div>
        )}
      </div>
      {hookAtBottom ? (
        <div
          style={{
            ...textStyle,
            position: "absolute",
            bottom: 40,
            [textSide]: 44,
            fontSize: 112,
            color: hookColor,
            rotate: textSide === "left" ? "-3deg" : "3deg",
          }}
        >
          {hook}
        </div>
      ) : null}
    </>
  );
};

export const Thumbnail = Interactive.create({
  Component: ThumbnailInner,
  layout: "absolute-fill",
  schema: {
    image: { type: "asset", assetType: "image", default: "", description: "Background art" },
    zoom: { type: "number", hiddenFromList: false, default: 1, min: 1, max: 3, step: 0.01, description: "Zoom" },
    brightness: { type: "number", hiddenFromList: false, default: 1, min: 0.5, max: 2.5, step: 0.05, description: "Brightness" },
    focusX: { type: "number", hiddenFromList: false, default: 0.5, min: 0, max: 1, step: 0.01, description: "Zoom focus X" },
    focusY: { type: "number", hiddenFromList: false, default: 0.5, min: 0, max: 1, step: 0.01, description: "Zoom focus Y" },
    label: { type: "string", default: "Night", description: "Label (e.g. NIGHT / DAY)" },
    number: { type: "string", default: "2", description: "Episode number (red)" },
    hook: { type: "string", default: "Let me in...", description: "Hook line" },
    hookColor: { type: "color", default: "#9BE22E", description: "Hook colour" },
    hookAtBottom: { type: "boolean", default: false, description: "Hook line at the bottom" },
    textSide: { type: "enum", default: "left", variants: { left: {}, right: {} }, description: "Text side" },
  } as const,
});
