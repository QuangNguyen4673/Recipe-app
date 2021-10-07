import React, { useState } from "react";
import { useApi } from "./context/ApiContext";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function SearchInput() {
  const { loading, initialQuery, setRecipeDetail } = useApi();

  const [q, setQ] = useState(initialQuery);
  const [diet, setDiet] = useState("");
  const [cuisineType, setCuisineType] = useState("");

  const history = useHistory();
  const onHandleSubmit = (e) => {
    e.preventDefault();
    setRecipeDetail({ q, diet, cuisineType });
    history.push("/Recipe-app");
  };

  const clickHandler = () => {
    history.push("/Recipe-app");
  };
  return (
    <div className="dashboard">
      <div id="myheader" className="header">
        <h1 onClick={clickHandler}>Recipe app</h1>
      </div>

      <div className="search-input">
        <h5>Choose your food, cuisine type and diet</h5>
        <Form onSubmit={(e) => onHandleSubmit(e)}>
          <Form.Group>
            <Form.Control
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Enter food name (required)"
            />
          </Form.Group>

          <select
            className="form-select"
            value={cuisineType}
            onChange={(e) => setCuisineType(e.target.value)}
          >
            <option value="">Any cuisine type</option>
            <option value="American">American</option>
            <option value="Asian">Asian</option>
            <option value="British">British</option>
            <option value="chinese">Chinese</option>
            <option value="Japanese">Japanese</option>
          </select>

          <select
            className="form-select"
            value={diet}
            onChange={(e) => setDiet(e.target.value)}
          >
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
      </div>
    </div>
  );
}

export default SearchInput;
