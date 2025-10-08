export default function Home({ onStart }) {
  return (
    <div className="home">
      <h1 className="home__title">Quizzical</h1>
      <p className="home__description">Some description if needed</p>
      <button
        className="home__start-button"
        onClick={() => onStart && onStart()}
      >
        Start quiz
      </button>
    </div>
  );
}
