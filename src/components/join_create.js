import { Link } from "react-router-dom";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./join_create.css";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

function BasicButtons() {
  return (
    <Stack spacing={2} direction="row">
      <Button variant="outlined" id="btn1">
        JOIN
      </Button>
    </Stack>
  );
}

export function JoinCreate() {
  // localStorage.setItem("reload",false);
  return (
    <>
      <div id="OuterContForJC">
        <Link to={"http://localhost:3000/join"} className="DivBtn">
          <div className="card" id="JoinQ">
            <div className="card-body">
              <h5 className="card-title">JOIN QUIZ</h5>
              
              <p className="card-text">
                Join quizzes with a quiz code
              </p>
            </div>
          </div>
        </Link>

        <Link to={"http://localhost:3000/create"} className="DivBtn">
          <div className="card" id="CreateQ">
            <div className="card-body">
              <h5 className="card-title">CREATE QUIZ</h5>
              <p className="card-text">
                Create exciting and fun quizzes to make learning fun
              </p>
              
            </div>
          </div>
        </Link>

        <Link to={"http://localhost:3000/host"} className="DivBtn">
          <div className="card" id="HostQ">
            <div className="card-body">
              <h5 className="card-title">HOST QUIZ</h5>
              <p className="card-text">
                Use our pre made quizzes and host them
              </p>
              
            </div>
          </div>
        </Link>
      </div>

      {/* <h1>
        <Link to={"http://localhost:3000/join"}>join a quiz !!</Link>
      </h1>
      <hr></hr>
      <h1>
        <Link to={"http://localhost:3000/create"}>create a quiz !!</Link>
      </h1>
      <hr></hr>
      <h1>
        <Link to={"http://localhost:3000/host"}>host a quiz !!</Link>
      </h1>
      <hr></hr> */}
    </>
  );
}
