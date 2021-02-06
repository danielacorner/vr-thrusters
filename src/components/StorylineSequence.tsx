import React, { useState } from "react";
import { SingleParticleMounted } from "./particle/SingleParticleMounted";
import { useStore } from "../store";
import { useMount } from "../utils/utils";
import { WAVES } from "./WAVES";
import { WAVE_START_DELAY } from "./BtnStartNextWave";

export function StorylineAndIncomingViruses() {
  const [viruses, setViruses] = useState([]);
  const antibodies = useStore((s) => s.antibodies);

  const position = [0, 5 * 2, 0];
  return (
    <>
      {/* <StorylineSequence {...{ setViruses }} /> */}
      <WavesOfViruses {...{ setViruses }} />
      {viruses.map((ab, idx) => (
        <SingleParticleMounted
          {...{
            ...ab,
            position,
            key: idx,
          }}
        />
      ))}
      {antibodies.map((ab, idx) => (
        <SingleParticleMounted
          {...{
            ...ab,
            position,
            key: idx,
            // each antibody decomposes after a set amount of time
            lifespan: 5 * 1000,
          }}
        />
      ))}
    </>
  );
}

function WavesOfViruses({ setViruses }) {
  const currentWave = useStore((s) => s.currentWave);
  const wavesSoFar = WAVES.slice(0, currentWave);

  return (
    <>
      {wavesSoFar.map((waveProps, idx) => (
        <SingleWave key={idx} {...{ ...waveProps, setViruses }} />
      ))}
    </>
  );
}

function SingleWave({ numViruses, virus, setViruses }) {
  const addVirus = (newVirus) => setViruses((p) => [...p, newVirus]);

  const APPEAR_INTERVAL = 1000;
  useMount(() => {
    [...Array(numViruses)].forEach((_, idx2) => {
      setTimeout(() => {
        addVirus(virus);
      }, (idx2 + 1) * APPEAR_INTERVAL + WAVE_START_DELAY);
    });
  });

  return null;
}

/**
 * 1. the game starts at the antibody scale (0.03)
 * we practice making antibodies, and playing with the temperature
 * (they could come out of membrane transport proteins?)
 * we notice the antibodies each disappear after a certain time (with error bars)
 *
 * 2. the game scale out a bit (0.01), tiny viruses start appearing,
 * the antibodies attach to them (hp bars decrease)
 * when a virus is fully coated, becomes semi-transparent,
 * eventually it's cleaned up by a white blood cell
 *
 * 3. whenever a virus touches the cell membrane below, hp bar decreases? hardcore: 1-hit ko?
 *
 * 4. scale out more and repeat
 *
 */
export function StorylineSequence() {
  // 1. first, animate the scale to 0.01
  // useSpringStoreAfterTimeout({
  //   startTime: WAVES[0].startTime,
  //   // startTime: 60 * 1000,
  //   property: "scale",
  //   target: 0.01,
  //   springConfig: { mass: 1, tension: 170, friction: 50, precision: 0.0001 },
  // });

  // 2.1. animate the scale to 0.01
  // useSpringStoreAfterTimeout({
  //   startTime: WAVES[1].startTime,
  //   // startTime: 60 * 1000,
  //   property: "scale",
  //   target: 0.006,
  //   springConfig: { mass: 1, tension: 170, friction: 50, precision: 0.0001 },
  // });

  // animate something once after a timeout
  // useAnimateAfterTimeout({
  //   startTime: 5000,
  //   endTime: 12000,
  //   target: 0.01,
  //   property: "scale"
  // });
  // set something once after a timeout
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     set({ scale: 0.01 });
  //   }, 5000);
  //   return () => {
  //     clearTimeout(timer);
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [set]);

  return <></>;
}
