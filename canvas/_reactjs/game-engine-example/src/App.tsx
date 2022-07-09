import { ScenesProcess } from "react-simple-game-engine";
import styled, { keyframes } from "styled-components";

import { Menu } from "./scenes/menu.scene";
import { Scene1 } from "./scenes/sc1.scene";

import SpinnerImg from "assets/images/spinner.png";

const GameContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #1c1c1c;

  display: flex;
  align-items: center;
  justify-content: center;
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
  width: 100px;
  height: 100px;
  border-radius: 100%;

  background-image: url(${({ sprite }) => sprite});
  background-size: cover;

  animation: ${assetsSpinner} 2s linear infinite;
`;

function App() {
  return (
    <GameContainer>
      <ScenesProcess
        list={[Menu, Scene1]}
        width={1040}
        height={650}
        assetsLoader={<AssetsLoader sprite={SpinnerImg} />}
      />
    </GameContainer>
  );
}

export default App;
