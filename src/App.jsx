import { useEffect, useState } from "react";

import { auth } from "./firebase";
import { onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Admin from "./admin";
import Quiz from "./quiz";
import Result from "./result";
import Mainpage from "./mainpage";
import Copy from "./copyrigts";
import Navbar from "./navbar";
import Beforetest from "./beforetest";
export default function App(){

  const [user,setuser]=useState(null);

  useEffect(()=>{
    const unsubscribe=onAuthStateChanged(auth,async(currentuser)=>{
      if(currentuser){
        setuser(currentuser)

      }
      else{
        signInAnonymously(auth)
        .then((usercred)=>{
          setuser(usercred.user)
        })
        .catch((err)=>{

          alert('some thing error in firebase',err)

        })
        
      }
    })
    return ()=>unsubscribe()
  },[])
  return(
    <>
    <Router>
      <Routes>
        <Route path='/' element={
         <>
         <Navbar/>
          <Mainpage/>
          <Copy/>
          </>
        }/>
        <Route path="/pre-admin" element={
          <>
          <Beforetest/>
         
        
          </>
        }/>

        
        <Route path="/admin" element={
          <>
          
           <Admin/>
        
          </>
        }/>
        <Route path="/quiz" element={
          <Quiz/>
        }/>

<Route path="/result" element={
      
        <Result/>
      }/>
      </Routes>
      
    </Router>
    
    </>
  )
}