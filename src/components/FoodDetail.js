import { Container } from "react-bootstrap";
import { useApi } from "./context/ApiContext";

export default function FoodDetail() {
  const { currentFoodDetail } = useApi();
  console.log("food detail: ", currentFoodDetail);
  if (!currentFoodDetail) {
    return <h1 style={{ textAlign: "center" }}>No data :(</h1>;
  }
  const {
    image,
    label,
    ingredients,
    dietLabels,
    cuisineType,
    mealType,
    calories,
    url,
  } = currentFoodDetail;

  return (
    <>
      <Container>
        <div className="main-food-detail">
          <h2 className="header">{label}</h2>
          <div className="food-general">
            <div className="food-image">
              <img src={image} alt="img is missing" width="300px" />
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
              <h5>Ingredidents:</h5>

              {ingredients.map((item, index) => {
                return <div key={index}>{item.text}</div>;
              })}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
