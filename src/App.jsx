import { useState, useEffect } from "react";
import QuizStart from "./components/QuizStart";

export default function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [questions, setQuestions] = useState(null);

  function startQuiz() {
    setIsStarted(true);
  }

  return (
    <>{isStarted ? <p>Questions here</p> : <QuizStart onStart={startQuiz} />}</>
  );
}
