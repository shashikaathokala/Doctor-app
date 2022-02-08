import React,{useState,useEffect} from "react";
import {Navbar,Nav,Container} from 'react-bootstrap'


const MyNavbar = (props)=>{
    return(
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Container>
  <Navbar.Brand style={{marginLeft:'-5rem'}} href="#home">{props.title}</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
      <Nav.Link  href="#features">{props.first}</Nav.Link>

      
    </Nav>
    <Nav style={{marginRight:'-5rem'}}>
    <Nav.Link style={{color:"white"}} href={props.pathSecond}>{props.second}</Nav.Link>
      <Nav.Link style={{color:"white"}} href={props.pathThird}>{props.third}</Nav.Link>
      <Nav.Link  style={{color:"white"}} onClick={props.pathFourth}>{props.fourth}</Nav.Link>
      <Nav.Link  style={{color:"white"}}  onClick={props.pathFifth}>
        {props.fifth}
      </Nav.Link>
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>
       
    )
}

export default MyNavbar;

