const express = require("express");
const router = express.Router();
const MenuItem = require(`../models/MenuItem`);

// Create the MenuItem router to post the menu
router.post("/", async (req, res) => {
  try {
    const data = req.body;

    // Create a new MenuItem document using the Mongoose model
    const newMenu = new MenuItem(data);

    // Save the menu item to the database
    const response = await newMenu.save();

    console.log(`Menu saved successfully`);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `Internal server error` });
  }
});

// Crate the Get server to get the data

router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("Data fetch successfully");
    res.status(201).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Internal server error" });
  }
});

// to get the MenuItem taste
router.get("/:taste", async (req, res) => {
  try {
    const taste = req.params.taste; // Extract the taste parameter from the URL

    // Check if the taste is valid
    if (taste === "spicy" || taste === "sour" || taste === "sweet") {
      // Query the MenuItem collection with the taste parameter
      const data = await MenuItem.find({ taste: taste });
      console.log("Data fetched successfully");
      res.status(200).json(data);
    } else {
      res.status(400).json({ error: "Invalid taste type" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});
// Create a route to Update the menu data

router.put(`/:id`, async (req, res) => {
  try {
    const menuId = req.params.id; // Extract the id form the URL paramaete
    const updatedMenuData = req.body; // Extract the updated data

    const updatedMenu = await MenuItem.findByIdAndUpdate(
      menuId,
      updatedMenuData,
      {
        new: true, // Return the updated documents
        runValidators: true, // Run  Mongoose validation
      }
    );
    if (!updatedMenu) {
      return res.status(404).json({ error: `Person not found` });
    }

    console.log(`Data updated`);
    res.status(200).json(updatedMenu);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create a router to delete the Menu data

router.delete(`/:id`,async(req,res)=>{
  try {
    const menuId = req.params.id; // Extract the id form the URL paramaete
    const response = await MenuItem.findByIdAndDelete(menuId);

    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }

    console.log("Data Deleted");
    res.status(200).json({ message: "Person deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
})
module.exports = router;
