import { useEffect, useState } from "react";
import axios from "axios";
import "./leaderboard.css";

export function Leaderboard() {
  let [score, setscore] = useState([]);
  let room = localStorage.getItem("room");
  axios
    .post("/result", {
      room: room,
    })
    .then((response) => {
      setscore(response.data);
    })
    .catch((error) => {
      console.log(error);
    });

  return (
    <div id="LeaderBoardAllContentsDiv">
      <h1 id="LeaderboardHeading">Quiz Leaderboard</h1>
      <table id="LeaderboardTable">

        <thead>
          <tr id="tableHeadingForLeaderboard">
            <th>NAME</th>
            <th>SCORE</th>
          </tr>
        </thead>

        <tbody>

          {score.map((user) => (
            <tr>
              <td>{user.username}</td>
              <td>{user.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
