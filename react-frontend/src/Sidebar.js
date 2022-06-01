import React from 'react';
import { fallDown as Menu } from 'react-burger-menu';
import './styles/Sidebar.scss';


export default props => {
    return (
        <Menu>
            <a className="menu-item" href="/">
                Home
            </a>
            <a className="menu-item" href="/Account">
                Account
            </a>
            <a className="menu-item" href="/Login">
                Login
            </a>
            <a className="menu-item" href="/Signup">
                Signup
            </a>
            <a className="menu-item" href="/About">
                About
            </a>

        </Menu>
    );
};
