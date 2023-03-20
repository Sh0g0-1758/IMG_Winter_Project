import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ReactDOM from "react-dom";
import Typography from "@mui/material/Typography";

import "./host.css";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};



const categories = [
  "arts_and_literature",
  "geography",
  "history",
  "music",
  "science",
  "general_knowledge",
];

var selectedCategories = [];

function getCategoryStyles(categories, categoryName, theme) {
  return {
    fontWeight:
      categoryName.indexOf(categories) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function CategorySelect() {
  const [categoryName, setCategoryName] = React.useState([]);
  const theme = useTheme();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCategoryName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );

    selectedCategories = event.target.value;
    localStorage.setItem("selectedCategories",selectedCategories);
    console.log(selectedCategories);
  };

  return (
    <div>
      <FormControl sx={{ m: 0, width: 400 }}>
        <InputLabel id="demo-multiple-chip-label" sx={{ color: "black" }}>
          Category
        </InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={categoryName}
          onChange={handleChange}
          input={
            <OutlinedInput
              sx={{ color: "black" }}
              id="select-multiple-chip"
              label="Category"
            />
          }
          renderValue={(selected) => (
            <Box
              sx={{ display: "flex", flexWrap: "wrap", gap: 1, color: "black" }}
            >
              {selected.map((value) => (
                <Chip sx={{ color: "black" }} key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {categories.map((category) => (
            <MenuItem
              key={category}
              value={category}
              style={getCategoryStyles(category, categoryName, theme)}
            >
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

var selectedDifficulty = "medium";

function DifficultySelect() {
  const [difficulty, setDifficulty] = React.useState("");

  const handleChange = (event) => {
    setDifficulty(event.target.value);
    selectedDifficulty = event.target.value;
    localStorage.setItem("selectedDifficulty", "medium");
    localStorage.setItem("selectedDifficulty",selectedDifficulty);
    console.log(selectedDifficulty);
  };

  return (
    // <Box sx={{ minWidth: 120 }}>
    //   <FormControl sx={{ m: 1, width: 300 }}>
    //     <InputLabel id="demo-simple-select-label">Difficulty</InputLabel>
    //     <Select
    //       labelId="demo-simple-select-label"
    //       id="demo-simple-select"
    //       value={difficulty}
    //       label="Difficulty"
    //       onChange={handleChange}
    //     >
    //       <MenuItem value={'easy'}>easy</MenuItem>
    //       <MenuItem value={'medium'}>medium</MenuItem>
    //       <MenuItem value={'hard'}>hard</MenuItem>
    //     </Select>
    //   </FormControl>
    // </Box>

    <div className="form-floating mb-3 DIVformCreate">
      <select
        class="form-select"
        id="floatingInput"
        aria-label="Default select example"
        placeholder="abcd"
        onChange={handleChange}
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <label htmlFor="floatingInput">Difficulty</label>
    </div>
  );
}

var numberOfQuestions;

function DiscreteSlider() {
  const getValue = (e, val) => {
    //console.warn(val);
    // console.log(val);
    numberOfQuestions = val;
    localStorage.setItem("numberOfQuestions",numberOfQuestions);
    console.log(numberOfQuestions);
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
    <div id="ContainerForSliderForHost" className="ForHost">
      <div id="divFSliderForHost">
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
      <label id="LabelForSliderForHost">Choose number of questions :</label>
    </div>
  );
}

function renderPreBuildQuiz() {
  return (
    <>
      <h2>Rendered Questions</h2>
    </>
  );
}
// https://the-trivia-api.com/api/questions?categories=geography,food_and_drink,music&limit=13&difficulty=medium
export function Host() {
  // let numberOfQuestions = localStorage.getItem("numberOfQuestions");
  // let category = localStorage.getItem("category");
  // let selectedCategories = localStorage.getItem("selectedCategories");
  // selectedCategories.forEach((e) => {
  //   category = category + e + ",";
  // })
  // category = category - ",";
  // let [url, seturl] = useState(
  //   `https://the-trivia-api.com/api/questions?categories=${category}&limit=${numberOfQuestions}&difficulty=${selectedDifficulty}`
  // );

  let quizCodes = ["SZHJt", "HQfoU", "nYMxz", "TIerg"];

  // fetch("https://the-trivia-api.com/api/questions?limit=5")
  // .then((response) => response.json())
  // .then((user) => {
  //     console.log(user)
  // })
  const navigate = useNavigate();

  function getRandom() {
    let index = Math.floor(Math.random() * 4);
    alert(
      `your quiz code is "${quizCodes[index]}". Share this code with your friends and quiz on !!`
    );
    localStorage.setItem(
      "url",
      "https://the-trivia-api.com/api/questions?limit=5"
    );
    navigate("/join");
  }

  function getSpecific() {
    let numberOfQuestions = localStorage.getItem("numberOfQuestions");
    let selectedDifficulty = localStorage.getItem("selectedDifficulty");
    let selectedCategories = localStorage.getItem("selectedCategories");
    console.log(selectedCategories);
    let url = `https://the-trivia-api.com/api/questions?categories=${selectedCategories}&limit=${numberOfQuestions}&difficulty=${selectedDifficulty}`
    let index = Math.floor(Math.random() * 4);
    alert(
      `your quiz code is "${quizCodes[index]}". Share this code with your friends and quiz on !!`
    );
    console.log(url);
    localStorage.setItem("url", url);
    navigate("/join");
  }

  return (
    <>
      <div id="ContForHost">
        <CategorySelect />
        <DifficultySelect />
        <DiscreteSlider />
        <renderPreBuildQuiz />
        <Button onClick={getSpecific} variant="contained" id="AddBTNForHost">
          Generate the Quiz
        </Button>
        <h6 id="HRwithORForHost">
          <span id="HRwithORSpanForHost">OR</span>
        </h6>
        <Button onClick={getRandom} variant="contained" id="GenerateBTNForHost">
          Generate a Random Quiz
        </Button>
      </div>
    </>
  );
}
