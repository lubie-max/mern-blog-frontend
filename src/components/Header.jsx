// import React, { useEffect } from 'react'
//
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';

//
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userLogout } from '../StateManagement/Slices/authSlice';



const Header = () => {
  const isLoggedIn = useSelector((state)=> state.auth.isLoggedIn)
  console.log('auth State', isLoggedIn)
  const dispatch = useDispatch()

 
 

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/" className='shadow'>GEEKS BL🎯G  </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              {isLoggedIn &&
                <>
                  <Nav.Link > <Link to="/" style={{ textDecoration: 'none', color: 'aqua', fontFamily: 'monospace', fontSize: 'larger' }}>All Blogs</Link> </Nav.Link>
                  <Nav.Link > <Link to="/my-blogs" style={{ textDecoration: 'none', color: 'aqua', fontFamily: 'monospace', fontSize: 'larger' }} className="mx-3">My Blogs</Link> </Nav.Link>
                </>
             
              }

          <div style={{ display: 'flex', justifyContent: 'flex-end', flexDirection:'row' }}>

            {!isLoggedIn ? (
              <>
                <Button  variant='info' className='mx-3 btn btn-sm outline-light'>
                  <Link to="/auth" style={{ textDecoration: 'none', color: 'white' }}>LOGIN \ SIGNUP</Link>
                </Button>
                
              </>
            ) : (
              <>
              <div className="d-grid gap-2 d-md-flex justify-content-md-end my-auto">
                <Link to="/auth" >
              <Button variant='info' style={{ textDecoration: 'none', color: 'white',fontFamily: 'monospace', fontSize: '', letterSpacing:'2px' }} className=' btn-sm ' onClick={(e)=> dispatch(userLogout())}>
                  LOGOUT
              </Button>
                  </Link>
&nbsp;
                <Link to="/add-blog" >
              <Button variant='info' style={{ textDecoration: 'none', color: 'white',borderRadius:'25%',fontFamily: 'monospace' }} className=' btn-sm' >
                 +
              </Button>
                  </Link>
              </div>
            </>
            )}

          

          </div>
             
            </Nav>
          </Navbar.Collapse>

        </Container>
      </Navbar>
    </>
  )
}

export default Header