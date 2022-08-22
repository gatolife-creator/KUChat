import { Link } from "react-router-dom";

export const Card = (props) => {
  return (
    <div className="card mb-4" style={{width: "18rem", margin: "0 auto"}}>
      <img src="https://www.shoshinsha-design.com/wp-content/uploads/2020/05/noimage-760x460.png" className="card-img-top" alt="..." />
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
