import { useEffect, useState } from "react";

import { auth } from "./firebase";
import { onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { BrowserRouter as Router, Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import Admin from "./admin";
import Quiz from "./quiz";
import Result from "./result";
import Mainpage from "./mainpage";
import Copy from "./copyrigts";
import Navbar from "./navbar";
import Beforetest from "./beforetest";
import Finaladminprev from "./fianladminprev";
import AiQuestion from "./aiquestion";
import Geminires from "./geminires";
import DeclarationPage from "./aiagreement";
import Quiztopic from "./quiztopic";
export default function App(){

  const [user,setuser]=useState(null);
  const[userruid,setuseruid]=useState(null)

  useEffect(()=>{
    const unsubscribe=onAuthStateChanged(auth,async(currentuser)=>{
      if(currentuser){
        setuser(currentuser)
        setuseruid(currentuser.uid)

      }
      else{
        signInAnonymously(auth)
        .then((usercred)=>{
          setuser(usercred.user)
          setuseruid
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
    <BrowserRouter basename="/">
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

        <Route path="/quiztopic" element={
          <>
          <Quiztopic/>
         
        
          </>
        }/>



        <Route path="/ai-page" element={
          <>
          <AiQuestion/>
         
        
          </>
        }/>

        <Route path="/ai-response" element={
          <>
          <Geminires/>
         
        
          </>
        }/>

         <Route path="/declaration" element={
          <>
          <DeclarationPage/>
         
        
          </>
        }/>


        
        <Route path="/admin" element={
          <>
          
           <Admin/>
        
          </>
        }/>

          <Route path="/finalpre" element={
          <>
          
           <Finaladminprev/>
        
          </>
        }/>
        <Route path="/quiz/:testname" element={
          <>
          
          <Quiz/>
          
          </>
        }/>

<Route path="/result" element={
      
        <Result/>
      }/>
      </Routes>
      
    </BrowserRouter>
    
    </>
  )
}