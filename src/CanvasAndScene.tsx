import React from "react";
import { Controls } from "react-three-gui";
import Scene from "./components/Scene";
import { useWindowSize } from "./utils/hooks";
import * as THREE from "three";

// import { useFrame } from "react-three-fiber";
import BottomControls from "./BottomControls";
import { ScaleControls } from "./ScaleControls";
import { IconButton } from "@material-ui/core";
import { useStore } from "./store";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import SideControls from "./SideControls";

export default function CanvasAndScene({ renderProteins = true }) {
  const windowSize = useWindowSize();
  //  // This one makes the camera move in and out
  //  useFrame(({ clock, camera }) => {
  //   camera.position.z = 50 + Math.sin(clock.getElapsedTime()) * 30
  // })
  return (
    <>
      <Controls.Provider>
        <Controls.Canvas
          onCreated={({ gl }) => {
            gl.shadowMap.enabled = true;
            gl.shadowMap.type = THREE.PCFShadowMap;
          }}
          gl={{ antialias: false, alpha: false }}
          style={{ height: windowSize.height, width: windowSize.width }}
          camera={{ fov: 75, position: [0, 0, 15] }}
        >
          <Scene />
        </Controls.Canvas>
        {process.env.NODE_ENV === "development" ? <Controls /> : null}
      </Controls.Provider>
      <HideHpControls />
      <SideControls />
      <BottomControls />
    </>
  );
}

function HideHpControls() {
  const set = useStore((s) => s.set);
  const showHp = useStore((s) => s.showHp);
  return (
    <div style={{ position: "fixed", top: 4, right: 4 }}>
      <IconButton onClick={() => set({ showHp: !showHp })}>
        {showHp ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </div>
  );
}
