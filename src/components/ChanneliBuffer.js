import { useEffect, useState, useLocalStorage } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";
import React from "react";
import ReactDOM from "react-dom";
import ReactLoading from "react-loading";

var client_id_channeli = "U6k2VPhgc4MPkA4CYzqx1WQ4bifXCZ3zn9Czxtmh";
var client_secret_channeli =
  "nxnnVFQs3MwC7d9feNN1DcZTn5uHKj3T3lMXOw8ViaPQCDAOepCqYRqlB3n22zhJtd82t8Cr3bp9HTLkZKdLamuNiQq7yMQ8deyf1CrhazEgPJdTEXkDVwiLIB0CK3V9";

var a = window.location.search;

var authorization_code = a.split("&")[0].replace("?code=", "");
console.log(authorization_code);

var retrieve_token_url = "https://channeli.in/open_auth/token/";

var http = new XMLHttpRequest();

http.open("POST", retrieve_token_url);

var grant_type = "authorization_code";
var redirect_uri = "http://localhost:3000/join_create";

var data =
  "client_id=" +
  client_id_channeli +
  "&client_secret=" +
  client_secret_channeli +
  "&grant_type=" +
  grant_type +
  "&redirect_uri=" +
  redirect_uri +
  "&code=" +
  authorization_code;

http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

http.send(data);

var access_token = "";

http.onreadystatechange = () => {
  if (http.status === 200 && http.readyState === XMLHttpRequest.DONE) {
    // access_token= JSON.parse(http.responseText).access_token;
    // var button= document.createElement('button')
    // button.innerHTML= 'GRAB'
    // document.body.appendChild(button)
    console.log(http.responseText);
  }
};

// function get_user_data(){
//     var retrieve_data_url = 'https://channeli.in/open_auth/get_user_data/'
//     http.open('GET', retrieve_data_url)
//     var header= 'Bearer ' + access_token
//     http.setRequestHeader('Authorization', header)

//     http.send()

//     if(http.status === 200 && http.readyState===XMLHttpRequest.DONE)
//     {
//         console.log
//     }
// }

http.onreadystatechange = () => {
  if (http.status === 200 && http.readyState === XMLHttpRequest.DONE) {
    // access_token= JSON.parse(http.responseText).access_token;
    // var button= document.createElement('button')
    // button.innerHTML= 'GRAB'
    // document.body.appendChild(button)
    console.log(http.responseText);
  }
};

export function Buffer() {
  return (
    <>
      <ReactLoading type="spin" color="#0000FF" height={100} width={50} />
    </>
  );
}
