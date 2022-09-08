import * as React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export const ActionAreaCard = (props) => {
  const { title, content, link, imgURL } = props;
  return (
    <Card
      sx={{
        maxWidth: 345,
        margin: "0 auto",
        marginTop: 5,
        marginBottom: 5,
        textAlign: "center",
      }}
    >
      <CardActionArea component={Link} to={link}>
        <CardMedia component="img" image={imgURL} alt={title} height="140" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {content}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
