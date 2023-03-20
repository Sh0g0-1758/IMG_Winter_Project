import React, { useState } from "react";
import "./addQuiz.css";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const QuesObject = [];

function AddQuestion(props) {
  const handleChange = (e) => {
    QuesObject[props.id - 1].question = e.target.value;
    console.log(QuesObject);
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "60ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          onChange={handleChange}
          id="AddQuestion"
          label="Add Question"
          multiline
          maxRows={2}
          width="500"
        />
      </div>
    </Box>
  );
}

function AddTextBox(props) {
  var label_ = `Option ${props.no}`;
  var temp = props.no;

  //const [selectedValue, setSelectedValue] = React.useState(props.id);

  const handleChange = (e) => {
    //setSelectedValue(event.target.value);
    // QuesObject[props.id-1]['props.id']= event.target.value;
    console.log(e.target.value + " " + props.id + " " + props.no);
    console.log(QuesObject);

    if (props.no === "1") {
      QuesObject[props.id - 1].option_1 = e.target.value;
    } else if (props.no === "2") {
      QuesObject[props.id - 1].option_2 = e.target.value;
    } else if (props.no === "3") {
      QuesObject[props.id - 1].option_3 = e.target.value;
    } else if (props.no === "4") {
      QuesObject[props.id - 1].option_4 = e.target.value;
    }
  };

  //const [correctAns, setCorrectAns] = useState("");

  var correctAns = "1";

  const handleCorrectAns = (e) => {
    //setCorrectAns( e.target.value);
    //console.log(e.target.value + " " + props.id + " " + temp);
    // console.log(correctAns);
    //console.log(`radio_${props.id}`)/
    correctAns = e.target.value;
    // console.log(correctAns);
    console.log("sf");
    console.log(QuesObject);
    localStorage.setItem("makeQuestions", QuesObject);
    var alpha = `option_${correctAns}`;
    // console.log(alpha)

    if (correctAns === "1") {
      QuesObject[props.id - 1].correctAns = alpha;
      QuesObject[props.id - 1].incorrectAnswers = [];
      QuesObject[props.id - 1].correctAnswer =
        QuesObject[props.id - 1].option_1;
      QuesObject[props.id - 1].incorrectAnswers.push(
        QuesObject[props.id - 1].option_2
      );
      QuesObject[props.id - 1].incorrectAnswers.push(
        QuesObject[props.id - 1].option_3
      );
      QuesObject[props.id - 1].incorrectAnswers.push(
        QuesObject[props.id - 1].option_4
      );
    } else if (correctAns === "2") {
      QuesObject[props.id - 1].correctAns = alpha;
      QuesObject[props.id - 1].correctAnswer =
        QuesObject[props.id - 1].option_2;
      QuesObject[props.id - 1].incorrectAnswers = [];
      QuesObject[props.id - 1].incorrectAnswers.push(
        QuesObject[props.id - 1].option_1
      );
      QuesObject[props.id - 1].incorrectAnswers.push(
        QuesObject[props.id - 1].option_3
      );
      QuesObject[props.id - 1].incorrectAnswers.push(
        QuesObject[props.id - 1].option_4
      );
    } else if (correctAns === "3") {
      QuesObject[props.id - 1].correctAns = alpha;
      QuesObject[props.id - 1].incorrectAnswers = [];
      QuesObject[props.id - 1].correctAnswer =
        QuesObject[props.id - 1].option_3;
      QuesObject[props.id - 1].incorrectAnswers.push(
        QuesObject[props.id - 1].option_2
      );
      QuesObject[props.id - 1].incorrectAnswers.push(
        QuesObject[props.id - 1].option_1
      );
      QuesObject[props.id - 1].incorrectAnswers.push(
        QuesObject[props.id - 1].option_4
      );
    } else if (correctAns === "4") {
      QuesObject[props.id - 1].correctAns = alpha;
      QuesObject[props.id - 1].incorrectAnswers = [];
      QuesObject[props.id - 1].correctAnswer =
        QuesObject[props.id - 1].option_4;
      QuesObject[props.id - 1].incorrectAnswers.push(
        QuesObject[props.id - 1].option_2
      );
      QuesObject[props.id - 1].incorrectAnswers.push(
        QuesObject[props.id - 1].option_3
      );
      QuesObject[props.id - 1].incorrectAnswers.push(
        QuesObject[props.id - 1].option_1
      );
    }
  };

  return (
    <>
      <input
        type="radio"
        name={`radio_${props.id}`}
        value={`${props.no}`}
        onChange={handleCorrectAns}
      />
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <Stack direction="row">
          <TextField
            onChange={handleChange}
            id="filled-basic"
            label={label_}
            variant="filled"
          />
        </Stack>
      </Box>
    </>
  );
}

function AddOption(optionNumber) {}

function Options(props) {
  return (
    <div id="ContOfRadioForAddQuiz">
      <Stack direction="row" spacing={2}>
        <AddTextBox no="1" id={props.id} />
        <AddTextBox no="2" id={props.id} />
      </Stack>
      <Stack direction="row" spacing={2}>
        <AddTextBox no="3" id={props.id} />
        <AddTextBox no="4" id={props.id} />
      </Stack>
    </div>
  );
}

function CompleteQuestion(props) {
  return (
    <div id="CompleteQuestionForAddQuiz">
      <AddQuestion id={props.id} />
      <Options id={props.id} />
    </div>
  );
}

export function AddQuiz() {
  let navigate = useNavigate();
  let room = localStorage.getItem("quiz_title");
  function Make() {
    axios
      .post("/custom", {
        room: room,
      })
      .then((response) => {
        console.log("the request is sent !!");
      })
      .catch((error) => {
        console.log(error);
      });
    alert(`share the code ${room} with your friends and enjoy the quiz !!`);
    localStorage.setItem("custom", true);
    navigate("/join");
  }
  var Questions = [];
  var num = parseInt(localStorage.getItem("num_of_ques"));
  for (let i = 0; i < num; i++) {
    Questions.push(
      <div id="CompleteQuestionWithQuestionNumberForAddQuiz">
        <h3>Question {i + 1}</h3>
        <CompleteQuestion id={i + 1} />
      </div>
    );

    QuesObject.push({
      question: "",
      option_1: "",
      option_2: "",
      option_3: "",
      option_4: "",
      correctAns: "",
      correctAnswer: "",
      incorrectAnswers: [],
    });
  }

  return (
    <div id="MainContForAddQuiz">
      <h1 id="ADDHeadingForAddQuiz">Add Questions</h1>
      <div id="ContForQuesForAddQuiz">{Questions}</div>
      <Button onClick={Make} variant="contained" id="CreateForAddQuiz">
        Create the Quiz
      </Button>
    </div>
  );
}
