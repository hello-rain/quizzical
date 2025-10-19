// QuizQuestions - renders the quiz question list and stores user answers

import { useState } from "react";
import QuizQuestion from "./QuizQuestion";

export default function QuizQuestions({
  questions,
  answers,
  onAnswer,
  isSubmitted,
  onCheckAnswers,
  score,
}) {
  // Ensure questions is an array
  const questionsArr = Array.isArray(questions) ? questions : [];

  if (questionsArr.length === 0) return <h2>No questions</h2>;

  // render each QuizQuestion, pass selected value and onAnswer handler
  const questionElements = questionsArr.map((question, questionIndex) => {
    return (
      <QuizQuestion
        key={questionIndex}
        question={question}
        questionIndex={questionIndex}
        selected={answers[questionIndex]}
        onAnswer={onAnswer}
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
