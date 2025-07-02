import { useEffect, useState } from "react";
import Button from "../components/ui/button/Button";
import Container from "../components/ui/layout/Container";
import type { Difficulty } from "../types/global";
import { api } from "../services/api.service";
import { API_ROUTES } from "../constants/api";
import { retrieveCurrentDate } from "../helper/dates";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createSession } from "../services/play.service";

export default function HomePage() {
  const navigate = useNavigate();
  const [dificulties, setDifficulties] = useState<Difficulty[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<Difficulty | null>(null);
  const [loadingDificulties, setLoadingDificulties] = useState(true);
  const [loading, setLoading] = useState(false);
  const fetchDifficulties = async () => {
    try {
      setLoadingDificulties(true);
      const res = await api.get<Difficulty[]>(API_ROUTES.getDificulties);
      console.log("Difficulties fetched:", res.data);
      setDifficulties(res.data);
      setLoadingDificulties(false);
    } catch (error) {
      console.error("Error fetching difficulties:", error);
    }
  };

  const handleCreateSession = async () => {
    try {
      if (!selectedDifficulty) {
        toast.error("Please select a difficulty level.");
        return;
      }
      setLoading(true);
      toast.loading("Creating session...");
      const session = await createSession(selectedDifficulty);
      console.log("Session created:", session);
      toast.dismiss();
      toast.success("Session created successfully!");
      navigate(`/play/${session.sessionId}`, {
        state: {
          difficulty: session.difficulty,
          wordLength: session.wordLenght,
        },
      });
    } catch (error) {
      console.error("Error creating session:", error);
      toast.dismiss();
      toast.error("Failed to create session. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDifficulties();
  }, []);

  return (
    <main className="container">
      <Container justify="center" align="center" gap="1.5rem">
        <img src="wordle-icon.svg" alt="Wordle Icon" />
        <h1 className="text-title">Wordle</h1>
        <p className="text-subtitle text-center">
          Get 6 chances to guess a 5-letter word.
        </p>
        {!selectedDifficulty &&
          dificulties.map((difficulty) => (
            <Button
              key={difficulty.id}
              variant="outline"
              onClick={() => setSelectedDifficulty(difficulty)}
            >
              {difficulty.name}
            </Button>
          ))}
        {selectedDifficulty && (
          <>
            <Button
              loading={loadingDificulties || loading}
              onClick={handleCreateSession}
            >
              Play in {selectedDifficulty.name.toLowerCase()}
            </Button>
            <Button
              variant="outline"
              disabled={loadingDificulties}
              onClick={() => setSelectedDifficulty(null)}
            >
              Back to difficulties
            </Button>
          </>
        )}
        <p className="text-caption">{retrieveCurrentDate()}</p>
        <p className="text-caption">
          Created by{" "}
          <Link
            to="https://www.linkedin.com/in/ibarraezequiel"
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            Ezequiel Ibarra
          </Link>
        </p>
      </Container>
    </main>
  );
}
