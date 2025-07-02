export const BASE_API_URL = "https://word-api-hmlg.vercel.app/api";

export const API_ROUTES = {
  getDificulties: `${BASE_API_URL}/difficulties`,
  createSession: (dificultyId: string) =>
    `${BASE_API_URL}/difficulties/${dificultyId}`,
  checkWord: `${BASE_API_URL}/checkWord`,
};
