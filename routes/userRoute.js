//Imports express and model js file
const express = require("express")
const userModel = require("../models/userModel")
const routes = express.Router()

//Create a new account
routes.post("/signup", async(req,res) =>{
    try {
        const newUser = new userModel(req.body)
        const user = await newUser.save()
        const createResponse = {
            "message": `User '${req.body.username}' succesfully created. Here's more information:`,
            "user": user
        }
        res.status(201).send(createResponse)
    } catch (error) {
        res.status(400).send(error)
    }
})

//Allow user to access the system
routes.post("/login", async(req,res) =>{
    const userInput = req.body.username
    const passInput = req.body.password
    
    //Responses
    const noUser = {
        "status": false,
        "message": "No user with the username found in the database."
    }
    
    const wrongPass = {
        "status": false,
        "message": "Invalid password. Check and try again."
    }

    const validLogin = {
        "status": true,
        "username": userInput,
        "message": `Welcome back, ${userInput}. Let's work hard today.`
    }


    try {
        var validUser = await userModel.findOne({ username: userInput }).exec()
        if(!validUser) {
            return res.status(400).send(noUser)
        }
        validUser.comparePassword(passInput, (error, match) => {
            if(!match) {
                return res.status(400).send(wrongPass)
            }
        });
        res.status(200).send(validLogin)
    } catch (error) {
        res.status(400).send(error);
    }
})

module.exports = routes