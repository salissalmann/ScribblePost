const express = require('express');
const Router = express.Router();
const bcrypt = require('bcryptjs')


const jwt = require('jsonwebtoken');
const SECRET_KEY = "SALUSISSEXY";

const User = require('../models/User');
const FetchUser = require('../middleware')

var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

//Requests and Response using JSON
//CREATE USER
Router.post('/createUser' ,  jsonParser , async (Req , Res)=> 
    {
        let Success = false;
        try 
        {
            let AleadyExsist = await User.findOne( { email: Req.body.email })
            if(AleadyExsist)
            {
                return Res.status(400).json({ Success: Success , Error: "Sorry User Already Exsists"});
            }

            const Salt = await bcrypt.genSalt(10);
            const HashedPassword = await bcrypt.hash(Req.body.password , Salt);

            const CreateUser = await User.create(
                {
                    name: Req.body.name,
                    email: Req.body.email,
                    password: HashedPassword,
                }
            )

            Success = true;
            const Data = { user: { id: CreateUser.id} } 
            const AuthToken = jwt.sign(Data , SECRET_KEY)
            Res.send({  Success: Success ,  AuthToken: AuthToken} );           
       
        } 
        catch (error) 
        {
            console.error(error.message)
            return Res.status(400).json({ Error: "An Error Occured"});
        }    
    }
)

//LOGIN 
Router.post('/login' ,  jsonParser , async (Req , Res)=>
{
    let Success=false;
    try 
    {
        let UserFound = await User.findOne( { email: Req.body.email })
        if(!UserFound)
        {
            return Res.status(400).json({ Success: Success , Error: "Enter Correct Email/Password"});
        }

        const ComparePassword = await bcrypt.compare(Req.body.password , UserFound.password);
        if (!ComparePassword)
        {
            return Res.status(400).json({ Success: Success , Error: "Enter Correct Email/Password"});     
        }


        //Create auth token {encoding of userid} for userid and sends it as response.
        const Data = { user: { id: UserFound.id} } 
        const AuthToken = jwt.sign(Data , SECRET_KEY)
        Success = true;
        Res.send({Success: Success , AuthToken: AuthToken} );           
    } 
    catch (error) 
    {
        return Res.status(400).json({ Error: "An Error Occured"});
    }

})


//UserDetails
Router.get('/GetUserDetails' , FetchUser , jsonParser , async (Req , Res)=>
{
    try 
    {
        //UserID decoded from middleware
        const USERID = Req.user.id;
        
        //Returns user without Password
        const user = await User.findById(USERID).select("-password")
        
        Res.send(user);
    } 
    catch (error) 
    {
        return Res.status(400).json({ Error: "An Error Occured"});
       
    }
})


module.exports = Router;