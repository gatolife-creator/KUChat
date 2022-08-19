import { Link } from "react-router-dom";

export const Card = (props) => {
  return (
    <div className="card mb-4" style={{width: "18rem", margin: "0 auto"}}>
      <img src="https://thumb.photo-ac.com/a4/a40e1742a2f7c39bd57029e35a68e439_w.jpeg" className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text">
          {props.text}
        </p>
        <Link to={props.link} className="btn btn-primary">
          {props.linkText}
        </Link>
      </div>
    </div>
  );
};
