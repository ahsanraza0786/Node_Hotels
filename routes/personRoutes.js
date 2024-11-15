const express = require("express");
const router = express.Router();

const Person = require(`../models/Person`);

// GET method to get the person details
router.post("/", async (req, res) => {
  try {
    const data = req.body; // Assuming the request body contains the person data

    // Create a new Person document using the Mongoose model
    const newPerson = new Person(data);
    // Save the new person
    const response = await newPerson.save();
    console.log("Data saved successfully");
    res.status(201).json(response); // Send back the saved person data with status 201
  } catch (error) {
    console.error(error); // Detailed error logging
    res.status(500).json({ error: "Internal server error" }); // Send a generic error message to the client
  }
});

// GET method to get the person details
router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("Data fetch successfully");
    res.status(201).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Internal server error" });
  }
});

// Craete a server to get data as Worker
router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType; // Extract the workType from the URL parameter
    if (workType == `chef` || workType == `manager` || workType == `waiter`) {
      const data = await Person.find({ work: workType });
      console.log(`Data fetched successfully `);
      res.status(200).json(data);
    } else {
      res.status(400).json({ error: "Invalid work type" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Internal server error" });
  }
});

// create a router to update the person data
router.put(`/:id`, async (req, res) => {
  try {
    const personId = req.params.id; // Extract the id form the URL paramaete
    const updatedPersonData = req.body; // Extract the updated data
    const updatedPerson = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true, // Return the updated documents
        runValidators: true, // Run  Mongoose validation
      }
    );
    if (!updatedPerson) {
      return res.status(404).json({ error: `Person not found` });
    }

    console.log(`Data updated`);
    res.status(200).json(updatedPerson);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Internal server error" });
  }
});

// Create a router to delete a person by ID
router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id; // Extract the ID from the URL parameter
    const response = await Person.findByIdAndDelete(personId);

    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }

    console.log("Data Deleted");
    res.status(200).json({ message: "Person deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
