import { Card, Container, Row, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
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
      <Row xs={2} md={3} lg={4} style={{ justifyContent: "center" }}>
        {data.map((item) => {
          const { image, label, description, id, url } = item;

          return (
            <div key={id} className="food-item-container">
              <Card>
                <Card.Img
                  variant="top"
                  src={image}
                  onError={(e) => updateErrorItemImage(id)}
                  onClick={() => clickHandler(id)}
                />
                <Card.Body>
                  <Card.Title>{label}</Card.Title>
                  <Card.Text>{description}</Card.Text>
                  <a href={url} target="_blank" rel="noreferrer">
                    <Button variant="primary" type="button">
                      Direct Link
                    </Button>
                  </a>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </Row>
    </Container>
  );
}
