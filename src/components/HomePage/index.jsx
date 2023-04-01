import React from 'react'
import NavigationBar from '../NavigationBar';

export default function HomePage() 
{
  return (
    <>
        <NavigationBar/>
    
        <div className="container" style={{marginTop:"20px"}}>
            <h3>Add a Article</h3>
            <form>
                <div className="container" style={{marginTop:"20px"}}>
                    <label for="email" className="visually-hidden">Email</label>
                    <input type="emailadd" className="form-control" id="email" placeholder="Email"/>
                </div>
                <div className="container" style={{marginTop:"20px"}}>
                    <label for="inputPassword2" className="visually-hidden">Password</label>
                    <input type="password" className="form-control" id="inputPassword2" placeholder="Password"/>
                </div>
                <div className="container" style={{marginTop:"20px"}}>
                    <button type="submit" className="btn btn-primary mb-3">Submit Form</button>
                </div>
            </form>
        </div>
    
    </>    
  )
}
