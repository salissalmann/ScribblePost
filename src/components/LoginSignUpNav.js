import React  from 'react'
import { Link } from 'react-router-dom'
//recp

import NoteContext from '../context/NotesContext'
import { useContext } from 'react'

const NavigationBar = ()=> 
{
    const Context = useContext(NoteContext);

    const NavStyle =
    {
        textDecoration: "none",
        padding: "1rem",
        paddingBottom: "1rem",
        color: '#69D4C6',
        fontSize: "1.5rem",
        fontWeight: "bold",
        backgroundColor: "#212529",
        borderBottom: "5px solid #69D4C6",
        borderRadius: "10px",
        
        
    
    }

    return (
    <>
        <div className="container my-3" style={NavStyle}>
                <a className="navbar-brand" href="/">Scribble Post</a>
        </div>
    </>
)}

export default NavigationBar;