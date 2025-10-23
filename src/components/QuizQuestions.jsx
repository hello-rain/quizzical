// QuizQuestions - renders the quiz question list and stores user answers

import QuizQuestion from "./QuizQuestion";

export default function QuizQuestions({
  questions,
  answers,
  onAnswer,
  isSubmitted,
  onCheckAnswers,
  score,
  results,
  onNewQuiz,
}) {
  // Ensure questions is an array
  const questionsArr = Array.isArray(questions) ? questions : [];

  if (questionsArr.length === 0) return <h2>No questions</h2>;

  const totalScore = questionsArr.length;

  // render each QuizQuestion, pass selected value and onAnswer handler
  const questionElements = questionsArr.map((question, questionIndex) => {
    const questionResult = results?.[questionIndex] ?? null;
    return (
      <QuizQuestion
        key={questionIndex}
        question={question}
        questionIndex={questionIndex}
        selected={answers[questionIndex]}
        onAnswer={onAnswer}
        isSubmitted={isSubmitted}
        questionResult={questionResult}
      />
    );
  });

  return (
    <section className="quiz-questions">
      {questionElements}
      {isSubmitted ? (
        <div className="quiz-results" aria-labelledby="quiz-results-heading">
          <h2 id="quiz-results-heading" className="sr-only">
            Quiz Results
          </h2>
          <p
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className="quiz-results__score"
          >
            You scored {score}/{totalScore} correct answers
          </p>
          <button className="btn" onClick={onNewQuiz}>
            Play again
          </button>
        </div>
      ) : (
        <button className="btn" onClick={onCheckAnswers}>
          Check answers
        </button>
      )}
    </section>
  );
}
