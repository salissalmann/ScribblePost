const jwt = require("jsonwebtoken");
const SECRET_KEY = "SALUSISSEXY";

//Next() calls the async function of route.

const FetchUser = (Req,Res,Next)=>
{
    try 
    {
        const Token = Req.header("Authorization-Token")
        if(!Token)
        {
            //Access is denied.
            Res.status(401).send( {error:"Please authenticate using a valid Token"})
        }
        
        //Userid is decoded from the JWT Token
        const DATA = jwt.verify(Token,SECRET_KEY);
        //User id taken decoded is saved in Req.User
        Req.user = DATA.user;    
        Next()
    } 
    catch (error) 
    {
        return Res.status(400).json({ Error: "An Error Occured"});   
    }
}

module.exports = FetchUser;


