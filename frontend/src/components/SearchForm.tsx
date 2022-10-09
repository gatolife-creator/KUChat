import * as React from "react";
import { Link } from "react-router-dom";

export const SearchForm = (props) => {
  const { action, placeholder, name } = props;

  return (
    <form className="form-control" onSubmit={(e) => action(e)}>
      <div className="input-group">
        <input
          type="text"
          placeholder={placeholder}
          className="input input-bordered w-full"
          name={name}
        />
        <Link to="/qrcode-reader" className="btn btn-square">
          <i className="bi bi-qr-code-scan text-xl"></i>
        </Link>
        <button type="submit" className="btn btn-square">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </form>
  );
};
