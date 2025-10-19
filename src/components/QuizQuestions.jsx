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

  // render each QuizQuestion, pass selected value and onAnswer handler
  const questionElements = questionsArr.map((question, questionIndex) => {
    return (
      <QuizQuestion
        key={questionIndex}
        question={question}
        questionIndex={questionIndex}
        selected={answers[questionIndex]}
        onAnswer={handleAnswer}
      />
    );
  });

  return (
    <section className="quiz-questions">
      {questionElements}
      <button className="btn">Check answers</button>
    </section>
  );
}
