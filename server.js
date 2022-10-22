//Import required modules
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require('body-parser');
const userRoutes = require("./routes/userRoute")
const empRoutes = require("./routes/empRoutes")

//Connect to MongoDB
const database_url = "mongodb+srv://101277841_Renzzi:qw12345@cluster0.prgemqj.mongodb.net/comp3123_assigment1?retryWrites=true&w=majority"
mongoose.connect(database_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//Defining server port that will be used to run the program
const SERVER_PORT = 3001

const app = express();
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

//Uses specific files for various endpoints
app.use("/api/user", userRoutes)
app.use("/api/emp/", empRoutes)

app.route("/")
    .get((req, res) => {
        res.send("Assignment 1 in Fullstack Dev")
    })

app.listen(SERVER_PORT, () =>{
    console.log(`Server running at http://localhost:${SERVER_PORT}/`)
})

