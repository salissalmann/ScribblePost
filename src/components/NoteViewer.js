import React from "react";
import NoteContext from "../context/NotesContext";
import { useContext } from "react";

export default function NoteViewer(props) 
{
  const Context = useContext(NoteContext);
  const Desc = props.Note.description


  return (
    <>
      <div className='col my-2' id="column">
            <div className='card' id="card">

                <div className="card-title">{props.Note.title}</div>
                <p className="card-desc">{Desc.slice(0,165)}....</p>
                <div className="Button">
                  <p className="card-cat">Category : {props.Note.category}</p>
                  <p className="card-cat" onClick={()=>{Context.DeleteNote(props.Note._id)}}>Delete<i className="fa-solid fa-trash mx-2"></i></p>
                </div>
                
            </div>
            <div className="author">{props.Note.author}</div>
        </div>

    </>
  );
}
