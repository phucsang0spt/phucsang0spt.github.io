import styled from "styled-components";

import { Saver, Scene } from "react-simple-game-engine";
import {
  SoundOnceWatcher,
  Watcher,
} from "react-simple-game-engine/lib/utilities";

import { FaMoneyBill } from "@react-icons/all-files/fa/FaMoneyBill";
import { FaVolumeUp } from "@react-icons/all-files/fa/FaVolumeUp";
import { FaVolumeMute } from "@react-icons/all-files/fa/FaVolumeMute";

import healthbarFill from "assets/images/healthbar-fill.jpg";
import { ResultPopup } from "components/result-popup";
import { formatCurrency } from "utils";

const Root = styled.div`
  width: 100%;
  height: 100%;

  position: relative;
`;

const HPBar = styled.div<{ avatar: string; percent: number }>`
  position: absolute;
  left: 25px;
  top: 15px;

  width: 200px;
  height: 20px;
  border-radius: 2px;
  overflow: hidden;
  box-shadow: 0 0 6px 0.1px #00000061;

  > div {
    width: calc(${({ percent }) => percent} * 1%);
    height: 100%;
    transition: width 200ms ease-in-out;
    overflow: hidden;

    > div {
      width: 200px;
      height: 100%;
      background-image: url(${({ avatar }) => avatar});
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center center;
    }
  }
`;

const RightSide = styled.div`
  position: absolute;
  top: 15px;
  right: 25px;

  display: flex;
  align-items: center;

  span {
    font-size: 14px;
    line-height: 14px;

    margin-right: 5px;
  }

  svg {
    color: #39c;
    font-size: 20px;
    line-height: 20px;

    + svg {
      margin-left: 10px;
    }
  }
`;

const WaveBar = styled.div<{ percent: number }>`
  position: absolute;
  top: 15px;
  left: 50%;
  transform: translateX(-50%);

  width: 200px;
  height: 20px;

  box-shadow: 0 0 6px 0.1px #00000061;

  > div {
    transition: width 200ms ease-in-out;
    border-radius: 2px;
    overflow: hidden;
    width: calc(${({ percent }) => percent} * 1%);
    height: 100%;
    background-color: #ff4040;
  }

  > span {
    font-size: 25px;
    line-height: 25px;
    color: #fff;
    position: relative;
    top: -50%;
    left: 50%;

    transform: translate(-50%, -50%);

    width: 35px;
    height: 35px;
    border: 3px solid #ecf0f1;
    background-color: #ff4040;
    border-radius: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export type GamePlayUIProps = {
  scene: Scene;
  playerHP: number;
  playerMoney: number;
  totalEnemies: number;
  waveNumber: number;
};

export function GamePlayUI({
  totalEnemies,
  playerHP,
  playerMoney,
  scene,
}: GamePlayUIProps) {
  return (
    <Root>
      <Watcher
        scene={scene}
        names="player-health"
        initialValues={{
          "player-health": playerHP,
        }}
      >
        {({ "player-health": _playerHP }) => (
          <HPBar percent={(_playerHP / playerHP) * 100} avatar={healthbarFill}>
            <div>
              <div />
            </div>
          </HPBar>
        )}
      </Watcher>
      <Watcher
        scene={scene}
        names={["total-enemies", "wave-number"]}
        initialValues={{
          "total-enemies": totalEnemies,
          "wave-number": 0,
        }}
      >
        {({
          "total-enemies": currentQtyEnemies,
          "wave-number": currentWaveNumber,
        }) => (
          <WaveBar percent={(currentQtyEnemies / totalEnemies) * 100}>
            <div>
              <div />
            </div>
            <span>{currentWaveNumber}</span>
          </WaveBar>
        )}
      </Watcher>

      <RightSide>
        <span>
          <Watcher
            scene={scene}
            names="player-money"
            initialValues={{
              "player-money": playerMoney,
            }}
          >
            {({ "player-money": playerMoney }) => formatCurrency(playerMoney)}
          </Watcher>
        </span>
        <FaMoneyBill />
        <SoundOnceWatcher scene={scene}>
          {({ canPlay }) =>
            canPlay ? (
              <FaVolumeUp
                onClick={() => {
                  scene.soundOnceOptions = {
                    canPlay: false,
                  };
                  Saver.set("sound", false);
                }}
              />
            ) : (
              <FaVolumeMute
                onClick={() => {
                  scene.soundOnceOptions = {
                    canPlay: true,
                  };
                  Saver.set("sound", true);
                }}
              />
            )
          }
        </SoundOnceWatcher>
      </RightSide>
      <Watcher
        scene={scene}
        names="result"
        initialValues={
          {
            result: null,
          } as {
            result: { isWin: boolean } | null;
          }
        }
      >
        {({ result }) =>
          result && <ResultPopup scene={scene} isWin={result.isWin} />
        }
      </Watcher>
    </Root>
  );
}
