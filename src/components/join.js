import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./join.css";
import axios from "axios";

import Button from "@mui/material/Button";

export function Join() {
  const navigate = useNavigate();
  let [data, setdata] = useState("");
  // let may = localStorage.getItem("reload");
  // if (may) {
  //   navigate(0);
  //   localStorage.setItem("reload",false);
  // }
  function getdata(val) {
    let temp = val.target.value;
    setdata(temp);
  }
  function handleClick() {
    let custom = localStorage.getItem("custom");
    axios.get("/customroom").then((Response) => {
      console.log(Response.data.data);
      let customroom = Response.data.data;
      let flag = false;
      customroom.forEach((e) => {
        if(data === e) {
          localStorage.setItem("room", data);
          navigate(`/quizSolo/${data}`);
          flag = true;
        }
      })
      if(!flag) {
        if (
          data === "SZHJt" ||
          data === "HQfoU" ||
          data === "nYMxz" ||
          data === "TIerg"
        ) {
          localStorage.setItem("room", data);
          navigate(`/quizSolo/${data}`);
        } else {
          alert("Please enter the correct quiz code !!!");
        }
      }
    });
  }
  return (
    <>
      <div id="ContForJoin">
        <h1>Enter the quiz code</h1>

        <div id="insideContJoin">
          <div className="form-floating mb-3 DIVformCreate">
            <input
              type="text"
              className="form-control ForCreate"
              id="floatingInput"
              placeholder="abcd"
              onChange={getdata}
            />
            <label htmlFor="floatingInput">Quiz Code</label>
          </div>

          <Button variant="contained" id="BTNForJoin" onClick={handleClick}>
            JOIN QUIZ
          </Button>
        </div>
      </div>
    </>
  );
}
