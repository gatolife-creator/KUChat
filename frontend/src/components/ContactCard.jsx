import { Link } from "react-router-dom";

export const ContactCard = (props) => {
  const { address, name, date, message } = props;
  return (
    <Link
      to={"/chat?address=" + address}
      className="list-group-item list-group-item-action"
      aria-current="true"
    >
      <div className="d-flex w-100 justify-content-between text-truncate">
        <h5 className="mb-1">{name}</h5>
        <small>{date}</small>
      </div>
      <p className="mb-1">{message}</p>
      <small>And some small print.</small>
    </Link>
  );
};
