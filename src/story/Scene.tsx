import type React from "react";
import {
  CanvasImage,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// One illustrated still per scene, with the slow Ken Burns zoom-in used on every shot.
// Overlays (lights, darkening, scanlines, titles) are passed as children.
const SceneInner = ({
  image,
  zoomTo,
  zoomFrom = 1,
  focusX,
  focusY,
  shake = 0,
  shakeSeconds = 0.6,
  hitTimes = [],
  hitStrength = 16,
  children,
}: {
  readonly image: string;
  readonly zoomTo: number;
  readonly zoomFrom?: number;
  readonly focusX: number;
  readonly focusY: number;
  readonly shake?: number;
  readonly shakeSeconds?: number;
  readonly hitTimes?: readonly number[];
  readonly hitStrength?: number;
  readonly children?: React.ReactNode;
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();
  // Optional camera shake at the start of the shot (e.g. a scare or impact), fading out.
  // Plus short, sharp jolts at each hit time (seconds from the start of the shot), e.g. blows on a door.
  const hitAmp = hitTimes.reduce((sum, t) => {
    const since = frame - t * fps;
    return since >= 0 && since < 0.45 * fps ? sum + hitStrength * (1 - since / (0.45 * fps)) : sum;
  }, 0);
  const shakeAmp = shake * Math.max(0, 1 - frame / Math.max(1, shakeSeconds * fps)) + hitAmp;
  // Start slightly zoomed in when shaking so the frame edges never show.
  const maxShake = Math.max(shake, hitTimes.length > 0 ? hitStrength : 0);
  const startScale = Math.max(zoomFrom, maxShake > 0 ? 1 + (maxShake * 2.5) / 1000 : 1);

  return (
    <>
      <CanvasImage
        src={image}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transformOrigin: `${focusX * 100}% ${focusY * 100}%`,
          translate: `${Math.sin(frame * 1.9) * shakeAmp}px ${Math.cos(frame * 2.7) * shakeAmp}px`,
          scale: interpolate(frame, [0, durationInFrames], [startScale, Math.max(startScale, zoomTo)], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.linear,
          }),
        }}
      />
      {children}
    </>
  );
};

export const Scene = Interactive.create({
  Component: SceneInner,
  layout: "absolute-fill",
  schema: {
    ...Interactive.backgroundSchema,
    image: { type: "asset", assetType: "image", default: "", description: "Scene illustration" },
    zoomTo: { type: "number", hiddenFromList: false, default: 1.08, min: 1, max: 1.5, step: 0.01, description: "Zoom at end of shot" },
    zoomFrom: { type: "number", hiddenFromList: false, default: 1, min: 1, max: 3, step: 0.01, description: "Zoom at start of shot" },
    focusX: { type: "number", hiddenFromList: false, default: 0.5, min: 0, max: 1, step: 0.01, description: "Zoom focus X (0–1)" },
    focusY: { type: "number", hiddenFromList: false, default: 0.5, min: 0, max: 1, step: 0.01, description: "Zoom focus Y (0–1)" },
    shake: { type: "number", hiddenFromList: false, default: 0, min: 0, max: 40, step: 1, description: "Camera shake (px)" },
    hitStrength: { type: "number", hiddenFromList: false, default: 16, min: 0, max: 60, step: 1, description: "Hit jolt strength (px)" },
    shakeSeconds: { type: "number", hiddenFromList: false, default: 0.6, min: 0.1, max: 10, step: 0.1, description: "Shake length (s)" },
  } as const,
});
