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
    <div className="navbar fixed top-0 left-0 bg-gray-400">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl normal-case">
          KUChat
        </Link>
      </div>

      <div className="flex-none gap-2">
        <form className="form-control hidden md:block" onSubmit={(e) => submit(e)}>
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered"
            name="message"
          />
        </form>
        <div className="dropdown dropdown-end">
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
            className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
          >
            <li>
              <Link to="/setting">設定</Link>
            </li>
            <li>
              <Link to="/signin">ログアウト</Link>
            </li>
            <li>
              <Link to="/wallet">ウォレット</Link>
            </li>
            <li>
              <Link to="/history">履歴</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
