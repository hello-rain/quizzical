export default function QuizStart(props) {
  return (
    <div className="quiz-start">
      <h1 className="quiz-start__title">Quizzical</h1>
      <p className="quiz-start__description">Some description if needed</p>
      <button className="btn" onClick={props.flipStartQuiz}>
        Start quiz
      </button>
    </div>
  );
}
