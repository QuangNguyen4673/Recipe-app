import { Card, Container, Row } from "react-bootstrap";
import img_not_available from "./assests/images/img_not_available.png";
import IngredientsDisplay from "./IngredientsDisplay";
export default function FoodDisplay({ data }) {
  console.log(data);
  return (
    <Container>
      <Row xs={2} md={3} lg={4}>
        {data.map((item, index) => {
          const { image, label, discription, ingredients } = item.recipe;
          return (
            <div key={index} className="food-item-container">
              <Card>
                <Card.Img
                  variant="top"
                  src={image}
                  alt="no img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = img_not_available;
                  }}
                />
                <Card.Body>
                  <Card.Title>{label}</Card.Title>
                  <Card.Text>{discription}</Card.Text>
                  <IngredientsDisplay ingredients={ingredients} />
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </Row>
    </Container>
  );
}
