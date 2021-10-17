import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";
import * as faker from "faker/locale/en";
import img_not_available from "../assets/images/img_not_available.png";

const apiContext = createContext();
export const useApi = () => useContext(apiContext);

export default function ApiProvider({ children }) {
  const localQuery = localStorage.getItem("query");
  const initialQuery = localQuery
    ? JSON.parse(localQuery)
    : {
        q: "Chicken",
        diet: "",
        cuisineType: "",
      };

  const [recipeDetail, setRecipeDetail] = useState(initialQuery);
  const [currentFoodDetail, setcurrentFoodDetail] = useState({});
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const addApiSyntax = (param) => {
    const key = Object.keys(param);
    const value = Object.values(param);
    let queryArr = [];
    for (let i = 0; i < key.length; i++) {
      if (value[i]) {
        queryArr.push(`&${key[i]}=${value[i]}`);
      }
    }
    return queryArr.join("");
  };
  const addNewFields = (resultData) => {
    return resultData.map((item) => {
      const { uri } = item.recipe;
      const id = uri.substring(uri.indexOf("#") + 1, uri.length);
      const description = faker.lorem.sentence(7, 2);

      return { ...item.recipe, id, description };
    });
  };
  const selectedFood = (id) => {
    const selectedItem = data.filter((item) => item.id === id)[0];
    localStorage.setItem("selectedFood", JSON.stringify(selectedItem));
    setcurrentFoodDetail(selectedItem);
  };
  const updateErrorItemImage = (id) => {
    const updatedData = data.map((item) => {
      if (item.id === id) {
        return { ...item, image: img_not_available };
      }
      return item;
    });
    setData(updatedData);
  };

  useEffect(() => {
    const appId = process.env.REACT_APP_APP_ID;
    const appKey = process.env.REACT_APP_APP_KEY;
    const query = addApiSyntax(recipeDetail);
    const url =
      `https://api.edamam.com/api/recipes/v2?type=public` +
      `&app_id=${appId}&app_key=${appKey}&imageSize=SMALL${query}`;
    const getData = () => {
      setLoading(true);
      return axios.get(url).then((result) => {
        let resultData = result.data.hits;

        resultData = addNewFields(resultData);
        setData(resultData);
        setLoading(false);
      });
    };
    getData();
  }, [recipeDetail]);

  const value = {
    data,
    loading,
    currentFoodDetail,
    initialQuery,
    selectedFood,
    setRecipeDetail,
    updateErrorItemImage,
  };
  return <apiContext.Provider value={value}>{children}</apiContext.Provider>;
}
