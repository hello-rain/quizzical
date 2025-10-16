// QuizQuestions - renders the quiz question list and stores user answers

import { useState } from "react";
import QuizQuestion from "./QuizQuestion";

export default function QuizQuestions({ questions }) {
  // Ensure questions is an array
  const questionsArr = Array.isArray(questions) ? questions : [];

  if (questionsArr.length === 0) return <h2>No questions</h2>;

  // answers map: { [questionIndex]: selectedChoice }
  const [answers, setAnswers] = useState({});

  // update an answer for a given question (called by child: onAnswer(index, choice))
  function handleAnswer(questionIndex, choice) {
    setAnswers((prev) => ({ ...prev, [questionIndex]: choice }));
  }

  return <div className="quiz-questions">{questionElements}</div>;
}
