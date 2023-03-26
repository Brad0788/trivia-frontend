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
import AnswerCard from "./AnswerCard";

function decode(str) {
  let txt = new DOMParser().parseFromString(str, "text/html");

  return txt.documentElement.textContent;
}

function Question(props) {
  const [disabled, setDisabled] = useState(false); // by default disabled will be set to false

  const [pressed, setPressed] = useState(false);
  const handleClick = () => {
    setPressed(!pressed);
  };
  return (
    <div style={{ alignItems: "center" }}>
      <Grid
        container
        justifyContent="center"
        marginTop="10px"
        spacing={2}
        marginBottom="10px"
        paddingRight={2}
        paddingBottom={2}
        border={1}
        borderRadius="10px"
      >
        <Grid item xs={12}>
          <Typography gutterBottom variant="h5">
            {decode(props.question.question)}
          </Typography>
        </Grid>
        {props.answers.map((dataAns, keyAns) => {
          return (
            <AnswerCard
              answer={dataAns}
              correct_answer={props.question.correct_answer}
              setDisabled={setDisabled}
              disabled={disabled}
              setCount={props.setCount}
              count={props.count}
            />
          );
        })}
      </Grid>
    </div>
  );
}

export default Question;
