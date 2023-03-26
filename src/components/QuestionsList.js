import { useEffect, useState, useRef } from "react";
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
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import Question from "./Question";
import { Button } from "@mui/material";

function decode(str) {
  let txt = new DOMParser().parseFromString(str, "text/html");

  return txt.documentElement.textContent;
}

function ConfirmationDialogRaw(props) {
  const { onClose, value: valueProp, open, ...other } = props;
  const [value, setValue] = useState(valueProp);
  const radioGroupRef = useRef(null);

  useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onClose(value);
    window.location.reload(true);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...other}
    >
      <DialogTitle>Play Again?</DialogTitle>

      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Check Answers
        </Button>
        <Button onClick={handleOk}>Restart</Button>
      </DialogActions>
    </Dialog>
  );
}

function QuestionsList() {
  const [apiData, setApiData] = useState([]);
  const [apiAnswers, setApiAnswers] = useState([]);

  const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

  function QuestionsListComponent() {
    const [pressed, setPressed] = useState(false);
    const [count, setCount] = useState(0);
    const handleClick = () => {
      setPressed(!pressed);
    };

    const [open, setOpen] = useState(true);
    const [value, setValue] = useState("Dione");

    const handleClickListItem = () => {
      setOpen(true);
    };

    const handleClose = (newValue) => {
      setOpen(false);

      if (newValue) {
        setValue(newValue);
      }
    };

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
        {count == 5 && (
          <ConfirmationDialogRaw
            id="ringtone-menu"
            keepMounted
            open={open}
            onClose={handleClose}
            value={value}
          />
        )}
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
