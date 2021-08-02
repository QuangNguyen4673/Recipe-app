import {
  AccordionSummary,
  Accordion,
  AccordionDetails,
  Typography,
  Paper,
} from "@material-ui/core";
import React from "react";

function Ingredients({ ingredients }) {
  return (
    <Accordion className="ingredients">
      <AccordionSummary>
        <Typography variant="h6" component="h4">
          Ingredients
        </Typography>
      </AccordionSummary>

      <AccordionDetails className="ingredients-detail">
        {ingredients.map((item, index) => {
          return (
            <Paper key={index} elevation={1}>
              -{item.text}
            </Paper>
          );
        })}
      </AccordionDetails>
    </Accordion>
  );
}
export default Ingredients;