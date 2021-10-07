import { Card, Container, Row, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import img_not_available from "./assets/images/img_not_available.png";
import { useApi } from "./context/ApiContext";
import { BeatLoader } from "react-spinners";

export default function Food({ data }) {
  const { selectedFood, loading, updateErrorItemImage } = useApi();
  const history = useHistory();
  const clickHandler = (id) => {
    const myHeader = document.getElementById("myheader");
    myHeader.scrollIntoView();
    selectedFood(id);
    history.push(`/Recipe-app/${id}`);
  };

  if (loading)
    return (
      <div className="loader-container">
        <BeatLoader />
      </div>
    );
  return (
    <Container className="foodcard-container">
      <Row xs={2} md={3} lg={4}>
        {data.map((item) => {
          const { image, label, description, id } = item;

          return (
            <div
              key={id}
              className="food-item-container"
              style={{ paddingLeft: "0.5rem", paddingRight: "0.5rem" }}
            >
              <Card>
                <Card.Img
                  variant="top"
                  src={image}
                  onError={(e) => updateErrorItemImage(id)}
                />
                <Card.Body>
                  <Card.Title>{label}</Card.Title>
                  <Card.Text>{description}</Card.Text>
                  <Button
                    variant="primary"
                    type="button"
                    onClick={() => clickHandler(id)}
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
