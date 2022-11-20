import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import SideHeaderComponent from "./SideHeaderComponent";

function HeaderComponent({isLoggedIn}){

    const [headerClassName, setHeaderClassName] = useState('');

    const handleScroll = (headerClassName) => {
        if (headerClassName !== 'fixed-top' && window.pageYOffset >= 40) {
            setHeaderClassName('fixed-top');
        } else if (headerClassName === 'fixed-top' && window.pageYOffset < 40) {
            setHeaderClassName('');
        }
    }

    useEffect(() => {
      window.onscroll = () => handleScroll(headerClassName);
      return () => {
        
      };
    }, [headerClassName]);

    return(
      <>
        <Navbar bg="primary" variant="dark" className={headerClassName}>
        <Container className="text-center">
          {
            isLoggedIn ? <h2>Doctor Everywhere</h2> : <Link to="/">Doctor Everywhere</Link>
          }
          
          <Nav className="me-auto">
            {/* <Link to="/login">Login</Link> */}
          </Nav>
        </Container>
      </Navbar>
      {
        isLoggedIn ? <SideHeaderComponent  /> : ''
      }
      
      </>
    )
}

export default HeaderComponent;