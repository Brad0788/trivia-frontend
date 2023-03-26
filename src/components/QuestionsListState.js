import { useEffect, useState } from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Question from "./Question";

function decode(str) {
  let txt = new DOMParser().parseFromString(str, "text/html");

  return txt.documentElement.textContent;
}

function QuestionsListState() {
  const [apiData, setApiData] = useState([]);
  const [apiAnswers, setApiAnswers] = useState([]);
  const [pressed, setPressed] = useState(false);
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setPressed(!pressed);
  };

  const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

  useEffect(() => {
    fetch(`https://opentdb.com/api.php?amount=5`)
      .then((response) => response.json())
      .then((data) => {
        setApiData(data.results);
      });
  }, []);

  return (
    <div style={{ width: "85%" }}>
      {apiData.map((data, key) => {
        var all_answers = data.incorrect_answers.slice();
        all_answers.push(data.correct_answer);
        const all_answers_shuffle = shuffle(all_answers);
        return (
          <Question
            question={data}
            answers={all_answers_shuffle}
            correct_answer={data.correct_answer}
          />
        );
      })}
    </div>
  );
}

export default QuestionsListState;
