import styled, { keyframes } from "styled-components";
import { GameBootstrap } from "react-simple-game-engine";

import { Menu } from "./scenes/menu.scene";
import { Scene1 } from "./scenes/sc1.scene";

import SpinnerImg from "assets/images/spinner.png";

const GameContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #1c1c1c;

  position: relative;
`;

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
  top: 50%;
  left: 50%;
  width: 100px;
  height: 100px;
  border-radius: 100%;

  background-image: url(${({ sprite }) => sprite});
  background-size: cover;
  transform: translate(-50%, -50%);

  animation: ${assetsSpinner} 2s linear infinite;
`;

function App() {
  return (
    <GameContainer>
      <GameBootstrap
        scenes={[Menu, Scene1]}
        width={1040}
        height={650}
        assetsLoader={<AssetsLoader sprite={SpinnerImg} />}
      />
    </GameContainer>
  );
}

export default App;
