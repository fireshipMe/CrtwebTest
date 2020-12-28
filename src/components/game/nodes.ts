import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding-top: 20px;
  @media screen and (max-width: 800px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const PanelsContainer = styled.div`
  display: flex;
  position: relative;
  flex-wrap: wrap;
  width: 50%;
  justify-content: center;
  @media screen and (max-width: 800px) {
    width: 80%;
  }
  @media screen and (max-width: 700px) {
    width: 85%;
  }
  @media screen and (max-width: 600px) {
    width: 95%;
  }
`;

export const Panel = styled.div`
  width: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const ControlPanel = styled.div`
  width: 10%;
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  @media screen and (max-width: 900px) {
      width: 20%;
  }
  @media screen and (max-width: 800px) {
      flex-direction: row;
      width: 95%;
      justify-content: space-evenly;
  }
  > button {
    margin-top: 10px;
    border: none;
    color: #737d88;
    background-color: #edeef0;
    height: 30px;
    font-size: 14px;
    font-weight: bold;
    text-align: left;
    padding-left: 10px;
    border-radius: 10px;
    outline: none;
    @media screen and (max-width: 900px) {
      font-size: 12px;
      padding-left: 5px;
    }
    @media screen and (max-width: 800px) {
      margin: 0;
    }
    &:hover {
      background-color: #d7d5d8;
    }
  }
  
  > input {
    outline: none;
    border-radius: 10px;
    border: none;
    background-color: #edeef0;
    color: #737d88;
    padding-left: 10px;
    font-weight: bold;
    font-size: 14px;
    height: 30px;
    @media screen and (max-width: 900px) {
      font-size: 12px;
      padding-left: 5px;
    }
    &:focus {
      background-color: #d7d5d8;
    }
  }
`;

export const GameInfoContainer = styled.div`
  white-space: nowrap;
  overflow-y: auto;
  max-height: 40vh;
  text-align: center;
`;

export const ScoreHeader = styled.h3`
  
`;

export const ScoreEntry = styled.div`
  background-color: #edeef0;
  color: #737d88;
  padding: 5px 10px;
  margin-top: 5px;
  border-radius: 4px;
  text-align: left;
  font-weight: bold;
`;

export const CurrentScoreHeader = styled.h3`
  margin: 0;
`;

export const GameOver = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  color: lightslategray;
  display: flex;
  font-size: 7em;
  font-weight: bold;
  user-select: none;
  white-space: nowrap;
  @media screen and (max-width: 1024px) {
    font-size: 5em;
  }
  @media screen and (max-width: 800px) {
    font-size: 4em;
  }
  @media screen and (max-width: 600px) {
    font-size: 3em;
  }
`;
