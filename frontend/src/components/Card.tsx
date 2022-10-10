import React from "react";
import { Link } from "react-router-dom";

export const Card = (props: {
  title: string;
  paragraph: string;
  btnTitle: string;
  link: string;
}) => {
  const { title, paragraph, btnTitle, link } = props;
  return (
    <div className="card mx-auto inline-block w-5/6 bg-accent">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{paragraph}</p>
        <div className="card-actions justify-end">
          <Link to={link} className="btn">
            {btnTitle}
          </Link>
        </div>
      </div>
    </div>
  );
};
