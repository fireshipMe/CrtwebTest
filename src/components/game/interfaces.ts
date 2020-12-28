export interface IGameState {
  id: number,
  correspondingId: number,
  icon: any,
  isHidden: boolean,
  isRemoved: boolean,
}

export interface IScoreBoard {
  name: string,
  score: number,
}
