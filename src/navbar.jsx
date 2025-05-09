import React from "react";
import './navbar.css';
import { useNavigate } from "react-router-dom";


export default function Navbar() {
    const history=useNavigate()
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid nav-container">
        <a className="navbar-brand" href="#">
          <img
            src="/ChatGPT Image Apr 14, 2025, 09_51_22 PM.png"
            alt="Logo"
            width="100"
            height="40"
            className="d-inline-block align-text-top"
          />
        </a>
        
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Take test</a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                category
              </a>
              <ul className="dropdown-menu">
                <li><p className="dropdown-item" onClick={()=>history('/admin')}>Create Test</p></li>
                <li><p className="dropdown-item" onClick={()=>history()}>Create Quiz</p></li>
                <li><p className="dropdown-item" onClick={()=>history()}>Take Test</p></li>
                <li><p className="dropdown-item" onClick={()=>history()}>Take Group Quiz</p></li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Mahanth</a>
            </li>
            
          </ul>
        </div>
      </div>
    </nav>
  );
}
