import { Link, useNavigate } from "react-router-dom";
import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import ChatIcon from '@mui/icons-material/Chat';
import SearchIcon from "@mui/icons-material/Search";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export const Navbar = () => {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const submit = (e) => {
    e.preventDefault();
    const { message } = e.target;
    if (!message.value) return false;
    navigate("/message-search?q=" + message.value);
    message.value = "";
  };

  return (
    <AppBar className="navbar" position="fixed" sx={{ backgroundColor: "#052c65" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <ChatIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "SF Pro JP",
              fontWeight: 700,
              // letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            KUChat
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem component={Link} to="/" onClick={handleCloseNavMenu}>
                <Typography textAlign="center">ホーム</Typography>
              </MenuItem>
              <MenuItem
                component={Link}
                to="/about"
                onClick={handleCloseNavMenu}
              >
                <Typography textAlign="center">方針</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <ChatIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "SF Pro JP",
              fontWeight: 700,
              // letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            KUChat
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              component={Link}
              to="/"
              onClick={handleCloseNavMenu}
              sx={{
                my: 2,
                color: "white",
                display: "block",
                textAlign: "center",
              }}
            >
              ホーム
            </Button>
            <Button
              component={Link}
              to="/about"
              onClick={handleCloseNavMenu}
              sx={{
                my: 2,
                color: "white",
                display: "block",
                textAlign: "center",
              }}
            >
              方針
            </Button>
          </Box>
          <form name="message" onSubmit={(e) => submit(e)}>
            <Search sx={{ marginRight: 2 }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                name="message"
              />
            </Search>
          </form>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem
                component={Link}
                to="/setting"
                onClick={handleCloseUserMenu}
              >
                <Typography textAlign="center">設定</Typography>
              </MenuItem>
              <MenuItem
                component={Link}
                to="/wallet"
                onClick={handleCloseUserMenu}
              >
                <Typography textAlign="center">ウォレット</Typography>
              </MenuItem>
              <MenuItem
                component={Link}
                to="/signin"
                onClick={handleCloseUserMenu}
              >
                <Typography textAlign="center">サインアウト</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;

// <nav
//   style={{ backgroundColor: "#052c65" }}
//   className="navbar navbar-dark fixed-top navbar-expand-lg border-2 border-top border-warning"
// >
//   <div className="container-fluid">
//     <Link className="navbar-brand" to="/">
//       KUChat
//     </Link>
//     <button
//       className="navbar-toggler"
//       type="button"
//       data-bs-toggle="collapse"
//       data-bs-target="#navbarSupportedContent"
//       aria-controls="navbarSupportedContent"
//       aria-expanded="false"
//       aria-label="Toggle navigation"
//     >
//       <span className="navbar-toggler-icon"></span>
//     </button>
//     <div className="collapse navbar-collapse" id="navbarSupportedContent">
//       <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//         <li className="nav-item">
//           <Link className="nav-link active" aria-current="page" to="/">
//             ホーム
//           </Link>
//         </li>
//         <li className="nav-item">
//           <Link className="nav-link" to="about">
//             About
//           </Link>
//         </li>
//         <li className="nav-item dropdown">
//           <Link
//             className="nav-link dropdown-toggle"
//             to="#"
//             role="button"
//             data-bs-toggle="dropdown"
//             aria-expanded="false"
//           >
//             アカウント
//           </Link>
//           <ul className="dropdown-menu dropdown-menu-dark">
//             <li>
//               <Link className="dropdown-item" to="#">
//                 設定
//               </Link>
//             </li>
//             <li>
//               <Link className="dropdown-item" to="/wallet">
//                 ウォレット
//               </Link>
//             </li>
//             <li>
//               <Link className="dropdown-item" to="/signin">
//                 サインアウト
//               </Link>
//             </li>
//           </ul>
//         </li>
//       </ul>

//       <form className="d-flex" role="search" onSubmit={(e) => submit(e)}>
//         <input
//           className="form-control me-2"
//           name="message"
//           type="search"
//           placeholder="Search"
//           aria-label="Search"
//         />
//         <button
//           className="btn btn-outline-warning search-button"
//           type="submit"
//         >
//           Search
//         </button>
//       </form>
//     </div>
//   </div>
// </nav>
