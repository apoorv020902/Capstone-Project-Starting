import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";
const PORT = process.env.PORT || 5002

//connection and listeners
connectToDatabase()
    .then (() => {
        app.listen(PORT, ()=> console.log("Server Open and connected to the Database"));
    })
    .catch((err)=> console.log(err));