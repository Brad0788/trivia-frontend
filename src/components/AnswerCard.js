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

function decode(str) {
  let txt = new DOMParser().parseFromString(str, "text/html");

  return txt.documentElement.textContent;
}

function AnswerCard(props) {
  const [pressed, setPressed] = useState(false);
  const [color, setColor] = useState();
  const [disabled, setDisabled] = useState(false);
  const handleClick = () => {
    setPressed(!pressed);
    props.setCount(props.count + 1);
  };
  const markAndDisable = (check) => {
    if (check) {
      setColor("green");
    } else {
      setColor("red");
    }
    props.setDisabled(true);
  };
  return (
    <Grid item xs={6}>
      <Card
        sx={{
          flex: 1,
          backgroundColor:
            props.disabled && props.answer == props.correct_answer && !pressed
              ? "green"
              : color,
          pointerEvents: props.disabled ? "none" : "auto",
          opacity: props.disabled ? "0.4" : "1",
        }}
      >
        <CardActionArea
          onClick={() => {
            props.answer == props.correct_answer
              ? markAndDisable(true)
              : markAndDisable(false);
            handleClick();
          }}
        >
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {decode(props.answer)}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
export default AnswerCard;
