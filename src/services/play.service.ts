import { API_ROUTES } from "../constants/api";
import type { Difficulty } from "../types/global";
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
