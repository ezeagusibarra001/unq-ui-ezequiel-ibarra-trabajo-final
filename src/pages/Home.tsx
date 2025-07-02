import Button from "../components/ui/button/Button";
import Container from "../components/ui/layout/Container";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="container">
      <Container justify="center" align="center" gap="1.5rem">
        <img src="wordle-icon.svg" alt="Wordle Icon" />
        <h1 className="text-title">Wordle</h1>
        <p className="text-subtitle text-center">
          Get 6 chances to guess a 5-letter word.
        </p>
        <Link to="/play">
          <Button>Play</Button>
        </Link>
        <p className="text-caption">
          {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <p className="text-caption">
          Created by{" "}
          <a
            href="https://www.linkedin.com/in/ibarraezequiel"
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            Ezequiel Ibarra
          </a>
        </p>
      </Container>
    </main>
  );
}
