import React from 'react'
import NoteContext from '../context/NotesContext';
import { useContext } from 'react';

function PublicNotesViewer(props) 
{
    const Context = useContext(NoteContext);

    const Desc = props.Note.description
    return (
      <>
        <div className='col my-2' id="column">
            <div className='card' id="card">
                <div className="card-title">{props.Note.title}</div>
                <p className="card-desc">{Desc.slice(0,165)}....</p>
                <p className="card-cat">Category : {props.Note.category}</p>
            </div>
            <div className="author">{props.Note.author}</div>
        </div>


        

      </>
    )
}

export default PublicNotesViewer