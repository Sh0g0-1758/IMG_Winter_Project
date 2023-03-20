import "./App.css";
// import { Choice,Better,sendApi } from "./components/preference.js";
import {Signup} from "./components/signup.js";
import {Enter} from "./components/enter.js";
import {JoinCreate} from "./components/join_create.js";
import {Join} from "./components/join.js";
import {Create} from "./components/create.js";
import {QuizSolo} from "./components/QuizSolo.js";
import {Leaderboard} from "./components/leaderboard.js";
import React from 'react';
import {Host} from "./components/host.js"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {AddQuiz} from "./components/addQuiz.js";
import {Buffer} from "./components/ChanneliBuffer.js";

function App() {
  // sendApi();
  return (
    <Router>
        <Routes>
            <Route path="/" exact element={<Enter/>} />
            <Route path="/join_create" element ={<JoinCreate/>} />
            <Route path="/join" element = {<Join/>}/>
            <Route path="/create" element ={<Create/>}/>
            <Route path="/quizSolo/*" element ={<QuizSolo/>}/>
            <Route path="/leaderboard/*" element ={<Leaderboard/>}/>
            <Route path="/host" element ={<Host/>}/>
            <Route path="/signup" element ={<Signup/>}/>
            <Route path="/addquiz" element ={<AddQuiz/>}/>
            <Route path="/buffer" element ={<Buffer/>}/>
        </Routes>
      </Router>
    );
}

export default App;