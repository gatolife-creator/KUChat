import { Link, useNavigate } from "react-router-dom";
import * as React from "react";
import Avatar from "boring-avatars";

import { wallet } from "../common/common";

export const Navbar = () => {
  const navigate = useNavigate();
  const submit = (e) => {
    e.preventDefault();
    const { message } = e.target;
    if (!message.value) return false;
    navigate("/message-search?q=" + message.value);
    message.value = "";
  };
  return (
    <div className="navbar fixed top-0 left-0 z-50 bg-primary shadow-xl">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-2xl normal-case text-white">
          KUChat
        </Link>
      </div>

      <div className="flex-none gap-2">
        <form
          className="form-control hidden md:block"
          onSubmit={(e) => submit(e)}
        >
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered"
            name="message"
          />
        </form>
        <div className="dropdown-end dropdown">
          <label tabIndex={0} className="avatar btn btn-ghost btn-circle">
            <div className="w-10 rounded-full">
              <Avatar
                size={40}
                name={wallet.publicKey}
                variant="beam"
                colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-primary-content p-2 shadow"
          >
            <li>
              <Link to="/wallet">
                <span className="material-icons">wallet</span>ウォレット
              </Link>
            </li>
            <li>
              <Link to="/history">
                <span className="material-icons">history</span>履歴
              </Link>
            </li>
            <li>
              <Link to="/setting">
                <span className="material-icons">settings</span>設定
              </Link>
            </li>
            <li>
              <Link to="/signin">
                <span className="material-icons">logout</span>ログアウト
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
