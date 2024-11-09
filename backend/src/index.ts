import express from "express";

const app = express();

//middleware
app.use(express.json());

//connection and listeners
app.listen(5002, ()=> console.log("Server Open"));