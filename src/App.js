import "./App.css";
import Navbar from "./Navbar";
import { Route, Routes } from "react-router-dom";
import BlogDisplay from "./BlogDisplay";
import Login from "./Login";
import Signup from "./Signup";
import { createContext, useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import Home from "./Home";
import ReadMore from "./ReadMore";
export const myContext = createContext();

function App() {
  const [readBlog, setreadBlog] = useState("");
  const [arrBlog, setarrBlog] = useState('');
  const [arrEdit, setarrEdit] = useState('');
  const [User, setUser] = useState('');
  const [logedin, setLogin] = useState(false);
  const [logOut, setlogOut] = useState(false);
  const [snack, setSnack] = useState({
    open: false,
    msg: "",
    severity: "info",
  });
  return (
    <>
      <myContext.Provider value={{arrEdit, setarrEdit,arrBlog,setarrBlog,setreadBlog,readBlog,User, setUser,logedin,setLogin,logOut,setlogOut,snack,setSnack}}>
        <Routes>
          <Route element={<Navbar />}>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/blogDisplay" element={<BlogDisplay />} />
            <Route path="/readmore" element={<ReadMore />} />
          </Route>
        </Routes>
      </myContext.Provider>
      <Snackbar
        open={snack.open}
        onClose={() => {
          setSnack({ open: false, msg: "", severity: "info" });
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
      >
        <Alert
          variant="filled"
          onClose={() => {
            setSnack({ open: false, msg: "", severity: "info" });
          }}
          severity={snack.severity}
        >
          {snack.msg}
        </Alert>
      </Snackbar>
    </>
  );
}

export default App;
