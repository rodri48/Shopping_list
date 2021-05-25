import Headerbounce from "./Headerbounce";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../src/App.css";
import Badge from "react-bootstrap/Badge";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";
import Button from "react-bootstrap/Button";
import "antd/dist/antd.css";
import { Switch } from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import Roll from "react-reveal/Roll";
import Wobble from "react-reveal/Wobble";

function Product() {
  const [foodName, setfoodName] = useState("");
  const [foodList, setfoodList] = useState([]);
  const [newFoodName, setnewFoodName] = useState("");
  const [visible, setvisible] = useState(false);

  useEffect(() => {
    axios
      .get("https://shopping-grocery-list.herokuapp.com/read")
      .then((response) => {
        setfoodList(response.data);
      });
  }, []);

  const addToList = () => {
    axios
      .post("https://shopping-grocery-list.herokuapp.com/insert", {
        foodName: foodName,
      })
      .then(() => {
        window.location.reload(false);
      });
  };

  const updateFood = (id) => {
    axios
      .put("https://shopping-grocery-list.herokuapp.com/update", {
        id: id,
        newFoodName: newFoodName,
      })
      .then(() => {
        window.location.reload(false);
      });
  };

  /* hide editing */
  const editingHandler = () => {
    setvisible((visible) => !visible);
  };

  const deleteFood = (id) => {
    axios
      .delete(`https://shopping-grocery-list.herokuapp.com/delete/${id}`, {})
      .then(() => {
        window.location.reload(false);
      });
  };
  return (
    <div>
      <div className="App">
        <Headerbounce />
        <div className="decoration">
          {/* first part */}
          <label>Food Name:</label>
          <input
            type="text"
            onChange={(event) => {
              setfoodName(event.target.value);
            }}
          />

          <motion.button
            className="Add"
            onClick={addToList}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Add!
          </motion.button>

          {/* first part */}

          <h1>Food</h1>
          <Roll bottom>
            <div>
              {foodList.map((val, key) => {
                return (
                  <div key={key} className="product">
                    <div>
                      <div className="checkbox">
                        <h3>
                          <Badge pill variant="success">
                            {val.foodName}
                          </Badge>
                        </h3>
                      </div>

                      <Button
                        style={{ marginBottom: "10px" }}
                        onClick={() => deleteFood(val._id)}
                        variant="success"
                      >
                        Delete
                      </Button>

                      {visible && (
                        <div>
                          <Button onClick={() => updateFood(val._id)}>
                            Update
                          </Button>
                          <input
                            type="text"
                            placeholder="New food Name..."
                            onChange={(event) => {
                              setnewFoodName(event.target.value);
                            }}
                          />
                        </div>
                      )}
                    </div>

                    <Switch
                      checkedChildren={<CheckOutlined />}
                      unCheckedChildren={<CloseOutlined />}
                    />
                  </div>
                );
              })}
            </div>
          </Roll>
          <Wobble>
            <Button onClick={editingHandler} variant="danger">
              Update-Product
            </Button>
          </Wobble>
        </div>
      </div>
    </div>
  );
}

export default Product;
