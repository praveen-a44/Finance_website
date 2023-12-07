import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import '../Styles/Navbar.css'
import { useNavigate } from 'react-router-dom';
import logo from '../assests/images/logo.png'
import Header from "./Header";
import Midpage from "./Midpage";  
import { useState } from "react";
function NavBar() {
  const[showSpinner,setShowSpinner] = useState(false);
  const history = useNavigate()
  const handleClick = (path) => {
    setShowSpinner(true);
    setTimeout(() => {
      setShowSpinner(false);
      history(path);
    }, 1700);
  };
  return (
    <>
    <Navbar expand="lg" className="py-2 nav">
      <Container>
        <Navbar.Brand href="#" className="me-lg-5">
        <h1 id="logo"><span id="span_logo">B</span>B</h1>
        <p style={{position:'absolute',top:'49px'}} id="logo_title">Budget <span id="logo_span">Buddy</span></p>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <Nav.Link onClick={() => handleClick('/trackIncome')} className="nav_txt">Track Income</Nav.Link>
            <Nav.Link onClick={() => handleClick('/budget_form')} className="px-lg-2 nav_txt">
              Planing
            </Nav.Link>
            <Nav.Link onClick={() => handleClick('/remainder_form')}  className="nav_txt">Remind me</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <div className="d-flex align-items-center order">
          <span className="line d-lg-inline-block d-none"></span>
          <Button
            className="d-none d-lg-inline-block btn-login"
          >
            Join  
          </Button>
        </div>
      </Container>
    </Navbar>
    <Header/>
    <Midpage />
  
    {showSpinner && 
     <section class="sec-loading">
     <div class="one">
     
     </div>
   </section>
     } 

    </>
  );
}

export default NavBar;
