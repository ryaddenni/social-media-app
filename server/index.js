import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import http from 'http';
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { register } from "./controllers/auth.controller.js";
import { createPost } from "./controllers/post.controller.js";
import { verifyToken } from "./middleware/auth.js";
import User from "./models/user.model.js";
import Post from "./models/post.model.js";
import { Server } from 'socket.io';
//import { users, posts } from "./data/index.js";


dotenv.config();

const app = express()

const httpServer = http.createServer(app);
const io = new Server(httpServer);
app.use( express.json() )
app.use(cors())


app.get( '/' , ( req ,res ) => {
  res.send( 'hello ')
})

/* ROUTES WITH FILES */
app.post("/auth/register", register);




/* ROUTES */

import userRoutes from "./routes/user.router.js"
import authRoutes from "./routes/auth.router.js"
import postRoutes from "./routes/post.router.js";
import createRouter from "./routes/conversation.router.js";
import createGroupRouter from "./routes/group.router.js";
app.use("/posts", postRoutes);
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
const conversationRoutes = createRouter(io);
app.use("/conversations", conversationRoutes);
const groupRoutes = createGroupRouter(io);
app.use("/groups",groupRoutes);



mongoose.connect(process.env.CONNECTION_STRING ,
{
  useNewUrlParser : true,
  useUnifiedTopology : true

}
)

const db = mongoose.connection;

db.on("error" , console.error.bind(console , "connection error 123 : "));
db.once("open" , function(){
  
  console.log("database connected successfully ..");
}  )

app.listen(process.env.PORT ,  ()=> {
  console.log (` app listening on port ${process.env.PORT}`);


})

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('newMessage', (message) => {
        console.log('Received new message:', message);

        
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

