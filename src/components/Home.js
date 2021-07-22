import axios from "axios";
import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import FoodDisplay from "./FoodDisplay";

export default function Home() {
  const appId = "1e0e5f3e";
  const appKey = "51fbb2b80cbfe5ce41de48bc752f8e27";
  const [food, setFood] = useState("chicken");
  const [cuisineType, setCuisineType] = useState("");
  const [diet, setDiet] = useState("");
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(false);
  const additionalOption = (param) => {
    const key = Object.keys(param);
    const value = Object.values(param);
    let optArr = [];
    for (let i = 0; i < key.length; i++) {
      if (value[i]) {
        optArr.push(`&${key[i]}=${value[i]}`);
      }
    }
    return [...optArr].join("");
  };
  const filter = additionalOption({ cuisineType, diet });
  const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${food}&app_id=${appId}&app_key=${appKey}&imageSize=SMALL${filter}`;
  const getData = () => {
    return axios.get(url).then((result) => {
      console.log(result.data.hits);
      setImage(
        result.data.hits.map((item) => {
          const imageLink = item.recipe.image;
          return imageLink;
        })
      );
    });
  };
  useEffect(() => {
    getData();
  }, []);
  const onHandleForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    await getData();
    setLoading(false);
  };
  return (
    <>
      <div className="query-form">
        <Form onSubmit={(e) => onHandleForm(e)}>
          <Form.Group id="food">
            <Form.Label>Choose your food</Form.Label>
            <Form.Control
              type="text"
              value={food}
              placeholder="Enter food name"
              onChange={(e) => setFood(e.target.value)}
            />
          </Form.Group>
          <div>Choose your cuisine type:</div>
          <select
            className="form-select"
            value={cuisineType}
            onChange={(e) => setCuisineType(e.target.value)}
          >
            <option value="">.</option>
            <option value="American">American</option>
            <option value="Asian">Asian</option>
            <option value="British">British</option>
            <option value="chinese">Chinese</option>
            <option value="Japanese">Japanese</option>
          </select>
          <div>Choose your diet</div>
          <select
            className="form-select"
            value={diet}
            onChange={(e) => setDiet(e.target.value)}
          >
            <option value="">.</option>
            <option value="balanced">Balanced</option>
            <option value="high-fiber">High-fiber</option>
            <option value="high-protein">High-protein</option>
            <option value="low-carb">Low-carb</option>
          </select>
          <Button type="submit" disabled={loading}>
            Submit
          </Button>
        </Form>
      </div>
      <FoodDisplay image={image} />
    </>
  );
}
