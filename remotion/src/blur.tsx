import { CameraMotionBlur } from "@remotion/motion-blur";
import {
  AbsoluteFill,
  Img,
  interpolate,
  Series,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  Audio,
} from "remotion";
import React from "react";
import { useCallback, useEffect, useState } from "react";
import { continueRender, delayRender } from "remotion";

// const text = "You will get a job promotion soon!";
const image_duration_in_frames = 8;

export const shuffleArray = (array: any[]) => {
  return array.slice().sort(() => Math.random() - 0.5);
};

export const ImageComponent: React.FC<{ image_url: string }> = ({
  image_url,
}) => {
  const frame = useCurrentFrame();
  const videoConfig = useVideoConfig();
  const img_x = interpolate(
    frame,
    [0, image_duration_in_frames / 3],
    [0, videoConfig.width]
  );

  return (
    <AbsoluteFill
      style={{
        opacity: 0.6,
        transform: `translateX(${img_x}px)`,
      }}
    >
      <Img height={videoConfig.height} src={image_url} />
    </AbsoluteFill>
  );
};

export const Blur = ({ text }) => {
  const [data, setData] = useState([]);
  const [handle] = useState(() => delayRender());

  const fetchData = useCallback(async () => {
    const client_id = "vUwsKy2Hz2Ftpn37uTq1oUdcmG7Lh3TWRwrCHhiMKw0";
    const query = "money car vacation";
    const response_1 = await fetch(
      `https://api.unsplash.com/search/photos?query=${query}&client_id=${client_id}&color=black_and_white&orientation=portrait&per_page=30`
    );
    const json_1 = await response_1.json();
    const total_pages = json_1.total_pages;
    const random_page_1 = Math.floor(Math.random() * total_pages);

    const response_2 = await fetch(
      `https://api.unsplash.com/search/photos?query=${query}&client_id=${client_id}&color=black_and_white&orientation=portrait&per_page=30&page=${random_page_1}`
    );

    const json_2 = await response_2.json();
    const images = [...json_2.results];
    const urls: any = images.map((image) => image.urls.regular);
    const shuffled_urls: any = shuffleArray(urls);
    setData(shuffled_urls);

    continueRender(handle);
  }, [handle]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const videoConfig = useVideoConfig();
  const frame = useCurrentFrame();

  const x: any = interpolate(
    frame,
    [
      0,
      videoConfig.durationInFrames / 10,
      (2 * videoConfig.durationInFrames) / 10,
      (3 * videoConfig.durationInFrames) / 10,
      (4 * videoConfig.durationInFrames) / 10,
      videoConfig.durationInFrames,
    ],
    [-15, 15, -15, 15, -15, 15]
  );
  const rotation: any = interpolate(
    frame,
    [
      0,
      videoConfig.durationInFrames / 10,
      (2 * videoConfig.durationInFrames) / 10,
      videoConfig.durationInFrames,
    ],
    [-1, 1, -1, 1]
  );

  return (
    <>
      <Audio src={staticFile("audio.mp3")} />
      <Series>
        {data &&
          data.map((image) => {
            return (
              <Series.Sequence durationInFrames={image_duration_in_frames}>
                <AbsoluteFill
                  style={{
                    transform: `translateX(${x}px) rotate(${rotation}deg)`,
                  }}
                >
                  <Img height={videoConfig.height} src={image} />
                  <CameraMotionBlur shutterAngle={360} samples={10}>
                    <ImageComponent image_url={image} />
                  </CameraMotionBlur>
                </AbsoluteFill>
                <AbsoluteFill
                  style={{ backgroundColor: "black", opacity: 0.6 }}
                ></AbsoluteFill>

                <AbsoluteFill
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    textShadow: "rgb(255, 255, 255) 1px 0 30px",
                    textAlign: "center",
                    padding: "0 7em",
                  }}
                >
                  <h2
                    style={{
                      fontSize: "3em",
                      color: "red",
                      textShadow: "rgb(255, 0, 0) 1px 0 30px",
                      lineHeight: "1.5em",
                    }}
                  >
                    More affirmations on: <br /> www.psychicspoon.com
                  </h2>
                  <h1
                    style={{
                      lineHeight: "1.5em",
                      fontSize: "4em",
                    }}
                  >
                    {text}
                  </h1>

                  <h2
                    style={{
                      fontSize: "2.5em",
                    }}
                  >
                    Type{" "}
                    <span
                      style={{
                        color: "red",
                        textShadow: "rgb(255, 0, 0) 1px 0 30px",
                      }}
                    >
                      "YES"
                    </span>{" "}
                    to Affirm!
                  </h2>
                </AbsoluteFill>
              </Series.Sequence>
            );
          })}
      </Series>
    </>
  );
};
