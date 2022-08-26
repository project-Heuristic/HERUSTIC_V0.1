import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoute.js"
import { createServer } from "http";
import { Server } from "socket.io";
const app = express();

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
		origin: "http://localhost:3000",
		methods: [ "GET", "POST" ]
	}
});
io.on("connection", (socket) => {
	socket.emit("me", socket.id)

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	})

	socket.on("callUser", (data) => {
		io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
	})

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	})
});

httpServer.listen(5000,() => console.log("server is running on port 5000"));




// server.listen(5000, () => console.log("server is running on port 5000"))


//////
// const i = require("socket.io")(server, {
// 	cors: {
// 		origin: "http://localhost:3000",
// 		methods: [ "GET", "POST" ]
// 	}
// })

// io.on("connection", (socket) => {
// 	socket.emit("me", socket.id)

// 	socket.on("disconnect", () => {
// 		socket.broadcast.emit("callEnded")
// 	})

// 	socket.on("callUser", (data) => {
// 		io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
// 	})

// 	socket.on("answerCall", (data) => {
// 		io.to(data.to).emit("callAccepted", data.signal)
// 	})
// })

//////

// app.use(bodyParser.json({ limit: "50mb", extended: true }));
// app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
// app.use(cors());
// app.use('/user',authRoutes);


// const CONNECTION_URL = "mongodb+srv://heuristic:heuristic7873@cluster0.6lxguae.mongodb.net/?retryWrites=true&w=majority";

// const PORT = process.env.PORT || 5000;
// mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() =>
//     app.listen(PORT,()=> console.log(`Server Running On Port${PORT}` ))
//   )
//   .catch((error) => console.log(error.message));

 