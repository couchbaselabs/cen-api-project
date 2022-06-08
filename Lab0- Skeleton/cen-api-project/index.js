import express from "express";
import bodyParser from "body-parser";

import hotels from "./routes/hotels.js";

const app = express();
const port = 5400; // TODO : move it to env/config file

app.use(bodyParser.json());

app.use("/", hotels);

app.listen(port, ()=> {
    console.log(`Server running on Port ${port} ...`);
});