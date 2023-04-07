import { Composition } from "remotion";
import React from "react";
import { Blur } from "./blur";

export const RemotionVideo: React.FC = () => {
  const affirmation = require(`../../public/affirmation.json`);
  return (
    <Composition
      id="Blur"
      component={Blur}
      durationInFrames={24 * 5}
      fps={24}
      height={1280}
      width={720}
      defaultProps={{
        text: affirmation.affirmation,
      }}
    />
  );
};
