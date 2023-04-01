import React, { useState } from "react";
import NoteContext from "./NotesContext";

const NotesStates = (props)=>
{
   /*
    const NotesObject = 
    [
        {
          "_id": "63a9e774b2394d197cfea312",
          "user": "63a7448d3da8602349cbf964",
          "title": "Salis Salman Notes",
          "description": "Salis Added a notes",
          "date": "2022-12-26T18:27:00.578Z",
          "__v": 0
        },
        {
          "_id": "63b84be5f909ba515017aa9b",
          "user": "63a7448d3da8602349cbf964",
          "title": "Salis",
          "description": "salissalman@gmail.com",
          "date": "2023-01-06T16:27:17.991Z",
          "__v": 0
        },
        {
          "_id": "63a9e774b2394d197cfea312",
          "user": "63a7448d3da8602349cbf964",
          "title": "Salis Salman Notes",
          "description": "Salis Added a notes",
          "date": "2022-12-26T18:27:00.578Z",
          "__v": 0
        },
        {
          "_id": "63b84be5f909ba515017aa9b",
          "user": "63a7448d3da8602349cbf964",
          "title": "Salis",
          "description": "salissalman@gmail.com",
          "date": "2023-01-06T16:27:17.991Z",
          "__v": 0
        },
        {
          "_id": "63a9e774b2394d197cfea312",
          "user": "63a7448d3da8602349cbf964",
          "title": "Salis Salman Notes",
          "description": "Salis Added a notes",
          "date": "2022-12-26T18:27:00.578Z",
          "__v": 0
        },
        {
          "_id": "63b84be5f909ba515017aa9b",
          "user": "63a7448d3da8602349cbf964",
          "title": "Salis",
          "description": "salissalman@gmail.com",
          "date": "2023-01-06T16:27:17.991Z",
          "__v": 0
        }

      ]
    */

    const NotesObject = [];
    const [SiteName , SetSiteName] = useState("Scribble Post");
    const [Notes , SetNotes] = useState(NotesObject);
     
    const PublicArticlesObject = [];
    const [PublicNotes , SetPublicNotes] = useState(PublicArticlesObject);

    const GetPublicArticles = async() =>
    {
      //Called in Notes Viewer using UseEffect;
       const Response = await fetch( "http://localhost:3001/notes/GetPublicArticles",
       {
          method: 'GET',
          headers:
          { 'Content-Type' : 'application/json',
          }
        })
        const ResponseToJson = await Response.json();
        SetPublicNotes(ResponseToJson);
    }


    const GetAllNotes = async() =>
    {
      //Called in Notes Viewer using UseEffect;
       const Response = await fetch( "http://localhost:3001/notes/GetUserNotes",
       {
          method: 'GET',
          headers:
          { 'Content-Type' : 'application/json',
            'Authorization-Token' : localStorage.getItem('Token')       
          }
        })
        const ResponseToJson = await Response.json();
        SetNotes(ResponseToJson);

    }

    //Add Notes Function
    const AddNote = async (title , description , category , tag) =>
    {
        
        const Response = await fetch( `http://localhost:3001/notes/AddNotes`,
        {
            method: 'POST',
            headers:
            { 'Content-Type' : 'application/json',
              'Authorization-Token' : localStorage.getItem('Token')      
            },
            body: JSON.stringify({title,description,tag,category})
        })
        
        const ResponseToJson = await Response.json();
        console.log(ResponseToJson);
        /*
        const NewNote = {
          "user": "63a7448d3da8602349cbf964",
          "title": title,
          "description": description,
          "tag": tag,
        }
        SetNotes(NotesObject.concat(NewNote));
        */
      }

    const DeleteNote = async (Id) =>
    {
       //const NewNotes = NotesObject.filter( (element) => { return element._id!==Id} ) 
       //SetNotes(NewNotes)

      const Response = await fetch( `http://localhost:3001/notes/DeleteNote/${Id}`,
      {
          method: 'DELETE',
          headers:
          { 'Content-Type' : 'application/json',
            //'Authorization-Token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhNzQ0OGQzZGE4NjAyMzQ5Y2JmOTY0In0sImlhdCI6MTY3MTkxOTA1Nn0.pesiHl7Juz3TnLu8Iv3RVZnH7ETlVhxWvogP9tkSmxU'       
            'Authorization-Token' : localStorage.getItem('Token')      
         
          }
      })
      const ResponseToJson = await Response.json();
      console.log(ResponseToJson);

    }
    
    const UpdateNote = (Id , title , description ,tag ) =>
    {
        //Fetch Notes Api Call
        //Modal banana video 68.
        for ( let i=0 ; i<NotesObject.length ; i++)
        {
            const ThisNote = NotesObject[i];
            if(ThisNote._id===Id)
            {
                ThisNote.title = title;
                ThisNote.description = description;
                ThisNote.tag = tag;
            }
        }
    }
    


    return (
        <NoteContext.Provider value={ {SiteName,SetSiteName,Notes, AddNote, DeleteNote , UpdateNote ,GetAllNotes , GetPublicArticles,PublicNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NotesStates;