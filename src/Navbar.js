import React, { useContext, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./navbar.css";
import MenuIcon from "@mui/icons-material/Menu";
import { Drawer } from "@mui/material";
import { myContext } from "./App";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { logedin, setLogin, setSnack, User } = useContext(myContext);
  return (
    <>
      <div className="blognav">
        <div className="div1">
          <div>
            <Link to="/">BLOG SPOT</Link>
          </div>
        </div>
        <div className="div2"></div>
        <div className="div3">
          <div className="home">
            <Link to="/">Home</Link>
          </div>
          {logedin &&(<div className="home">
            <Link to="/blogdisplay">Blogs</Link>
          </div>)}
          
          {!logedin && (
            <div>
              <Link to="/login" id="loginLink">
                Login
              </Link>
            </div>
          )}
          {!logedin && (
            <div>
              <Link to="/signup" id="signUpLink">
                Signup
              </Link>
            </div>
          )}
          {logedin && <div id="name">Welcome {User.userName}</div>}
          {logedin && (
            <div id="logoutLink">
              <Link
                to="/"
                onClick={() => {
                  setLogin(false);
                  setSnack({
                    open: true,
                    msg: "Logout Successfully!.",
                    severity: "success",
                  });
                }}
              >
                Logout
              </Link>{" "}
            </div>
          )}
        </div>
        <div id="div3">
          <MenuIcon
            onClick={() => {
              setOpen(true);
            }}
            sx={{ fontSize: "30px", color: "white" }}
          />
        </div>
      </div>
      <Drawer
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        anchor="right"
        PaperProps={{
          sx: { width: "30%", backgroundColor: "  rgba(230, 224, 238)" },
        }}
      >
        <div className="paperNav">
          <div>
            <Link to="/">Home</Link>
          </div>
          {!logedin && (
            <div>
              <Link to="/login" id="loginLink">
                Login
              </Link>
            </div>
          )}
          {!logedin && (
            <div>
              <Link to="/signup" id="signUpLink">
                Signup
              </Link>
            </div>
          )}
          {logedin && <div id="name">Welcome {User.userName}</div>}
          {logedin && (
            <div id="logoutLink">
              <Link to="/" onClick={() => {
                  setLogin(false);
                  setSnack({
                    open: true,
                    msg: "Logout Successfully!.",
                    severity: "success",
                  });
                }}>
                Logout
              </Link>{" "}
            </div>
          )}
        </div>
      </Drawer>
      <Outlet />
    </>
  );
}
