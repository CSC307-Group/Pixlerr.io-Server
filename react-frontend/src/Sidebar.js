import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './styles/Sidebar.css';

// ...

export default props => {
    return (
        <Menu>
            <a className="menu-item" href="/">
                Home
            </a>
            <a className="menu-item" href="/salads">
                My Account
            </a>
            <a className="menu-item" href="/pizzas">
                About
            </a>
        </Menu>
    );
};
