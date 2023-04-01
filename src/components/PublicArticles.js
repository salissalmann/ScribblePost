import React, { useEffect } from "react";
import NavigationBar from "./NavigationBar";

import NoteContext from "../context/NotesContext";
import { useContext} from "react";
import PublicNotesViewer from "./PublicNotesViewer";

export default function PublicArticles() {
  const Context = useContext(NoteContext);

  useEffect( ()=>{Context.GetPublicArticles()})

  let X=0;
  return (
    <>
      <NavigationBar />
      <div className="container" style={{ marginTop: "20px" }}>
        <h3>Public Articles</h3>
      </div>

      <div className="container">
        <div className="row">
          { Context.PublicNotes.length===0 && <h3>No Articles Available</h3>  }

          {Context.PublicNotes.map((Noteselement) => {
            X=X+1;
            return <PublicNotesViewer key={X} Note={Noteselement}></PublicNotesViewer>;
          })}
        </div>
      </div>
    </>
  );
}
