import React, { useContext, useState } from "react";
import blogData from "./BlogData.json";
import "./blogDisplay.css";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Modal, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { myContext } from "./App";

export default function BlogDisplay() {
  const { setreadBlog, User, setSnack, arrEdit, setarrEdit } =
    useContext(myContext);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  var navigate = useNavigate();

  //style variable for modal
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    bgcolor: "white",
    border: "2px solid #000",
    height: "70%",
    margin: "auto",
    textAlign: "center",
  };

  //function to create blog
  const createBlog = () => {
    var arr = [];
    var inp_title = document.getElementById("title").value;
    var inp_img = document.getElementById("image").files[0];
    var inp_text = document.getElementById("desc").value;

    if (arrEdit === "" ) {
      if( inp_title!=="" && inp_text!==""){
        arr = {
          id:blogData.length,
          userId:User.id,
          userName: User.userName,
          title: inp_title,
          text: inp_text,
          image:
            inp_img !== undefined
              ? URL.createObjectURL(inp_img)
              : "https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg",
        };
        blogData.splice(0, 0, arr); //pushing new blog at index 0
        setSnack({
          open: true,
          msg: "Blog Post Successful",
          severity: "success",
        });
        setOpen(false);
      }
      else{
        setSnack({
          open: true,
          msg: "Fill all the fields",
          severity: "error",
        });
      }
    } else {
      var update = blogData.find((a) => a.id === +arrEdit.id);
      update.title = inp_title;
      update.text = inp_text;
      update.image =
        inp_img !== undefined ? URL.createObjectURL(inp_img) : update.image;
      setSnack({ open: true, msg: "Blog Post updated", severity: "success" });
      setOpen(false);
    }
  };

  //function to read more
  const readBlogFun = (event) => {
    var click = event.target.name;
    console.log(click);
    let obj = blogData.find((a) => a.id === +click);
    setreadBlog(obj);
    navigate("/readmore");
  };

  //function to edit blog
  const editBlog = (event) => {
    var click = event.target.name||event.target.closest('button').name;
    let editObj = blogData.find((a) => a.id === +click);
    setarrEdit(editObj);
    setOpen(true);
  };

  //function when clicked on delete btn
  var deleteBlog = (event) => {
    var click = event.target.name;
    blogData.splice(click, 1);
    setSnack({ open: true, msg: "Blog deleted.", severity: "error" });
  };
  return (
    <>
      <div className="HomeBlog">
        {blogData.map((val, i) => {
          return (
            <div className="blog" key={i}>
              <div>
                <img src={val.image} alt="cover" />
              </div>
              <div>
                <h4>{val.title}</h4>
              </div>
              <div className="readbtn">
                <p>
                  {val.text.substring(0, 40) + "..."}
                  <button name={val.id} onClick={readBlogFun}>
                    Read More
                  </button>
                </p>
              </div>
              <div>
                <h5>By: {val.userName}</h5>
              </div>
              <div className="editdel">
                {User.id === val.userId ? (
                  <button name={val.id} onClick={editBlog}>
                    
                    <ModeEditIcon
                      sx={{ color: "green", cursor: "pointer" }}
                    />
                  </button>
                ) : (
                  ""
                )}
                &emsp;
                <button name={i} onClick={deleteBlog}>
                  <DeleteIcon sx={{ color: "red", cursor: "pointer" }} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div
        className="addbtn"
        onClick={() => {
          setarrEdit("");
          setOpen(true);
        }}
      >
        <button
          onClick={() => {
            setarrEdit("");
            setOpen(true);
          }}
        >
          <i class="fa fa-plus" aria-hidden="true"></i>
        </button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <br></br>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create your blog
          </Typography>
          <br></br>
          <br></br>
          <hr></hr>
          <br></br>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div>
              <input type="file" id="image" accept="image/*"></input>&emsp;
              <input
                type="text"
                defaultValue={arrEdit.title}
                id="title"
                placeholder="title" required
              ></input>
            </div>
            <br></br>
            <div>
              <textarea
                style={{ width: "60%", height: "20vh" }}
                id="desc"
                defaultValue={arrEdit.text}
                placeholder="Write something!"
              ></textarea>
            </div>
            <br></br>
            <div className="modalbtn">
              <button
                id="cancelmodal"
                onClick={() => {
                  setOpen(false);
                }}
              >
                Cancel
              </button>
              &emsp;&emsp;
              <button id="createModal" onClick={createBlog}>
                Create
              </button>
            </div>
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
