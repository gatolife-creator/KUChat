import * as React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export const ActionAreaCard = (props) => {
  const { title, content, link } = props;
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
        <CardMedia
          component="img"
          height="140"
          image="https://www.shoshinsha-design.com/wp-content/uploads/2020/05/noimage-760x460.png"
          alt={title}
        />
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

// import { Link } from "react-router-dom";

// export const Card = (props) => {
//   return (
//     <div className="card mb-4" style={{width: "18rem", margin: "0 auto"}}>
//       <img src="https://www.shoshinsha-design.com/wp-content/uploads/2020/05/noimage-760x460.png" className="card-img-top" alt="..." />
//       <div className="card-body">
//         <h5 className="card-title">{props.title}</h5>
//         <p className="card-text">
//           {props.text}
//         </p>
//         <Link to={props.link} className="btn btn-primary">
//           {props.linkText}
//         </Link>
//       </div>
//     </div>
//   );
// };
