import React, { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";

function App() {
  const [foodName, setfoodName] = useState("");
  const [foodList, setfoodList] = useState([]);
  const [newFoodName, setnewFoodName] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/read").then((response) => {
      setfoodList(response.data);
    });
  }, []);

  const addToList = () => {
    axios
      .post("http://localhost:3001/insert", { foodName: foodName })
      .then(() => {
        window.location.reload(false);
      });
  };

  const updateFood = (id) => {
    axios
      .put("http://localhost:3001/update", {
        id: id,
        newFoodName: newFoodName,
      })
      .then(() => {
        window.location.reload(false);
      });
  };
  const deleteFood = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`, {}).then(() => {
      window.location.reload(false);
    });
  };

  return (
    <div className="App">
      <h1> Shopping grocery list</h1>
      <label>Food Name:</label>
      <input
        type="text"
        onChange={(event) => {
          setfoodName(event.target.value);
        }}
      />
      <button onClick={addToList}> Add to list</button>

      <h1>DATA</h1>

      {foodList.map((val, key) => {
        return (
          <div key={key}>
            <h1>{val.foodName} </h1>
            <input
              type="text"
              placeholder="New food Name..."
              onChange={(event) => {
                setnewFoodName(event.target.value);
              }}
            />
            <button onClick={() => updateFood(val._id)}>Update</button>
            <button onClick={() => deleteFood(val._id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
