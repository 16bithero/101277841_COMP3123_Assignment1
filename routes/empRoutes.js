//Imports express and model js file
const express = require("express")
const empModel = require("../models/empModel")
const routes = express.Router()

//Get all employees
routes.get("/employees", async(req,res) => {
    const emp = await empModel.find()
    const allEmp = {
        "message": `Employee List:`,
        "employees": emp
    }
    try {
        res.status(200).send(allEmp)
    } catch (error) {
        res.status(400).send(error)
    }
})

//Creates new employee
routes.post("/employees", async(req,res) => {
    try {
        const newEmp = new empModel(req.body)
        const emp = await newEmp.save()
        const createEmp = {
            "message": `Employee '${req.body.first_name}' succesfully created. Here's more information:`,
            "employee": emp
        }
        res.status(201).send(createEmp)
    } catch (error) {
        res.status(400).send(error)
    }
})

// Get employee details by ID
routes.get("/employees/:eid", async(req,res) => {
    const emp = await empModel.findById(req.params.eid)
    const response = {
        "message": `Employee Details:`,
        "details": emp
    }
    try {
        res.status(200).send(response)
    } catch (error) {
        res.status(400).send(error)
    }
})

// Update employee details by ID
routes.put("/employees/:eid", async(req, res) => {
    try {
        const updateEmp = await empModel.findByIdAndUpdate(req.params.eid, req.body)
        const updateResponse = {
            "message": `Employee Updated:`,
            "employee-record": updateEmp,
            "updated-record": req.body
        }
        res.status(200).send(updateResponse)
    } catch (error) {
        res.status(400).send(error)
    }

})

//Delete employee by ID
routes.delete("/employees", async(req, res) => {
    try {
        const empID = req.query.eid
        const deleteEmp = await empModel.findByIdAndDelete(empID)
        if(!deleteEmp){
            res.status(400).send({message: "Employee not found."})
        }
        res.status(204).send(deleteEmp)
    } catch (error) {
        res.status(400).send(error)
    }
})

//Allows export to be used in server.js file
module.exports = routes