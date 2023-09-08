import React from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <>
    <Navbar>
        <Container>
          <Navbar.Brand>
          <Link to={'/'} style={{textDecoration:'none'}} >
              <i class="fa-solid fa-layer-group fa-bounce" style={{color:'white'}}></i>
                {' '}
                <span className=''style={{color:'white'}} >EMS Application</span>
          </Link>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  )
}

export default Header