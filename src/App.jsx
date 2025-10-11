import { useState, useEffect } from "react";
import QuizStart from "./components/QuizStart";

export default function App() {
  // App state
  const [isStarted, setIsStarted] = useState(false);
  const [questions, setQuestions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function startQuiz() {
    setIsStarted(true);
  }

  // Render start screen. After starting, show loading, error, or questions.
  return (
    <>
      {isStarted ? (
        loading ? (
          <p>Loading questions…</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <p>Questions</p>
        )
      ) : (
        <QuizStart onStart={startQuiz} disabled={loading} />
      )}
    </>
  );
}
