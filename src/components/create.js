import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./create.css";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {useNavigate} from 'react-router-dom';


function QuizTitle() {
  const [quizTitle, setQuizTitle] = useState("");

  const handleChange = (e) => {
    //console.log(quizTitle);
    setQuizTitle((quizTitle) => "" + e.target.value);
    console.log(e.target.value);
    localStorage.setItem("quiz_title",e.target.value);
  };

  return (
    <div className="form-floating mb-3 DIVformCreate">
      <input
        type="text"
        className="form-control ForCreate"
        id="floatingInput"
        placeholder="abcd"
        onChange={handleChange}
      />
      <label htmlFor="floatingInput">Quiz Title</label>
    </div>
  );
}

function QuizDescription() {
  const [quizDescription, setQuizDescription] = useState("");

  const handleChange = (e) => {
    //console.log(quizDescription);
    setQuizDescription((quizTitle) => "" + e.target.value);
    console.log(e.target.value);
    localStorage.setItem("quiz_description",e.target.value);
  };

  return (
    <div className="form-floating DIVformCreate">
      <textarea
        className="form-control ForCreate"
        id="floatingTextarea"
        onChange={handleChange}
        placeholder="abcd"
      ></textarea>

      <label htmlFor="floatingTextarea">Quiz Description</label>
    </div>
  );
}

function DiscreteSlider() {
  const getValue = (e, val) => {
    //console.warn(val);
    localStorage.setItem("num_of_ques",val);
    console.log(val);
  };

  const mark = [
    {
      value: 1,
      label: "Min",
    },
    {
      value: 10,
      label: "Max",
    },
  ];

  return (
    <div id="ContainerForSlider" className="ForCreate">
      <div id="divFSlider">
        <Slider
          aria-label="Temperature"
          defaultValue={5}
          //getAriaValueText={valuetext}
          valueLabelDisplay="auto"
          step={1}
          marks={mark}
          min={1}
          max={10}
          id="sliderDJ"
          onChange={getValue}
        />
      </div>
      <label id="LabelForSlider">Choose number of questions :</label>
    </div>
  );
}

export function Create() {
  let navigate = useNavigate();
  function takeme () {
    navigate("/addquiz");
  }
  return (
    <>
      <div id="ContForCreate">
        <h2>Customize Quiz</h2>
        <QuizTitle />
        <QuizDescription />
        <DiscreteSlider />
        <Button onClick={takeme} variant="contained" id="AddBTNForCreate" >Add questions</Button>
      </div>
    </>
  );
}
