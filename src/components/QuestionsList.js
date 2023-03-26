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
import { Button } from "@mui/material";

function decode(str) {
  let txt = new DOMParser().parseFromString(str, "text/html");

  return txt.documentElement.textContent;
}

function QuestionsList() {
  const [apiData, setApiData] = useState([]);
  const [apiAnswers, setApiAnswers] = useState([]);
  const [pressed, setPressed] = useState(false);
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setPressed(!pressed);
  };

  const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

  useEffect(() => {
    /*fetch(`https://opentdb.com/api.php?amount=5`)
      .then((response) => response.json())
      .then((data) => {
        setApiData(data.results);
      });*/
    fetch(`https://trivia-1-y1606910.deta.app/backend/refresh-questions`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setApiData(data);
      });
  }, []);

  return (
    <div style={{ width: "85%" }}>
      {count != 5 ? (
        <Typography variant="h6">{count}</Typography>
      ) : (
        <Button onClick={() => window.location.reload(true)}>Start Over</Button>
      )}
      {apiData.map((data, key) => {
        return (
          <Question
            question={data}
            answers={data.all_answers}
            correct_answer={data.correct_answer}
            setCount={setCount}
            count={count}
          />
        );
      })}
    </div>
  );
}

export default QuestionsList;
