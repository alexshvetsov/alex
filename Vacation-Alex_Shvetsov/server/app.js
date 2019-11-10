const express = require("express");
const cors = require("cors");
const vacationsController = require("./controllers/vacations-controller");
const usersController = require("./controllers/users-controller");
const vacationsFollowedController = require("./controllers/vacationsFollowed-controller");
const reportController = require("./controllers/report-controller");
const http = require("http");
const socketIO = require("socket.io");
const usersLogic = require("./bll/users-logic");
const vacationsLogic = require("./bll/vacations-logic");


const server = express();
server.use(cors())
server.use(express.json());

server.use("/api/vacations", vacationsController);
server.use("/api/users", usersController);
server.use("/api/vacationsFollowed", vacationsFollowedController);
server.use("/api/report", reportController);
server.use(express.static(__dirname));


const httpServer = http.createServer(server).listen(3002, () => console.log("Socketing...")); // Need express
const socketServer = socketIO.listen(httpServer); // Need the http
const allSockets = [];

socketServer.sockets.on("connection", async socket => {
    allSockets.push(socket);
    console.log("One client has been connected... Total clients:" + allSockets.length);

    socket.on("user-availability-check", async user => {
        // const isAvailable = await usersLogic.userAvailabilityCheck(user);
        let isAvailable = "";
        isAvailable = await usersLogic.getOneUser(user)
        socketServer.sockets.emit("user-availability-check", isAvailable<1 ? false : true);
    });

    socket.on("admin-made-changes", async ()=> {
        socketServer.sockets.emit("admin-made-changes", await vacationsLogic.getAllVacations());
    });

    socket.on("disconnect", () => {
        allSockets.splice(allSockets.indexOf(socket), 1);
        console.log("One Client has been disconnected. Total clients: " + allSockets.length);
    });
});

server.listen(3001, () => console.log("Listening..."));   




