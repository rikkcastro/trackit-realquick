import React, { useContext } from 'react';
import { Navbar, Nav, Img } from 'react-bootstrap';
import Link from 'next/link';
import UserContext from '../UserContext';
// import  logo from '../public/logo.png'

export default function NavBar() {

    const { user } = useContext(UserContext);
    
    return (
        
        <Navbar bg="dark" variant = "dark" expand="lg" >
            
            <Link href="/">
                <a className="navbar-brand">TrackIT-RealQuick</a>
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    
                    {(user.id === null || user.id === undefined)
                        ? <React.Fragment>
                        <Link href="/login">
                            <a className="nav-link" role="button">Login</a>
                        </Link>
                        <Link href="/register">
                            <a className="nav-link" role="button">Register</a>
                        </Link>
                    </React.Fragment>
                        : 
                        
                        <React.Fragment>
                        <Link href="/dashboard">
                            <a className="nav-link" role="button">Dashboard</a>
                        </Link>
                        <Link href="/transactions">
                            <a className="nav-link" role="button">Manage Transaction</a>
                        </Link>
                        <Link href="/category">
                            <a className="nav-link" role="button">Manage Category</a>
                        </Link>
                        <Link href="/history">
                            <a className="nav-link" role="button">Transaction History</a>
                        </Link>
                        <Link href="/logout">
                            <a className="nav-link" role="button">Logout</a>
                        </Link>
                        </React.Fragment>
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
