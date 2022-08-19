import { Link } from "react-router-dom";

export const ContactCard = (props) => {
  return (
    <Link
      to="#"
      className="list-group-item list-group-item-action"
      aria-current="true"
    >
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">{props.name}</h5>
        <small>{props.date}</small>
      </div>
      <p className="mb-1">{props.message}</p>
      <small>And some small print.</small>
    </Link>
  );
};
