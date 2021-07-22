import React, { useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { useApi } from "./context/ApiContext";
import FoodDisplay from "./FoodDisplay";

const DashBoard = () => {
  const { data, setFoodName, setDiet, setCuisineType } = useApi();
  const foodRef = useRef();
  const cuisineTypeRef = useRef();
  const dietRef = useRef();
  const onHandleSubmit = (e) => {
    e.preventDefault();
    setFoodName(foodRef.current.value);
    setDiet(dietRef.current.value);
    setCuisineType(cuisineTypeRef.current.value);
  };
  console.log("re-render from dashboard");
  return (
    <div className="dashboard">
      <h3 className="header">Dashboard</h3>
      <div className="search-input">
        <Form onSubmit={(e) => onHandleSubmit(e)}>
          <Form.Group>
            <Form.Control
              type="text"
              ref={foodRef}
              placeholder="Enter food name (required)"
            />
          </Form.Group>

          <select className="form-select" ref={cuisineTypeRef}>
            <option value="">Choose your cuisine type</option>
            <option value="American">American</option>
            <option value="Asian">Asian</option>
            <option value="British">British</option>
            <option value="chinese">Chinese</option>
            <option value="Japanese">Japanese</option>
          </select>

          <select className="form-select" ref={dietRef}>
            <option value="">Choose your diet</option>
            <option value="balanced">Balanced</option>
            <option value="high-fiber">High-fiber</option>
            <option value="high-protein">High-protein</option>
            <option value="low-carb">Low-carb</option>
          </select>
          <Button type="submit">Search</Button>
        </Form>
      </div>
      <FoodDisplay data={data} />
    </div>
  );
};

export default DashBoard;
