import React, { useState, useEffect, useCallback } from 'react';
import shuffle from 'lodash/shuffle';
import { useTimer } from 'react-timer-hook';

import { IGameState, IScoreBoard } from './interfaces';
import { initialGameState } from './initialGameState';
import { GAME_STATUS } from '../../const/gameStatus';

import { Panel } from '../panel';
import { ProgressBar } from '../progressBar';

import {
  Container,
  PanelsContainer,
  ControlPanel,
  GameInfoContainer,
  GameOver,
  CurrentScoreHeader,
  ScoreEntry,
  ScoreHeader,
} from './nodes';

export const Game = () => {
  const [gameState, setGameState] = useState<IGameState[]>(initialGameState);
  const [previousClickedId, setPreviousClickedId] = useState<number>(-1);
  const [playerName, setPlayerName] = useState<string>('Player');
  const [score, setScore] = useState<number>(0);
  const [scoreBoard, setScoreBoard] = useState<IScoreBoard[]>([]);
  const [gameStatus, setGameStatus] = useState(GAME_STATUS.GAME_FIRST_LOAD);

  const onTimerExpire = () => {
    if (gameStatus === GAME_STATUS.GAME_SHUFFLED || gameStatus === GAME_STATUS.GAME_FIRST_LOAD) {
      return;
    }
    if (gameStatus !== GAME_STATUS.GAME_COMPLETED) {
      setGameStatus(GAME_STATUS.GAME_LOCKED);
    }
    setScoreBoard([...scoreBoard, {name: playerName, score}])
  };

  const time = new Date();
  time.setSeconds(time.getHours());

  const { seconds, restart } = useTimer({ expiryTimestamp: time.getTime(), onExpire: onTimerExpire });

  const updateTimer = useCallback((seconds: number) => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + seconds);
    restart(time.getTime());
  }, [restart])

  const startGame = useCallback(() => {
    const state = [...gameState];
    state.forEach(el => {
      el.isHidden = true;
      el.isRemoved = false;
    });

    setGameState(state);
    setScore(0);
    setGameStatus(GAME_STATUS.GAME_UNLOCKED);
    setPreviousClickedId(-1);

    updateTimer(5);
  }, [gameState, updateTimer])

  const reshuffle = useCallback(() => {
    const state = [...gameState];
    state.forEach(el => {
      el.isHidden = false;
      el.isRemoved = false;
    });
    setGameState(shuffle(state));
    updateTimer(0);
    setGameStatus(GAME_STATUS.GAME_SHUFFLED);
    setScore(0);
  }, [gameState, updateTimer])

  const removePanelById = useCallback((id: number) => {
    const updatedState = gameState.map(el => {
      if (el.id === id || el.correspondingId === id) {
        return {...el, isRemoved: true}
      }
      return el;
    })
    setGameState(updatedState);
  }, [gameState]);

  const showPanelById = useCallback((id: number) => {
    const updatedState = gameState.map(el => {
      if (el.id === id) {
        return {...el, isHidden: false}
      }
      return el;
    })
    setGameState(updatedState);
  }, [gameState])

  const hidePanelById = useCallback((id: number) => {
    const updatedState = gameState.map(el => {
      if (el.id === id) {
        return {...el, isHidden: true}
      }
      return el;
    })
    setGameState(updatedState);
  }, [gameState]);

  const handleClick = useCallback((id: number, correspondingId: number) => {
    if (gameStatus === GAME_STATUS.GAME_LOCKED) {
      return;
    }

    const panelState = gameState.find(item => item.id === id);
    // @ts-ignore
    if (!panelState.isHidden) {
      return
    }

    showPanelById(id);

    if (previousClickedId === -1) {
      setPreviousClickedId(id);
      return
    }

    if (previousClickedId === correspondingId) {
      showPanelById(correspondingId);
      setPreviousClickedId(-1);
      setScore(score + 1);
      removePanelById(id);
      removePanelById(previousClickedId);
      updateTimer(5);
    } else {
      showPanelById(id)
      setTimeout(() => {
        hidePanelById(id);
        hidePanelById(previousClickedId);
      }, 150)
      setPreviousClickedId(-1);
    }
  }, [gameState, gameStatus, hidePanelById, previousClickedId, removePanelById, score, showPanelById, updateTimer]);

  useEffect(() => {
    if (score === 18 && gameStatus !== GAME_STATUS.GAME_COMPLETED) {
      setGameStatus(GAME_STATUS.GAME_COMPLETED);
      updateTimer(0.01);
    }
  }, [score, gameStatus, updateTimer])

  return (
      <Container>
        <ControlPanel>
          <input type="text" onChange={e => setPlayerName(e.target.value)} value={playerName}/>
          <button onClick={startGame}>
            Start game
          </button>
          <button onClick={reshuffle}>
            Shuffle
          </button>
        </ControlPanel>
        <PanelsContainer>
          <CurrentScoreHeader>
            Current Score: {score}
          </CurrentScoreHeader>
          <ProgressBar maxValue={5} currentValue={seconds} />
          {gameState.map(item => (
              <Panel
                onClick={() => handleClick(item.id, item.correspondingId)}
                isHidden={item.isHidden}
                isRemoved={item.isRemoved}
                icon={item.icon}
              />
          ))}
          {gameStatus === GAME_STATUS.GAME_LOCKED && (<GameOver>Game Over :(</GameOver>)}
          {gameStatus === GAME_STATUS.GAME_COMPLETED && (<GameOver>Congratulations!</GameOver>)}
        </PanelsContainer>
        <GameInfoContainer>
          <ScoreHeader>
            Score Board
          </ScoreHeader>
          {scoreBoard.map(item =>
            <ScoreEntry>
              {item.name}: {item.score}
            </ScoreEntry>
          )}
        </GameInfoContainer>
      </Container>
  )
};
