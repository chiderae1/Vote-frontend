import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import useLogout from './useLogout';

const Navigation = () => {
    const logout = useLogout()
    const YaleID = JSON.parse(localStorage.getItem('YaleID'))
    const handleLogout = () => {
        logout()
    }
    return (
        <div className="">
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className='ps-5 pe-5 pt-3 pb-3'>
                <Navbar.Brand href="#home">YALE DECIDES</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    {YaleID &&
                        <Nav className="ms-auto">
                            <Nav.Link href="Nomination">Nomination</Nav.Link>
                            <Nav.Link href="leaderboard">leaderboard</Nav.Link>
                            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                        </Nav>
                    }
                    {!YaleID &&
                        <Nav>
                            <Nav.Link href="/login">Login</Nav.Link>
                            <Nav.Link href="/signup">Signup</Nav.Link>
                        </Nav>
                    }

                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export default Navigation;

