export default function QuizQuestion() {
  // Fisher-Yates shuffle - non-mutating: returns a new array
  function shuffleArray(arr) {
    const newArr = arr.slice();
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;

    // small helper to decode HTML entities from OpenTDB
    function decodeHtml(html) {
      const text = document.createElement("textarea");
      text.value = html;
      return text.value;
    }
  }

  // category: "General Knowledge";
  // correct_answer: "Swiss Air";
  // difficulty: "easy";
  // incorrect_answers: (3)[("Air France", "British Airways", "TWA")];
  // question: "What airline was the owner of the plane that crashed off the coast of Nova Scotia in 1998?";
  // type: "multiple";
}
