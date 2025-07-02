import { API_ROUTES } from "../constants/api";
import type { CheckWordResponse, Difficulty } from "../types/global";
import { api } from "./api.service";

interface CreateSessionResponse {
  sessionId: string;
  difficulty: Difficulty;
  wordLenght: number;
}

export const createSession = async (dificulty: Difficulty) => {
  try {
    const response = await api.get<CreateSessionResponse>(
      API_ROUTES.createSession(dificulty.id)
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const checkWord = async (
  sessionId: string,
  word: string
): Promise<CheckWordResponse> => {
  try {
    const response = await api.post<CheckWordResponse>(API_ROUTES.checkWord, {
      word,
      sessionId,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
