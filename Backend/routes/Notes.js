const express = require('express');
const Router = express.Router();

const FetchUser = require('../middleware')
const Notes = require('../models/Notes');
const User = require('../models/User');

const {body} = require("express-validator");
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

//Middleware allows to have an identity of the user
//FetchUser middleware gets us the user in our request header
Router.get('/GetUserNotes' , FetchUser  , jsonParser , async (Req , Res)=> 
{
    const FetchUserNotes = await Notes.find( {user: Req.user.id })
    Res.send(FetchUserNotes);
})

Router.get('/GetPublicArticles' , jsonParser , async (Req , Res)=> 
{
    const FetchArticles = await Notes.find({category:"Public"})
    Res.send(FetchArticles);
})


Router.post('/AddNotes' , 
        FetchUser , 
        [
            body('title' , 'Enter a valid title').isLength({min:3}),
            body('description' , 'Enter a valid description').isLength({min:3}),
            body('tag' , 'Enter a valid tag').isLength({min:3}),
        ] 
        , jsonParser , async (Req , Res)=> 
{
    try 
    {
        let Author = await User.findOne( { _id : Req.user.id })
        console.log(Req.body)
        const NewNote = new Notes(
            {
                user: Req.user.id,
                author: Author.name,
                title: Req.body.title, 
                description: Req.body.description,
                category: Req.body.category,
                tag: Req.body.tag,
            }
        )
        const AddedNote= await NewNote.save();
        Res.send(AddedNote);    
    } 
    catch (error) 
    {
        console.error(error.message)
        return Res.status(400).json({ Error: "An Error Occured"});
    }
    

})

//Updating a Note
Router.put('/updateNote/:id' , jsonParser , async (Req , Res)=> 
{
    try 
    {
        //New Notes will be replaced by exsistingone
        const NewNote = {};
        if(Req.body.title)
        {
            NewNote.title = Req.body.title;
        }
        if(Req.body.description)
        {
            NewNote.description = Req.body.description;
        }
        if(Req.body.tag)
        {
            NewNote.tag = Req.body.tag;
        }

        //Finds if note is there or not
        const FindNote = Notes.findById( Req.params.id )
        if (!FindNote)
        {
            return Res.status(404).send("Note was not Found");
        }
        //Checking if user is the same as the user who added it.
        if (FindNote.user.toString() !== Req.user.id )
        {
            return Res.status(404).send("User was not allowed to change note");
        }

        //And then updating the note
        let NoteUpdate = await Notes.findByIdAndUpdate( Req.params.id, {$set: NewNote} , {new:true} )
        Res.json(NoteUpdate);
   
    } 
    catch (error) 
    {
        console.error(error.message)
        return Res.status(400).json({ Error: "An Error Occured"});
    }
})

//Delete Note
Router.delete('/DeleteNote/:id' , jsonParser , async (Req , Res)=> 
{
    try 
    {
        //Finds if note is there or not
        const FindNote = Notes.findById( Req.params.id )
        if (!FindNote)
        {
            return Res.status(404).send("Note was not Found");
        }
        //Checking if user is the same as the user who added it.
        
        //And then Deleting the note
        let DeleteNote = await Notes.findByIdAndDelete(Req.params.id);
        Res.json(DeleteNote);
   
    } 
    catch (error) 
    {
        console.error(error.message)
        return Res.status(400).json({ Error: "An Error Occured"});
    }
})






module.exports = Router;