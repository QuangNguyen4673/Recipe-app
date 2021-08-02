import { Card, Container, Row, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import img_not_available from "./assests/images/img_not_available.png";
import { useApi } from "./context/ApiContext";

export default function Food({ data }) {
  const { setcurrentFoodDetail } = useApi();
  const history = useHistory();
  const handleClick = (...params) => {
    setcurrentFoodDetail(params[0]);
    history.push("/Restaurant-app/foodDetail");
  };
  return (
    <Container className="foodcard-container">
      <Row xs={2} md={3} lg={4}>
        {data.map((item, index) => {
          const {
            image,
            label,
            discription,
            ingredients,
            dietLabels,
            cuisineType,
            mealType,
            calories,
            url,
          } = item.recipe;

          return (
            <div key={index} className="food-item-container">
              <Card>
                <Card.Img
                  variant="top"
                  src={image}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = img_not_available;
                  }}
                />
                <Card.Body>
                  <Card.Title>{label}</Card.Title>
                  <Card.Text>{discription}</Card.Text>
                  <Button
                    variant="primary"
                    type="button"
                    onClick={() =>
                      handleClick({
                        image,
                        label,
                        discription,
                        ingredients,
                        dietLabels,
                        cuisineType,
                        mealType,
                        calories,
                        url,
                      })
                    }
                  >
                    Go to detail
                  </Button>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </Row>
    </Container>
  );
}
