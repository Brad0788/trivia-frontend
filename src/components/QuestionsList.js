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
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
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

  function QuestionsListComponent() {
    return (
      <div style={{ width: "85%" }}>
        {count != 5 ? (
          <Typography variant="h6">{count}</Typography>
        ) : (
          <Button onClick={() => window.location.reload(true)}>
            Start Over
          </Button>
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

  function LoadingComponent() {
    return (
      <Box
        sx={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

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
    <>
      {apiData.length > 0 ? <QuestionsListComponent /> : <LoadingComponent />}
    </>
  );
}

export default QuestionsList;
