import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav
      style={{ backgroundColor: "#052c65" }}
      className="navbar navbar-dark fixed-top navbar-expand-lg border-2 border-top border-warning"
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          KUChat
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                ホーム
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="about">
                About
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                アカウント
              </Link>
              <ul className="dropdown-menu dropdown-menu-dark">
                <li>
                  <Link className="dropdown-item" to="#">
                    設定
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/wallet">
                    ウォレット
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/signin">
                    サインアウト
                  </Link>
                </li>
              </ul>
            </li>
          </ul>

          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-warning search-button"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};
