import styled, { keyframes } from "styled-components";
import { GameBootstrap } from "react-simple-game-engine";

import { Menu } from "./scenes/menu.scene";
import { Scene1 } from "./scenes/sc1.scene";

import SpinnerImg from "assets/images/spinner.png";

const assetsSpinner = keyframes`
    from {
    }
    to {
      transform: rotate(360deg);
    }
`;

const AssetsLoader = styled.div<{
  sprite: string;
}>`
  position: relative;
  top: calc(50% - 50px);
  left: calc(50% - 50px);
  width: 100px;
  height: 100px;
  border-radius: 100%;

  background-image: url(${({ sprite }) => sprite});
  background-size: cover;

  animation: ${assetsSpinner} 2s linear infinite;
`;

function App() {
  return (
    <GameBootstrap
      scenes={[Menu, Scene1]}
      width={1040}
      height={650}
      assetsLoader={<AssetsLoader sprite={SpinnerImg} />}
    />
  );
}

export default App;
