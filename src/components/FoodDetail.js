import { Container } from "react-bootstrap";
import { useApi } from "./context/ApiContext";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt } from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";

export default function FoodDetail() {
  const [imageModalUrl, setimageModalUrl] = useState(null);
  const { currentFoodDetail } = useApi();
  const localCurrentFoodDetail = localStorage.getItem("selectedFood");
  const currentFoodDetailData = localCurrentFoodDetail
    ? JSON.parse(localCurrentFoodDetail)
    : currentFoodDetail;
  const {
    image,
    label,
    ingredients,
    dietLabels,
    cuisineType,
    mealType,
    calories,
    url,
  } = currentFoodDetailData;

  return (
    <>
      <Container>
        <div className="main-food-detail">
          <h2 className="header">{label}</h2>
          <div className="food-general">
            <div className="food-image" onClick={() => setimageModalUrl(image)}>
              <img src={image} alt="\#" width="300px" />
            </div>
            <div className="food-basicinfo">
              <div className="food-calories">
                <h5>Calories:</h5>
                <div>{calories.toFixed(2)}</div>
              </div>
              <div className="food-cuisinetype">
                <h5>Cuisine type:</h5>
                {cuisineType
                  ? cuisineType.map((item, index) => (
                      <div key={index}>{item}</div>
                    ))
                  : "N/A"}
              </div>
              <div className="food-mealtype">
                <h5>Meal type:</h5>
                {mealType
                  ? mealType.map((item, index) => <div key={index}>{item}</div>)
                  : "N/A"}
              </div>
              <div className="food-diet">
                <h5>Diet:</h5>
                {dietLabels.length !== 0
                  ? dietLabels.map((item, index) => (
                      <div key={index}>{item}</div>
                    ))
                  : "N/A"}
              </div>
              <div className="food-url">
                <h5>Direct Link:</h5>
                <a
                  className="url line-clamp"
                  href={url}
                  rel="noreferrer"
                  target="_blank"
                >
                  {url}
                </a>
              </div>
            </div>
          </div>

          <div className="ingredients">
            <div className="ingredients-details">
              <h5>
                <FontAwesomeIcon
                  icon={faFileAlt}
                  style={{ marginRight: ".25rem" }}
                />
                Ingredidents:
              </h5>

              {ingredients.map((item, index) => {
                return <div key={index}>{item.text}</div>;
              })}
            </div>
          </div>
        </div>
      </Container>
      {imageModalUrl && (
        <Modal
          imageModalUrl={imageModalUrl}
          setimageModalUrl={setimageModalUrl}
        />
      )}
    </>
  );
}
