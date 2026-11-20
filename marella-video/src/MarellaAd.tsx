import { Track, useVideoConfig } from "remotion";
import { GrillOpening } from "./scenes/GrillOpening";

// Full Marella ad. Next scenes get added to the "Scenes" track after scene 1.
export const MarellaAd: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <Track name="Scenes">
      <GrillOpening
        name="Scene 1 – Grill opening"
        durationInFrames={2.5 * fps}
        style={{ backgroundColor: "#254746" }}
      />
    </Track>
  );
};
