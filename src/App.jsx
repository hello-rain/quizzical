import { useState, useEffect, useRef } from "react";
import QuizStart from "./components/QuizStart";
import QuizQuestions from "./components/QuizQuestions";
import decodeHtml from "./utils/html";
import normalize from "./utils/normalize";

export default function App() {
  // App states
  const [isStarted, setIsStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState({}); // { [questionIndex]: choiceValue }
  const [isSubmitted, setSubmitted] = useState(false);
  const [results, setResults] = useState([]);
  const [isNewQuiz, setNewQuiz] = useState(false);

  // App refs
  const fetchedRef = useRef(false);

  function startQuiz() {
    setIsStarted(true);
  }

  // Track answers
  function handleAnswer(questionIndex, answer) {
    setAnswers((prevAnswers) => ({ ...prevAnswers, [questionIndex]: answer }));
  }

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

    // Count correct answers
    const score = perQuestion.filter((r) => r.isCorrect).length;

    return { score, perQuestion };
  }

  function handleCheckAnswers() {
    const { score, perQuestion } = computeResults();
    setResults(perQuestion);
    setSubmitted(true);
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

    fetchData();
    return () => controller.abort();
  }, [isStarted]);

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
          />
        )
      ) : (
        <QuizStart onStart={startQuiz} disabled={loading} />
      )}
    </main>
  );
}
