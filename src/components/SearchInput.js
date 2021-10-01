import React, { useRef } from "react";
import { useApi } from "./context/ApiContext";
import { Form, Button } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";

function SearchInput() {
  const { loading, setFoodName, setDiet, setCuisineType, foodName } = useApi();

  const location = useLocation();
  console.log(location.pathname);
  const foodRef = useRef();
  const cuisineTypeRef = useRef();
  const dietRef = useRef();
  const history = useHistory();
  const onHandleSubmit = (e) => {
    e.preventDefault();
    setFoodName(foodRef.current.value);
    setDiet(dietRef.current.value);
    setCuisineType(cuisineTypeRef.current.value);
    history.push("/Recipe-app");
  };
  return (
    <div className="dashboard">
      <h1 style={{ textAlign: "center" }}>Recipe app</h1>
      <div className="search-input">
        <h5>Choose your food, cuisine type and diet</h5>
        <Form onSubmit={(e) => onHandleSubmit(e)}>
          <Form.Group>
            <Form.Control
              type="text"
              defaultValue={foodName}
              ref={foodRef}
              placeholder="Enter food name (required)"
            />
          </Form.Group>

          <select className="form-select" ref={cuisineTypeRef}>
            <option value="">Any cuisine type</option>
            <option value="American">American</option>
            <option value="Asian">Asian</option>
            <option value="British">British</option>
            <option value="chinese">Chinese</option>
            <option value="Japanese">Japanese</option>
          </select>

          <select className="form-select" ref={dietRef}>
            <option value="">Any diet</option>
            <option value="balanced">Balanced</option>
            <option value="high-fiber">High-fiber</option>
            <option value="high-protein">High-protein</option>
            <option value="low-carb">Low-carb</option>
          </select>
          <Button type="submit" disabled={loading}>
            Search
          </Button>
        </Form>
        {location.pathname === "/Recipe-app/foodDetail" && (
          <Button
            variant="success"
            type="button"
            onClick={() => history.push("/Recipe-app")}
          >
            Go back to DashBoard
          </Button>
        )}
      </div>
    </div>
  );
}

export default SearchInput;
