export interface Difficulty {
  id: string;
  name: string;
}

export interface GameSession {
  sessionId: string;
  difficulty: Difficulty;
  wordLenght: number;
}

export interface CheckWordRequest {
  sessionId: string;
  word: string;
}

export enum WordStatus {
  CORRECT = "correct",
  ELSEWHERE = "elsewhere",
  ABSENT = "absent",
}

export interface CheckWord {
  letter: string;
  solution: WordStatus;
}

export type CheckWordResponse = CheckWord[];
