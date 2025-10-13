export default function QuizStart({
  onStart,
  introText = "Some description if needed",
  disabled = false,
}) {
  return (
    <section className="quiz-start">
      <h1 className="quiz-start__title">Quizzical</h1>
      <p className="quiz-start__description">{introText}</p>
      <button className="btn" onClick={onStart} disabled={disabled}>
        Start quiz
      </button>
    </section>
  );
}
