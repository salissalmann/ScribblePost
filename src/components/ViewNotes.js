import React, { useEffect } from "react";
import NavigationBar from "./NavigationBar";

import NoteContext from "../context/NotesContext";
import NoteViewer from "./NoteViewer";
import { useContext} from "react";

export default function ViewNotes() {
  const Context = useContext(NoteContext);

  useEffect( ()=>{Context.GetAllNotes()})

  let X=0;
  return (
    <>
      <NavigationBar />
      <div className="container" style={{ marginTop: "20px" }}>
        <h3>My Articles</h3>
      </div>

      <div className="container">
        <div className="row">
          { Context.Notes.length===0 && <h3>No Articles Available</h3>  }

          {Context.Notes.map((Noteselement) => {
            X=X+1;
            return <NoteViewer key={X} Note={Noteselement}></NoteViewer>;
          })}
        </div>
      </div>
    </>
  );
}
