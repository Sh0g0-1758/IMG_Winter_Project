const mongoose = require("mongoose");
const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const cors = require('cors');

const app = express();
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
    )
    
    app.use(express.json());
    app.use(express.urlencoded({ extended: false}));
    const server = http.createServer(app);


    
    const userSchema = new mongoose.Schema({
        name: String,
        email: String,
        password: String
    })
    const User = mongoose.model("User", userSchema);
    mongoose.connect("mongodb+srv://shourya:test123@cluster0.ye8kv5k.mongodb.net/Quizes?retryWrites=true&w=majority")
    .then(() => {
        console.log("connected !!!");
    })

    const {
        userJoin,
        getCurrentUser,
        userLeave,
        getRoomUsers,
    } = require("./users");

// let score = [];
let user_data = [];
// let scoredata;
let rooms = [];

const io = socketio(server, {
    transports: ["websocket", "polling"],
    cors : {
        origin: "http://localhost:3000",
        credentials: true,
        methods: ["GET","POST"],
    }
});

// io.on("connection", client => {
//     // let user_name = user_data[user_data.length - 1].name;
//     const user = {
//         id: client.id,
//         name: "QuizMaster"
//     }

//     let sendMe = true;
//     users.forEach((e) => {
//         if(e.id === user.id) {
//             sendMe = false;
//         }
//     })

//     if (sendMe) {
//         users.push(user);
//     }

//     io.emit("enter", users);

//     client.on("disconnect", () => {
//         let deleteme = [];
//         users.forEach((e) => {
//             if(client.id !== e.id) {
//                 deleteme.push(e);
//             }
//         })
//         users = deleteme;
//         console.log(users.length);
//         io.emit("enter", users);
//     })

// })

// function leaderboard () {
//     io.on("connection", (client) => {
//         let room = scoredata.room;
//         client.join(room);
//         let allUsers = getRoomUsers(room);
//         allUsers.forEach((e) => {
//             if(e.username === scoredata.name) {
//                 e.score = scoredata.message;
//             }
//         })
//         console.log(allUsers);
//         console.log("hey there my main man !!");
//         io.to(room).emit("result",allUsers);
//     })
// }

function socketConnect () {
    io.on("connection", (client) => {
        client.on("joinRoom", ({username,room}) => {
            console.log("hey buddy !!");
            let allUsers = getRoomUsers(room);
            let flag = true;
            allUsers.forEach((e) => {
                if(e.username == username) {
                    flag = false;
                }
            })
            if(flag) {
                let user = userJoin(client.id, username, room);
            }
            client.join(room);
            io
            .to(room)
            .emit(
            "enter",getRoomUsers(room)
            );
        })

        client.on("score", (data) => {
            let allUsers = getRoomUsers(data.room);
            allUsers.forEach((e) => {
                if(e.username === data.name) {
                    e.score = data.message;
                }
            })
            console.log(allUsers);
            console.log("hey there my main man !!");
            // io.to(room).emit("result",allUsers);
            const user = userLeave(client.id);
            if (user) {
              io.to(user.room).emit("enter", getRoomUsers(user.room));
            }
        });
        

        client.on("disconnect", () => {
            const user = userLeave(client.id);
            if (user) {
              io.to(user.room).emit("enter", getRoomUsers(user.room));
            }
        });
        // console.log("bruvobroeibgieptbiot");
        // // let user_name = user_data[user_data.length - 1].name;
        // let user_name = user_data[user_data.length - 1].name;
    
        // const user = {
        //     id: client.id,
        //     name: user_name
        // }
    
        // let sendMe = true;
        // users.forEach((e) => {
        //     if(e.id === user.id) {
        //         sendMe = false;
        //     }
        // })
    
        // if (sendMe) {
        //     users.push(user);
        // }
    
        // io.emit("enter", users);
    
        // client.on("hola", message => {
        //     console.log("hola");
        //     if(message === "sendScore") {
        //         io.emit("final",score);
        //     }
        // })
    
        // client.on("disconnect", () => {
        //     let deleteme = [];
        //     users.forEach((e) => {
        //         if(client.id !== e.id) {
        //             deleteme.push(e);
        //         }
        //     })
        //     users = deleteme;
        //     console.log(users.length);
        //     io.emit("enter", users);
        // })
    
    })
}
// check this one as to how this one is going. 
// app.post("/data", async (req,res) => {
//     const data = req.body;
//     score.push(data);
//     console.log(score[0].name);
//     console.log(score[0].message);
// })

// and this one also check this one also. 

app.post("/user_data", async (req,res) => {
    const data = req.body;
    console.log(data);
    user_data.push(data);
    console.log("hey hevnr");
    socketConnect();
})

app.post("/signUp", async(req,res) => {
    const data = req.body;
    user_data.push(data);
    let new_user = new User({
        name: data.name,
        email: data.email,
        password:data.password
    })  
    await new_user.save()
    .then(() => {
        console.log("done my child !!")
    })
    socketConnect();
})

app.post("/login", async (req,res) => {
    const data = req.body;
    let info = await User.findOne({email:data.email}).lean();
    console.log("hey there");
    if(info != null) {
        user_data.push(info);
        socketConnect();
    }
    res.set('Content-Type', 'application/JSON');
    return res.send(JSON.stringify(info));
    // console.log(info.email);
})

app.post("/result", async(req,res) => {
    let data = req.body;
    let users = getRoomUsers(data.room);
    res.send(users);
})

app.post("/custom", async(req,res) => {
    let data = req.body;
    let new_room = data.room;
    rooms.push(new_room);
})

app.get("/customroom", async(req,res) => {
    res.send({data: rooms});
})

const PORT = 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));