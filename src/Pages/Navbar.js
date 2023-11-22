import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import '../Styles/Navbar.css'
import logo from '../assests/images/logo.png'
import Header from "./Header";
import Midpage from "./Midpage";  
function NavBar() {
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
            <Nav.Link href="#action1" className="nav_txt">Track Income</Nav.Link>
            <Nav.Link href="#action1" className="px-lg-3 nav_txt">
              Planing
            </Nav.Link>
            <Nav.Link href="#action1" className="nav_txt">Remind me</Nav.Link>
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
  
    </>
  );
}

export default NavBar;
