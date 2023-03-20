import { useEffect, useState, useLocalStorage } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";
import "./QuizSolo.css";
import Button from "@mui/material/Button";

export function QuizSolo() {
  let [ques, setques] = useState([]);
  let [me, setme] = useState(false);
  let [next, setnext] = useState(0);
  let [score, setscore] = useState(0);
  let [disable, setdisable] = useState(false);
  let [questions, setquestions] = useState([]);
  let [time_left_per_question, settime_left_per_question] = useState(10);
  let [users, setusers] = useState([]);
  let [time_interval, settime_interval] = useState(0);
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    const data = window.localStorage.getItem("MY_APP_STATE");
    if (data !== null) setShowBanner(JSON.parse(data));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("MY_APP_STATE", JSON.stringify(showBanner));
  }, [showBanner]);

  useEffect(() => {
    const socket = io("http://localhost:5000", {
      cors: {
        origin: "http://localhost:5000",
        credentials: true,
      },
      transports: ["websocket"],
    });
    socket.connect();
    console.log("hey there man");
    let username = localStorage.getItem("user");
    let room = localStorage.getItem("room");
    socket.emit("joinRoom", { username, room });
    socket.on("enter", (message) => {
      console.log("someone of a no-one !!");
      setusers(message);
    });
    let custom = localStorage.getItem("custom");
    if(custom) {
      let user_defined_questions = localStorage.getItem("makeQuestions");
      setques(user_defined_questions);
    } else {
    let url = localStorage.getItem("url");
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setques(data);
      });
    }
  }, []);

  var myques = [];

  function updateme() {
    ques[next].incorrectAnswers.forEach((e) => {
      myques.push(e);
    });
    myques.push(ques[next].correctAnswer);
    setquestions(myques);
    console.log(myques);
    const all_mcq = myques.map((val, index) => (
      <Button variant="outlined" va>
        {val}
      </Button>
    ));

    return <>{all_mcq}</>;
  }

  function Options() {
    const all_mcq = myques.map((val, index) => (
      <Button variant="outlined" va>
        {val}
      </Button>
    ));

    return <>{all_mcq}</>;
  }

  function clickme() {
    setme(true);
    setdisable(true);
    updateme();
    settime_interval(
      setInterval(() => {
        settime_left_per_question(time_left_per_question--);
      }, 1000)
    );
    
    btnHide();
  }

  function nextques() {
    if (next === 4) {
      render_me();
    } else {
      setnext(++next);
    }
    clearInterval(time_interval);
    settime_left_per_question(10);
    let time = 10;
    settime_interval(
      setInterval(() => {
        settime_left_per_question(time--);
      }, 1000)
    );
    updateme();
  }

  function handlechange(e) {
    if (e.target.value === ques[next].correctAnswer) {
      setscore(++score);
    }
    nextques();
  }
  
  function btnHide(){
    let btnStart = document.getElementById("StartBtnForQuizSolo");
    btnStart.style.display = "none";
  }

  const navigate = useNavigate();

  let render_me = async () => {
    const socket = io("http://localhost:5000", {
      cors: {
        origin: "http://localhost:5000",
        credentials: true,
      },
      transports: ["websocket"],
    });
    socket.connect();
    let user_name = localStorage.getItem("user");
    let room = localStorage.getItem("room");
    let data = {
      name: user_name,
      message: score,
      room: room,
    };
    socket.emit("score", data);
    navigate(`/Leaderboard/${room}`);
  };

  if (time_left_per_question <= 0) {
    nextques();
  }

  return (
    <>
      <table id="QuizSoloTable">
        <tr id="tableHeadingForQuizSolo">
          <th>Active users in the quiz</th>
        </tr>

        {users.map((user) => (
          <tr>
            <td>{user.username}</td>
          </tr>
        ))}
      </table>

      <div id="QuizSoloCont">
        <div id="ContForScoreAndTimeForQuizSolo">
          {me && (
            <div id="TimerHeadingContForQuizSolo">
              Amount of time left : {time_left_per_question}
            </div>
          )}
          {me && <div id="ScoreContForQuizSolo">Score : {score}</div>}
        </div>
        {me && (
          <p id="pOfQuestionForQuizSolo">Question : {ques[next].question}</p>
        )}
        {me && (
          <div id="QuestionContForQuizSolo">
            {questions.map((options) => (
              <button
                onClick={handlechange}
                value={options}
                className="OptionBtnForQuizSolo"
              >
                {options}
              </button>
            ))}
          </div>
        )}
        <Button
          variant="contained"
          id="StartBtnForQuizSolo"
          disabled={disable}
          onClick={clickme}
        >
          start the quiz
        </Button>
      </div>
    </>
  );
}
