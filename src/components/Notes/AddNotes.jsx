import React, { useContext, useState } from "react";
import NoteContext from "../../context/NotesContext";
import NavigationBar from "../NavigationBar";
import { Link } from "react-router-dom";

export default function AddNotes() {
  const Context = useContext(NoteContext);

  const [Title, setTitle] = useState(""); /*Array Destructuring*/
  const [Description, setDesc] = useState(""); /*Array Destructuring*/
  const [Tag, setTag] = useState(""); /*Array Destructuring*/
  const [Category , setCategory] = useState(""); 

  const HandleTitleValue = (event) => {
    setTitle(event.target.value);
  };
  const HandleDescValue = (event) => {
    setDesc(event.target.value);
  };
  const HandleTagValue = (event) => {
    setTag(event.target.value);
  };

  const HandleCatValue = (event) => {
    setCategory(event.target.value);
  };

  const HandleSubmit = (e) => {
    //Prevents Reloading
    e.preventDefault();
    Context.AddNote(Title, Description, Category , Tag );
  };

  return (
    <>
      <NavigationBar />

      <div className="container my-4">
        <h3>Add Article</h3>
        <div className="main">
          <div className="signup-form my-2">
            <div className="container ">
              <form onSubmit={HandleSubmit}>
                <div
                  className="container"
                  style={{ marginTop: "20px", borderColor: "black" }}
                >
                  <label htmlFor="title" className="visually-hidden">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    placeholder="Enter Title"
                    onChange={HandleTitleValue}
                  />
                </div>

                <div className="container" style={{ marginTop: "20px" }}>
                 <textarea class="form-control"type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    placeholder="Enter Description"
                    onChange={HandleDescValue}
                 ></textarea>
                </div>

                <div className="container" style={{ marginTop: "20px" }}>
                  <label htmlFor="tag" className="visually-hidden">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="tag"
                    name="tag"
                    placeholder="Enter Tag"
                    onChange={HandleTagValue}
                  />
                </div>

                <div className="container my-4">
                    <select class="form-select" aria-label="Default select example" id="category" name="category" value={Category} onChange={HandleCatValue}>
                        <option selected>Select Publication</option>
                        <option value="Private">Private</option>
                        <option value="Public">Public</option>
                    </select>
                </div>

                <input className="signup-btn" type="submit" value="Add Article" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
