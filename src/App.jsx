import { useState, useEffect, useRef, useMemo } from "react";
import QuizStart from "./components/QuizStart";
import QuizQuestions from "./components/QuizQuestions";
import decodeHtml from "./utils/html";
import normalize from "./utils/normalize";

export default function App() {
  // 1. State
  // state: app / server
  const [questions, setQuestions] = useState([]);
  const [results, setResults] = useState([]);

  // state: UI
  const [isStarted, setIsStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // state: user data
  const [answers, setAnswers] = useState({}); // { [questionIndex]: choiceValue }
  const [isSubmitted, setSubmitted] = useState(false);

  // control keys / misc
  const [quizKey, setQuizKey] = useState(0);

  // 2. Refs
  const fetchedRef = useRef(false);

  // 3. Derived
  const score = useMemo(() => {
    return results?.filter((r) => r.isCorrect).length ?? 0;
  }, [results]);

  // 4. Event handlers
  function startQuiz() {
    setIsStarted(true);
  }

  // startQuiz - set the app into the quiz view and trigger fetching
  function startQuiz() {
    setIsStarted(true);
  }

  // handleAnswer - record the user's selected answer for a question
  function handleAnswer(questionIndex, answer) {
    setAnswers((prevAnswers) => ({ ...prevAnswers, [questionIndex]: answer }));
  }

  // computeResults - grade the current answers and return per-question results
  function computeResults() {
    const perQuestion = questions.map((question, questionIndex) => {
      const correctRaw = question?.correct_answer ?? "";
      const selectedRaw = answers[questionIndex] ?? "";

      // Convert answers to a consistent format
      const correctNormalized = normalize(decodeHtml(correctRaw));
      const selectedNormalized = normalize(decodeHtml(selectedRaw));

      const isCorrect = correctNormalized === selectedNormalized;

      return {
        index: questionIndex,
        isCorrect,
        correctAnswer: decodeHtml(correctRaw),
        selectedAnswer: decodeHtml(selectedRaw),
      };
    });

    return perQuestion;
  }

  // handleCheckAnswers - compute and store grading results, mark quiz as submitted
  function handleCheckAnswers() {
    const perQuestion = computeResults();
    setResults(perQuestion);
    setSubmitted(true);
  }
  // handleNewQuiz - reset quiz state and trigger a fresh fetch (via quizKey)
  function handleNewQuiz() {
    setAnswers({});
    setResults([]);
    setSubmitted(false);
    setQuestions([]);
    fetchedRef.current = false;
    setQuizKey((k) => k + 1);
  }

  // 5. Async helpers
  async function fetchQuestions(controller) {
    setLoading(true);
    try {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=5&type=multiple",
        {
          signal: controller.signal,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setQuestions(data.results);
    } catch (error) {
      if (error.name !== "AbortError") setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  // 6. Side-effects (fetching)
  // Fetch questions when quiz starts
  useEffect(() => {
    // Run the fetch once when the quiz starts (prevents duplicate requests in dev/StrictMode)
    if (!isStarted || fetchedRef.current) return;
    fetchedRef.current = true;

    const controller = new AbortController();

    fetchQuestions(controller);
    return () => controller.abort();
  }, [isStarted, quizKey]);

  // 7. Render
  // Render start screen. After starting, show loading, error, or questions.
  return (
    <main>
      {isStarted ? (
        loading ? (
          <p className="quiz-loading">Loading questions…</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <QuizQuestions
            questions={questions}
            answers={answers}
            onAnswer={handleAnswer}
            isSubmitted={isSubmitted}
            onCheckAnswers={handleCheckAnswers}
            score={score}
            results={results}
            onNewQuiz={handleNewQuiz}
          />
        )
      ) : (
        <QuizStart onStart={startQuiz} disabled={loading} />
      )}
    </main>
  );
}
