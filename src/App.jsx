import { useState, useEffect, useRef } from "react";
import QuizStart from "./components/QuizStart";

export default function App() {
  // App state
  const [isStarted, setIsStarted] = useState(false);
  const [questions, setQuestions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // App refs
  const fetchedRef = useRef(false);

  function startQuiz() {
    setIsStarted(true);
  }

  // Fetch questions when quiz starts
  useEffect(() => {
    // Run the fetch once when the quiz starts (prevents duplicate requests in dev/StrictMode)
    if (!isStarted || fetchedRef.current) return;
    fetchedRef.current = true;

    const controller = new AbortController();

    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch("https://opentdb.com/api.php?amount=10", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setQuestions(data.results ?? data);
      } catch (error) {
        if (error.name !== "AbortError") setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    return () => controller.abort();
  }, [isStarted]);

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
