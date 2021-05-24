const express = require("express");
const cors = require("cors");
const app = express();
const FoodModel = require("./models/Food");

//Mongodb connection using mongoose module
const connectDB = require("./config/db");
connectDB();

app.use(express.json());
app.use(cors());

//Reading data from frontend
app.post("/insert", async (req, res) => {
  const foodName = req.body.foodName;
  const food = new FoodModel({ foodName: foodName });

  try {
    await food.save();
    res.send("inserted data");
  } catch (err) {
    console.log(err);
  }
});

//Reading from Database
app.get("/read", async (req, res) => {
  FoodModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

//Updating from Database
app.put("/update", async (req, res) => {
  const newFoodName = req.body.newFoodName;

  const id = req.body.id;

  try {
    await FoodModel.findById(id, (err, updatedFood) => {
      updatedFood.foodName = newFoodName;
      updatedFood.save();
      res.send("update");
    });
  } catch (err) {
    console.log(err);
  }
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await FoodModel.findByIdAndRemove(id).exec();
  res.send("deleted");
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
