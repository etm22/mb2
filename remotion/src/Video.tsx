import { Composition } from "remotion";
import React from "react";
import { Blur } from "./blur";

export const RemotionVideo: React.FC = () => {
  const tip = require(`../../public/dating.json`);
  return (
    <Composition
      id="Blur"
      component={Blur}
      durationInFrames={24 * 5}
      fps={24}
      height={1280}
      width={720}
      defaultProps={{
        text: tip.tip,
        idx: tip.idx,
      }}
    />
  );
};
