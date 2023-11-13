import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import Router from './router/Router.js'

const app = express();
mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost:27017/restful_db");
const db=mongoose.connection;
db.on("error", (error)=>console.log(error))
db.once("open", ()=> console.log("Success connected..."))

app.use(cors())
app.use(express.json())
app.use(Router)

app.listen(8000,()=>console.log("Server running..."))