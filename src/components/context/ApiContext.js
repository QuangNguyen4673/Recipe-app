import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";
import * as faker from "faker/locale/en";

const apiContext = createContext();
export const useApi = () => useContext(apiContext);

export default function ApiProvider({ children }) {
  const appId = "1e0e5f3e";
  const appKey = "51fbb2b80cbfe5ce41de48bc752f8e27";
  const [foodName, setFoodName] = useState("Chicken");
  const [diet, setDiet] = useState("");
  const [cuisineType, setCuisineType] = useState("");
  const [currentFoodDetail, setcurrentFoodDetail] = useState("");

  const [data, setData] = useState([]);
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

  useEffect(() => {
    const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${foodName}&app_id=${appId}&app_key=${appKey}&imageSize=SMALL${filter}`;
    const getData = () => {
      setLoading(true);
      return axios.get(url).then((result) => {
        //add discription
        let dataArr = result.data.hits;
        for (let i = 0; i < dataArr.length; i++) {
          dataArr[i].recipe.discription = faker.lorem.sentence(7, 2);
        }
        setData(dataArr);
        setLoading(false);
      });
    };
    getData();
    return () => console.log("apiContext unmounted");
  }, [foodName, diet, cuisineType]);
  const value = {
    foodName,
    diet,
    cuisineType,
    data,
    loading,
    currentFoodDetail,
    setFoodName,
    setDiet,
    setCuisineType,
    setcurrentFoodDetail,
  };
  console.log(
    "food, diet, cuisine from apicontext:",
    foodName,
    diet,
    cuisineType
  );
  return <apiContext.Provider value={value}>{children}</apiContext.Provider>;
}
